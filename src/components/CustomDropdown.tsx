"use client";
import { useState, useRef, useEffect } from "react";

export default function CustomDropdown({
  label,
  required = false,
  error,
  placeholder = "Select",
  options = [],
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col mb-1 col-span-2 sm:col-span-1 relative"
    >
      {/* Label */}
      {label && (
        <label className="text-[16px] font-neueMontreal leading-[120%] text-textPrimary mb-1.5">
          {label}
          {required && <span className="text-[#ff2929]">*</span>}
        </label>
      )}

      {/* Selected Box */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`
          px-3 py-4.5 h-14.5 border rounded-[2px] cursor-pointer
          flex items-center justify-between
          text-bodySmall font-neueMontreal bg-white
          ${error ? "border-[#ff2929]" : "border-[#d1d1d2]"}
        `}
      >
        <span
          className={`${
            selected ? "text-black" : "text-bodySmall text-[#808080]"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>

        {/* SVG Arrow */}
        <svg
          className={`w-4 h-4 transition-all duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5984 7.45837L11.1651 12.8917C10.5234 13.5334 9.47344 13.5334 8.83177 12.8917L3.39844 7.45837"
            stroke="black"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown List */}
      {open && (
        <ul className="absolute left-0 top-[105%] w-full border border-[#d1d1d2] rounded-[2px] bg-white shadow-md z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-3 text-bodySmall font-neueMontreal cursor-pointer hover:bg-gray-100"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {/* Error Message */}
      {error && (
        <span className="text-sm text-[#ff2929] leading-[100%] mt-2 font-neueMontreal">
          Please select an option
        </span>
      )}
    </div>
  );
}
