"use client";
import React from "react";
import { Plus, Search, FileText, Calendar as CalendarIcon, Edit3, Trash2, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  image?: string;
  date?: string;
  source?: string;
  title: string;
  description?: string;
  link?: string;
  gallery?: { url: string }[];
}

interface ContentListProps {
  items: Item[];
  category: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAdd: () => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  items,
  category,
  searchTerm,
  setSearchTerm,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [sortOrder, setSortOrder] = React.useState<"desc" | "asc">("desc");

  const filteredItems = items
    .filter((n) => n.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      // Sorting by date if it exists, otherwise fallback to created_at or nothing
      const getSortVal = (item: any) => {
        if (category !== 'careers' && item.date) {
          return new Date(item.date).getTime();
        }
        return item.created_at ? new Date(item.created_at).getTime() : 0;
      };

      const valA = getSortVal(a);
      const valB = getSortVal(b);

      return sortOrder === "desc" ? valB - valA : valA - valB;
    });

  const getCategoryLabel = () => {
    switch (category) {
      case 'news': return 'News';
      case 'newsletters': return 'Newsletter';
      case 'events': return 'Events';
      case 'careers': return 'Careers';
      default: return 'Content Database';
    }
  };

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 border-b border-gray-200 pb-8 sm:pb-12">
        <div className="space-y-2">
          <h1 className="text-bodyLarge font-medium text-gray-900 tracking-normal">{getCategoryLabel()}</h1>
        </div>
        <button
          onClick={onAdd}
          className="h-11 px-4 sm:px-10 bg-[#FF5C19] text-white rounded-md text-body4 font-neueMontreal tracking-normal hover:bg-orange-600 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-[18px] h-[18px]" />
          Add {category === 'news' ? 'News' : category === 'events' ? 'Event' : category === 'newsletters' ? 'Newsletter' : 'Record'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-8 py-5 border-b border-gray-100 bg-[#FBFBFB] flex items-center gap-4">
          <Search className="w-[18px] h-[18px] text-[#999] shrink-0" />
          <input
            type="text"
            placeholder={`Filter the ${category} database by title...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-body4 font-normal outline-none text-gray-600 placeholder:text-gray-300"
          />
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/10">
                <th className={cn("px-4 lg:px-10 py-5 text-gray-400 tracking-normal max-w-[280px] sm:max-w-[425px] text-body4 font-neueMontreal font-normal", category === 'careers' && "min-w-[400px]")}>
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-[16px] h-[16px] text-gray-400" />
                    <span>{category === 'careers' ? 'Job Position' : 'Publication Info'}</span>
                  </div>
                </th>
                <th
                  className="px-4 lg:px-10 py-5 text-body4 font-neueMontreal font-normal text-gray-500 tracking-normal min-w-[300px] cursor-pointer hover:bg-gray-50 transition-colors group select-none"
                  onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2.5">
                      <CalendarIcon className="w-[16px] h-[16px] text-gray-400 group-hover:text-[#FF5C19] transition-colors" />
                      <span className="group-hover:text-gray-900 transition-colors">{category === 'careers' ? 'Department & Type' : 'Published Date'}</span>
                    </div>
                    <ArrowUpDown className={`w-[14px] h-[14px] ${sortOrder ? "text-gray-600" : "text-gray-400"} group-hover:text-[#FF5C19] transition-colors`} />
                  </div>
                </th>
                <th className="px-4 lg:px-10 py-5 text-body4 font-neueMontreal font-normal text-gray-500 tracking-normal text-right min-w-[150px]">
                  <div className="flex justify-end items-center gap-2.5">
                    <Plus className="w-[16px] h-[16px] text-gray-400 rotate-45" />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 lg:px-10 py-6 lg:py-8">
                    <div className="flex items-center gap-4 lg:gap-6">
                      {category !== 'careers' && (
                        <div className={cn(
                          "h-16 w-16 aspect-square rounded-xl border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center transition-all",
                          category === 'newsletters' ? "bg-orange-50/50" : "bg-gray-100"
                        )}>
                          {item.image ? (
                            <img src={item.image} className="h-full w-full object-cover" alt="" />
                          ) : category === 'newsletters' ? (
                            <FileText className="w-6 h-6 text-[#FF5C19]" />
                          ) : (
                            <div className="text-[10px] text-gray-300 font-mono text-center px-1 uppercase">No Asset</div>
                          )}
                        </div>
                      )}
                      <div className="max-w-xl">
                        <p className="font-medium text-gray-900 text-body4 font-neueMontreal leading-snug line-clamp-2 group-hover:text-[#FF5C19] transition-colors whitespace-pre-line">
                          {item.title}
                        </p>
                        {category === 'careers' && (
                          <div className="flex items-center gap-3 mt-1 font-normal leading-relaxed overflow-hidden">
                            <span className="text-[11px] text-[#FF5C19] bg-orange-50 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                              {item.link || 'Location Not Specified'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-10 py-6 lg:py-8">
                    <p className="text-body4 font-neueMontreal text-gray-600 tracking-normal truncate max-w-[200px]">
                      {category === 'careers' ? (item.source || 'No Department') : (item.source || '-')}
                    </p>
                    <p className="text-body4 font-neueMontreal text-gray-400 font-normal mt-1">
                      {category === 'careers' ? (item.date || 'Type Not Specified') : (item.date || '-')}
                    </p>
                  </td>
                  <td className="px-4 lg:px-10 py-6 lg:py-8 text-right">
                    <div className="flex justify-end items-center gap-4 lg:gap-8">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-body4 font-neueMontreal text-[#FF5C19] hover:underline cursor-pointer flex items-center gap-2 group/btn"
                      >
                        <Edit3 className="w-[16px] h-[16px] group-hover/btn:rotate-12 transition-transform" />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="text-body4 font-neueMontreal text-red-500 hover:underline cursor-pointer flex items-center gap-2 group/btn"
                      >
                        <Trash2 className="w-[16px] h-[16px] group-hover/btn:scale-110 transition-transform" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-gray-50/50">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                <FileText className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="text-gray-900 font-medium tracking-normal">Zero indexed records for {category}</h3>
              <p className="text-gray-400 text-body4 font-neueMontreal mt-1 max-w-[280px]">
                {searchTerm ? "Search query returned null. Try different parameters or clear the filter." : `Database is empty. Initiate the ingestion process for ${category} content.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentList;
