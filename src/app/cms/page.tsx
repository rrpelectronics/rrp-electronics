"use client";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import Sidebar from "@/components/cms/Sidebar";
import DashboardHeader from "@/components/cms/DashboardHeader";
import ContentList from "@/components/cms/ContentList";
import ContentForm from "@/components/cms/ContentForm";
import DeleteModal from "@/components/cms/DeleteModal";
import { getAllItems, createItem, updateItem, deleteItem } from "@/lib/cms-actions";
import { TABLES } from "@/lib/aws";

const AdminDashboard = () => {
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
    date: new Date().toISOString().split('T')[0],
    source: "",
    title: "",
    description: "",
    link: "",
    gallery: [] as { url: string }[]
  });

  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const getTableName = useCallback((cat: string) => {
    switch(cat) {
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
        date: category === 'careers' ? (item.type || "") : (item.date || "")
      }));
      setItems(mappedData);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load content from database");
    } finally {
      setIsLoading(false);
    }
  }, [category, getTableName]);

  useEffect(() => {
    const session = localStorage.getItem("adminSession_ele");
    if (session === "active") {
      setIsLoggedIn(true);
      loadData();
    }
    setIsVerifying(false);
  }, [loadData]);

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
      // Clean submission data
      const submissionData: any = {
        title: formData.title,
        description: formData.description,
        gallery: formData.gallery
      };

      // Map back UI image to specific JSON field
      if (category === 'news') {
        submissionData.newsEventImg = formData.image;
        submissionData.source = formData.source;
        submissionData.date = formData.date;
        submissionData.link = formData.link;
      } else if (category === 'events') {
        submissionData.thumbnail = formData.image;
        submissionData.newsEventBanner = formData.image;
        submissionData.source = formData.source;
        submissionData.date = formData.date;
        submissionData.link = formData.link;
      } else if (category === 'careers') {
        submissionData.department = formData.source;
        submissionData.location = formData.link;
        submissionData.type = formData.date;
        // Default values for careers
        submissionData.fresherAllowed = true;
        submissionData.extraPoints = [];
      } else {
        submissionData.image = formData.image;
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

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ id: "", image: "", date: new Date().toISOString().split('T')[0], source: "", title: "", description: "", link: "", gallery: [] });
    setImagePreview("");
    setErrors({});
  };

  if (isVerifying) {
    return <div className="min-h-screen bg-[#F8F9FA]" />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-inter">
        <div className="w-full max-w-[350px] space-y-8 bg-white p-12 rounded-lg shadow-sm border border-gray-100">
          <div className="text-center space-y-3">
            <h1 className="text-body2 font-medium tracking-tight text-gray-900 border-b border-gray-100 pb-4">
              Admin Console
            </h1>
            <p className="text-body4 text-gray-400 font-normal">Secure entry point</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-body4 font-medium text-gray-500 tracking-tight pl-0.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 bg-transparent border border-gray-200 rounded-md px-4 text-body4 outline-none transition-all focus:border-[#FF5C19]"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-body4 font-medium text-gray-500 tracking-tight pl-0.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 bg-transparent border border-gray-200 rounded-md px-4 text-body4 outline-none transition-all focus:border-[#FF5C19]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-[#FF5C19] text-white rounded-md text-body4 font-medium tracking-tight hover:bg-orange-600 transition-colors cursor-pointer active:scale-98 shadow-sm"
            >
              Sign in to console
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#FAFAFA] relative font-inter">
      <Sidebar
        view={view}
        category={category}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setCategory={setCategory}
        setView={setView}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1400px] w-full mx-auto">
          {view === "list" ? (
            <ContentList
              items={items}
              category={category}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAdd={() => {
                resetForm();
                setView("form");
              }}
              onEdit={(item) => {
                setEditingItem(item);
                setFormData({
                  id: item.id,
                  title: item.title,
                  image: item.image || "",
                  date: item.date || new Date().toISOString().split('T')[0],
                  source: item.source || "",
                  description: item.description || "",
                  link: item.link || "",
                  gallery: item.gallery || []
                });
                setImagePreview(item.image || "");
                setView("form");
              }}
              onDelete={(item) => setDeleteModal({ isOpen: true, item })}
            />
          ) : (
            <ContentForm
              formData={formData}
              category={category}
              editingItem={editingItem}
              imagePreview={imagePreview}
              isUploading={isUploading}
              errors={errors}
              setFormData={setFormData as any}
              onBack={() => setView("list")}
              onSubmit={saveItem}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              setErrors={setErrors as any}
            />
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        itemTitle={deleteModal.item?.title}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={async () => {
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
        }}
      />
    </div>
  );

};

export default AdminDashboard;