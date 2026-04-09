"use client";
import React, { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown, LucideIcon } from "lucide-react";

export interface FilterOption {
  label: string;
  value: any;
}

export interface FilterSection {
  id: string;
  options: FilterOption[];
  value: any;
  onChange: (value: any) => void;
  title?: string;
  radioName: string;
}

interface MobileUnifiedFilterProps {
  sections: FilterSection[];
  buttonLabel?: string;
  icon?: LucideIcon;
}

export const MobileUnifiedFilter = ({ 
  sections, 
  buttonLabel = "Filter",
  icon: Icon = Filter
}: MobileUnifiedFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom,
        right: (typeof window !== 'undefined' ? window.innerWidth : 375) - rect.right
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("scroll", updateCoords);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isOpen]);

  const handleOpen = () => {
    updateCoords();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className={`px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm lg:text-[16px] flex items-center gap-2 lg:gap-3 border transition-all cursor-pointer ${isOpen ? "border-primary text-primary" : "border-gray-200 text-gray-700 bg-white hover:border-gray-900"}`}
      >
        <Icon size={16} className={isOpen ? "text-primary" : "text-gray-400"} />
        <span className="font-medium text-inherit">{buttonLabel}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`} />
      </button>

      {isOpen && (
        <div
          style={{ top: `${coords.top + 10}px`, right: `${coords.right}px` }}
          className="fixed z-[9999] animate-in fade-in slide-in-from-top-2 h-fit w-max"
        >
          <div className="fixed inset-0 select-none bg-black/0 cursor-pointer" onClick={() => setIsOpen(false)} style={{ zIndex: -1 }} />
          <div className="relative z-10 min-w-full bg-white border border-gray-100 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] py-3 overflow-y-auto max-h-[70vh] no-scrollbar">
            {sections.map((section, sIndex) => (
              <React.Fragment key={section.id}>
                {sIndex > 0 && <div className="h-px bg-gray-100 my-2" />}
                {section.title && (
                  <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    {section.title}
                  </div>
                )}
                <div className="flex flex-col">
                  {section.options.map((option) => (
                    <label
                      key={String(option.value)}
                      className={`w-full px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${section.value === option.value ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}
                    >
                      <input
                        type="radio"
                        name={section.radioName}
                        value={option.value}
                        checked={section.value === option.value}
                        onChange={() => {
                          section.onChange(option.value);
                          setTimeout(() => setIsOpen(false), 100);
                        }}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
