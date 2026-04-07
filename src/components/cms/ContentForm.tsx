import React from "react";
import { ArrowLeft, Save, Plus, Edit3, Loader2, Link as LinkIcon, Calendar, Info, FileImage, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import TiptapEditor from "@/components/cms/Editor";

interface Item {
  id: string;
  image: string;
  date: string;
  source: string;
  title: string;
  description: string;
  link: string;
  gallery?: { url: string }[];
}

interface NewsFormProps {
  formData: Item;
  category: string;
  editingItem: Item | null;
  imagePreview: string;
  isUploading: boolean;
  errors: Record<string, boolean>;
  setFormData: React.Dispatch<React.SetStateAction<Item>>;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const ContentForm: React.FC<NewsFormProps> = ({
  formData,
  category,
  editingItem,
  imagePreview,
  isUploading,
  errors,
  setFormData,
  onBack,
  onSubmit,
  handleInputChange,
  handleFileChange,
  setErrors,
}) => {
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            gallery: [...(prev.gallery || []), { url: reader.result as string }]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="space-y-4 pb-10 border-b border-gray-200 mb-12">
        <button
          onClick={onBack}
          className="text-body4 font-medium text-gray-400 mb-6 tracking-tight flex items-center gap-3 hover:text-[#FF5C19] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-[18px] h-[18px] group-hover:-translate-x-1 transition-transform" />
          Back to List
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div className="space-y-1">
              <h1 className="text-body2 font-medium text-gray-900 tracking-tight">
                {editingItem ? "Edit Entry Metadata" : "Create New Content Fragment"}
              </h1>
              <p className="text-body4 text-gray-400 font-normal leading-relaxed">
                Update the canonical publishing parameters for this {category} database record.
              </p>
           </div>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-12 pb-20">
        <div className="space-y-10">
          {/* Media Section - Hide for Careers */}
          {category !== 'careers' && (
            <div className="space-y-5">
              <label className={cn("text-body4 font-medium tracking-tight pl-1 flex items-center gap-2", errors.image ? "text-red-500" : "text-gray-500")}>
                <FileImage size={16} /> 
                Primary Visual Asset (Thumbnail)
              </label>
              <div
                className={cn(
                  "flex flex-col md:flex-row md:items-center gap-8 lg:gap-10 py-8 lg:py-10 border-y border-gray-100",
                  errors.image && "bg-red-50/30"
                )}
              >
                <div
                  className={cn(
                    "h-40 w-40 aspect-square bg-gray-50 rounded-2xl border flex items-center justify-center overflow-hidden relative group cursor-pointer transition-all shadow-sm",
                    errors.image ? "border-red-500" : "border-gray-200 hover:border-orange-300"
                  )}
                >
                  {imagePreview ? (
                    <img src={imagePreview} className="h-full w-full object-cover" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Plus className={cn("w-[24px] h-[24px]", errors.image ? "text-red-300" : "text-[#AAA]")} />
                      <span className="text-[10px] text-gray-300 font-medium tracking-tighter uppercase">Select Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity tracking-tight px-4 text-center pointer-events-none">
                    <Edit3 className="w-[18px] h-[18px] mb-2" />
                    Replace primary asset
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    title="Select image"
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <p className={cn("text-body4 font-medium", errors.image ? "text-red-600" : "text-gray-900")}>
                    Upload Feature Image
                  </p>
                  <p className="text-body4 text-gray-400 font-normal leading-relaxed max-w-md">
                    This image represents the entry in the list and grid views. 
                    <span className="text-[#FF5C19] font-medium ml-1">Optimized for high-performance delivery.</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Section - Only for Events */}
          {category === 'events' && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-body4 font-medium tracking-tight text-gray-500 flex items-center gap-2">
                  <Plus size={16} /> 
                  Event Gallery Assets
                </label>
                <button
                   type="button"
                   onClick={() => document.getElementById('gallery-upload')?.click()}
                   className="text-[12px] font-medium text-[#FF5C19] hover:underline cursor-pointer"
                >
                  Upload Multi-Select
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {formData.gallery?.map((asset, index) => (
                  <div key={index} className="aspect-square bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative group">
                    <img src={asset.url} className="h-full w-full object-cover" alt="" />
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(index)}
                      className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => document.getElementById('gallery-upload')?.click()}
                  className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-orange-200 transition-colors group cursor-pointer"
                >
                  <Plus className="w-5 h-5 text-gray-300 group-hover:text-[#FF5C19]" />
                  <span className="text-[10px] text-gray-300 font-medium uppercase tracking-tighter">Add More</span>
                </button>
                <input
                  id="gallery-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8">
            <div className="gap-y-1.5 flex flex-col">
              <label className={cn("text-body4 font-medium tracking-tight flex items-center gap-2", errors.title ? "text-red-500" : "text-gray-500")}>
                {category === 'careers' ? "Job Title" : "Headline"}
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={cn(
                  "w-full h-12 lg:h-11 bg-white border rounded-lg px-4 text-body4 outline-none transition-all placeholder:text-gray-200",
                  errors.title
                    ? "border-red-500 bg-red-50/10 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5C19] hover:border-gray-300"
                )}
                placeholder={category === 'careers' ? "e.g. Senior Software Engineer" : "The canonical title for this entry..."}
              />
            </div>
            <div className="gap-y-1.5 flex flex-col">
              <label className={cn("text-body4 font-medium tracking-tight flex items-center gap-2", errors.source ? "text-red-500" : "text-gray-500")}>
                {category === 'careers' ? "Department" : "Publisher / Source"}
              </label>
              <input
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className={cn(
                  "w-full h-12 lg:h-11 bg-white border rounded-lg px-4 text-body4 outline-none transition-all placeholder:text-gray-200",
                  errors.source
                    ? "border-red-500 bg-red-50/10 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5C19] hover:border-gray-300"
                )}
                placeholder={category === 'careers' ? "e.g. Engineering, Sales" : "e.g. The Economic Times, Reuters"}
              />
            </div>
            <div className="gap-y-1.5 flex flex-col relative">
              <label className={cn("text-body4 font-medium tracking-tight flex items-center gap-2", errors.date ? "text-red-500" : "text-gray-500")}>
                {category === 'careers' ? <Briefcase size={14} className="text-gray-400" /> : <Calendar size={14} className="text-gray-400" />}
                {category === 'careers' ? "Job Type" : "Publish Date"}
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={cn(
                  "w-full h-12 lg:h-11 bg-white border rounded-lg px-4 text-body4 outline-none transition-all placeholder:text-gray-200",
                  errors.date
                    ? "border-red-500 bg-red-50/10 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5C19] hover:border-gray-300"
                )}
                placeholder={category === 'careers' ? "e.g. Full Time, Internship" : "e.g. February 2026 or 15/03/2026"}
              />
              <span className="absolute bottom-[-18px] right-1 text-[10px] text-gray-300 font-normal tracking-tight">
                {category === 'careers' ? "Employment model" : "Flexible string format supported"}
              </span>
            </div>
            <div className="gap-y-1.5 flex flex-col">
              <label className={cn("text-body4 font-medium tracking-tight flex items-center gap-2", errors.link ? "text-red-500" : "text-gray-500")}>
                <LinkIcon size={14} className="text-gray-400" />
                {category === 'careers' ? "Work Location" : "Reference Link / URL"}
              </label>
              <input
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className={cn(
                  "w-full h-12 lg:h-11 bg-white border rounded-lg px-4 text-body4 outline-none transition-all placeholder:text-gray-200",
                  errors.link
                    ? "border-red-500 bg-red-50/10 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5C19] hover:border-gray-300"
                )}
                placeholder={category === 'careers' ? "e.g. Navi Mumbai, Remote" : "https://external-resource-link.com"}
              />
            </div>
            <div className="md:col-span-2 gap-y-1.5 flex flex-col pt-4">
              <label className={cn("text-body4 font-medium tracking-tight pl-1 flex items-center gap-2", errors.description ? "text-red-500" : "text-gray-500")}>
                {category === 'careers' ? "Job Description & Requirements" : "Executive Summary / Description"}
              </label>
              <TiptapEditor 
                value={formData.description}
                onChange={(html) => setFormData(prev => ({ ...prev, description:html }))}
                placeholder={category === 'careers' ? "List responsibilities, requirements, and benefits..." : "Synthesize the core message or event overview here..."}
                className={cn(errors.description && "ring-1 ring-red-500")}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 pt-12 border-t border-gray-100">
          <button
            type="submit"
            disabled={isUploading}
            className="w-full sm:w-auto bg-[#FF5C19] text-white h-12 px-14 rounded-lg text-body4 font-medium tracking-tight hover:bg-orange-600 transition-all disabled:opacity-50 shadow-xl shadow-orange-600/10 active:scale-95 cursor-pointer flex items-center justify-center gap-3"
          >
            {isUploading ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Save className="w-[18px] h-[18px]" />}
            {isUploading ? "Committing and indexing..." : editingItem ? "Update Changes" : "Publish"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-body4 font-medium text-gray-400 hover:text-gray-900 transition-colors tracking-tight underline-offset-8 cursor-pointer hover:underline decoration-gray-200"
          >
            Cancel and Discard Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;


