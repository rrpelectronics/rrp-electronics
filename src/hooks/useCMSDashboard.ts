"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getAllItems, createItem, updateItem, deleteItem } from "@/lib/cms-actions";
import { TABLES } from "@/lib/database-schema";
import { uploadAsset } from "@/lib/upload-action";

export const useCMSDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState("list"); // "list" | "form"
  const [category, setCategory] = useState("news"); // "news" | "newsletters" | "events" | "careers"
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: any }>({
    isOpen: false,
    item: null
  });

  const [formData, setFormData] = useState({
    id: "",
    image: "",
    date: "",
    source: "",
    title: "",
    description: "",
    link: "",
    gallery: [] as { url: string }[],
    experienceMin: undefined as number | undefined,
    experienceMax: undefined as number | undefined,
    fresherAllowed: true
  });

  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const getTableName = useCallback((cat: string) => {
    switch (cat) {
      case 'news': return TABLES.NEWS;
      case 'events': return TABLES.EVENTS;
      case 'newsletters': return TABLES.NEWSLETTERS;
      case 'careers': return TABLES.CAREERS;
      default: return TABLES.NEWS;
    }
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllItems(getTableName(category));
      // Map JSON fields to UI fields
      const mappedData = data.map((item: any) => ({
        ...item,
        image: item.newsEventImg || item.thumbnail || item.newsEventBanner || item.image || "",
        description: item.description || "",
        gallery: item.gallery || [],
        // Contextual mapping for common fields
        source: category === 'careers' ? (item.department || "") : (item.source || ""),
        link: category === 'careers' ? (item.location || "") : (item.link || ""),
        date: category === 'careers' ? (item.type || "") : (item.date || ""),
        experienceMin: item.experienceMin,
        experienceMax: item.experienceMax,
        fresherAllowed: item.fresherAllowed
      }));
      setItems(mappedData);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load content from database");
    } finally {
      setIsLoading(false);
    }
  }, [category, getTableName]);

  // Handle initial session check
  useEffect(() => {
    const session = localStorage.getItem("adminSession_ele");
    if (session === "active") {
      setIsLoggedIn(true);
    }
    setIsVerifying(false);
  }, []);

  // Handle data loading when logged in or category changes
  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn, category, loadData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "rrp@electronics#001") {
      setIsLoggedIn(true);
      localStorage.setItem("adminSession_ele", "active");
      toast.success("Welcome, Admin");
      loadData();
    } else {
      toast.error("Invalid credentials.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminSession_ele");
    toast.info("Logged out successfully.");
  };

  const resetForm = useCallback(() => {
    setEditingItem(null);
    setFormData({ 
      id: "", 
      image: "", 
      date: "", 
      source: "", 
      title: "", 
      description: "", 
      link: "", 
      gallery: [],
      experienceMin: undefined,
      experienceMax: undefined,
      fresherAllowed: true
    });
    setImagePreview("");
    setErrors({});
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
      if (errors.image) setErrors(prev => ({ ...prev, image: false }));
    }
  };

  const saveItem = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    const newErrors: Record<string, boolean> = {};
    if (!formData.title) newErrors.title = true;
    if (category !== 'careers' && !formData.date) newErrors.date = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required fields");
      return;
    }

    setIsUploading(true);

    try {
      const tableName = getTableName(category);

      let finalImageUrl = formData.image;
      let finalLink = formData.link;
      
      // Helper to convert base64 to File
      const base64ToFile = (base64: string, filename: string) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      };

      // Upload main image if it's new (starts with data:image)
      if (finalImageUrl.startsWith('data:image')) {
        const imageFile = base64ToFile(finalImageUrl, `main-${Date.now()}.png`);
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        const result = await uploadAsset(uploadData, `cms/${category}`);
        finalImageUrl = result.url;
      }

      // Upload PDF if it's a newsletter and a new file
      if (category === 'newsletters' && finalLink.startsWith('data:application/pdf')) {
        const pdfFile = base64ToFile(finalLink, `newsletter-${Date.now()}.pdf`);
        const uploadData = new FormData();
        uploadData.append("file", pdfFile);
        const result = await uploadAsset(uploadData, `cms/newsletters`);
        finalLink = result.url;
      }

      // Upload gallery images if new
      let finalGallery = [];
      if (formData.gallery && formData.gallery.length > 0) {
        finalGallery = await Promise.all(formData.gallery.map(async (item, i) => {
          if (item.url.startsWith('data:image')) {
            const galFile = base64ToFile(item.url, `gal-${Date.now()}-${i}.png`);
            const uploadData = new FormData();
            uploadData.append("file", galFile);
            const result = await uploadAsset(uploadData, `cms/${category}-gallery`);
            return { url: result.url };
          }
          return item;
        }));
      }

      // Clean submission data
      const submissionData: any = {
        title: formData.title,
        description: formData.description,
        gallery: finalGallery
      };

      // Map back UI image to specific JSON field
      if (category === 'news') {
        submissionData.newsEventImg = finalImageUrl;
        submissionData.source = formData.source;
        submissionData.date = formData.date;
        submissionData.link = formData.link;
      } else if (category === 'events') {
        submissionData.thumbnail = finalImageUrl;
        submissionData.newsEventBanner = finalImageUrl;
        submissionData.source = formData.source;
        submissionData.date = formData.date;
        submissionData.link = formData.link;
      } else if (category === 'careers') {
        submissionData.department = formData.source;
        submissionData.location = formData.link;
        submissionData.type = formData.date;
        submissionData.experienceMin = formData.experienceMin;
        submissionData.experienceMax = formData.experienceMax;
        submissionData.fresherAllowed = formData.fresherAllowed;
        submissionData.extraPoints = [];
      } else if (category === 'newsletters') {
        submissionData.image = ""; // Newsletters don't have images in this design
        submissionData.source = "";
        submissionData.date = formData.date;
        submissionData.link = finalLink;
      } else {
        submissionData.image = finalImageUrl;
        submissionData.source = formData.source;
        submissionData.date = formData.date;
        submissionData.link = formData.link;
      }

      // Keep other existing fields if editing (like id or extra career details)
      const finalData = editingItem ? { ...editingItem, ...submissionData } : submissionData;

      if (editingItem) {
        await updateItem(tableName, editingItem.id, finalData);
        toast.success("Entry updated successfully");
      } else {
        await createItem(tableName, finalData);
        toast.success("Entry published successfully");
      }

      await loadData();
      setView("list");
      resetForm();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save data to database");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteModal.item) {
      try {
        await deleteItem(getTableName(category), deleteModal.item.id);
        await loadData();
        setDeleteModal({ isOpen: false, item: null });
        toast.success("Entry deleted successfully");
      } catch (error) {
        toast.error("Failed to delete entry");
      }
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      title: item.title,
      image: item.image || "",
      date: item.date || "",
      source: item.source || "",
      description: item.description || "",
      link: item.link || "",
      gallery: item.gallery || [],
      experienceMin: item.experienceMin,
      experienceMax: item.experienceMax,
      fresherAllowed: item.fresherAllowed ?? true
    });
    setImagePreview(item.image || "");
    setView("form");
  };

  const handleAdd = () => {
    resetForm();
    setView("form");
  };

  return {
    isLoggedIn,
    isVerifying,
    username,
    setUsername,
    password,
    setPassword,
    isSidebarOpen,
    setIsSidebarOpen,
    view,
    setView,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    items,
    isLoading,
    editingItem,
    deleteModal,
    setDeleteModal,
    formData,
    setFormData,
    imagePreview,
    isUploading,
    errors,
    setErrors,
    handleLogin,
    handleLogout,
    handleInputChange,
    handleFileChange,
    saveItem,
    handleDelete,
    handleEdit,
    handleAdd,
    loadData,
    getTableName
  };
};
