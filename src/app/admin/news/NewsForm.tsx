"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  X,
  Upload,
  Link as LinkIcon,
  Calendar,
  Globe,
  FileText,
  AlertCircle
} from "lucide-react";
import { createItem, updateItem, getItemById } from "@/lib/cms-actions";
import { uploadAsset } from "@/lib/upload-action";
import { TABLES } from "@/lib/aws";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const NewsForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    source: "",
    date: new Date().toISOString().split('T')[0],
    link: "",
    newsEventImg: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New state for deferred upload and preview
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const item = await getItemById(TABLES.NEWS, id as string);
      if (item) {
        setFormData({
          title: item.title || "",
          source: item.source || "",
          date: item.date || "",
          link: item.link || "",
          newsEventImg: item.newsEventImg || "",
          description: item.description || ""
        });
      }
    } catch (err) {
      setError("Failed to fetch news item");
    } finally {
      setFetching(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalImgUrl = formData.newsEventImg;
      
      if (selectedFile) {
        setUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        const { url } = await uploadAsset(uploadData, "news");
        finalImgUrl = url;
        setUploading(false);
      }

      const finalData = { ...formData, newsEventImg: finalImgUrl };

      if (isEdit) {
        await updateItem(TABLES.NEWS, id as string, finalData);
      } else {
        await createItem(TABLES.NEWS, finalData);
      }
      router.push("/admin/news");
    } catch (err: any) {
      setError(`Failed to save news: ${err.message || "Please check your AWS connection."}`);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center animate-pulse text-gray-400">Loading form data...</div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <Link href="/admin/news" className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-500 cursor-pointer">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl text-gray-900">{isEdit ? "Edit News" : "Create New News"}</h1>
          <p className="text-sm text-gray-500 font-medium ">Headline details and metadata for the public news section.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <FileText size={14} className="text-primary" />
              News Headline
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary text-gray-900 transition-all text-lg placeholder:text-gray-300 shadow-none"
              placeholder="Enter a compelling title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm  text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Globe size={14} className="text-primary" />
                Source Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary text-gray-900 font-medium transition-all shadow-none"
                placeholder="e.g. Times of India, CNN"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
                <Calendar size={14} className="text-primary" />
                Published Date
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary text-gray-900 font-medium transition-all shadow-none"
                placeholder="21 September 2024"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <LinkIcon size={14} className="text-primary" />
              External Link (URL)
            </label>
            <input
              type="url"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary text-gray-900 font-medium transition-all shadow-none"
              placeholder="https://example.com/news-article"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm  text-gray-400 uppercase tracking-wider flex items-center gap-2">
              Description / Content Summary
            </label>
            <textarea
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary text-gray-900 font-medium transition-all min-h-[150px] resize-y shadow-none"
              placeholder="Sub-headline or brief summary of the article..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        {/* Right Column: Media & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <label className="text-sm  text-gray-400 uppercase tracking-wider flex items-center gap-2">
                Article Image URL
              </label>

              <div 
                className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center relative group cursor-pointer"
                onClick={() => !uploading && document.getElementById('file-upload')?.click()}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] text-gray-500 font-medium">Uploading to S3...</p>
                  </div>
                ) : (previewUrl || formData.newsEventImg) ? (
                  <>
                    <img src={previewUrl || formData.newsEventImg} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewUrl(null);
                          setSelectedFile(null);
                          setFormData({ ...formData, newsEventImg: "" });
                        }}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all cursor-pointer"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      <Upload size={24} />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Click to Upload</p>
                    <p className="text-[10px] text-gray-400">PNG, JPG, WEBP, SVG, AVIF</p>
                  </div>
                )}
                <input 
                  id="file-upload"
                  type="file" 
                  accept="image/*,.svg,.webp,.avif"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-medium">Image URL (Optional Override)</label>
                <input
                  type="text"
                  placeholder="https://imgur.com/image.png"
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-primary transition-all font-mono"
                  value={formData.newsEventImg}
                  onChange={(e) => setFormData({ ...formData, newsEventImg: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing..." : <><Save size={18} /> {isEdit ? "Update News" : "Publish News"}</>}
              </button>
              <Link href="/admin/news" className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-500 py-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                <X size={18} />
                Cancel
              </Link>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-600 animate-in shake duration-500">
                <AlertCircle size={20} className="flex-shrink-0" />
                <p className="text-xs  leading-tight">{error}</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
            <h4 className="text-xs  text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
              <AlertCircle size={14} />
              Helpful Info
            </h4>
            <p className="text-[10px] text-blue-500 leading-relaxed font-medium">
              After publishing, new content will appear instantly on the frontend news page. Ensure the URL for external links is valid.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;

const Trash2 = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 9 2 2 4-4" /></svg>
