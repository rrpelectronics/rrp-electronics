"use client";
import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  itemTitle: string | undefined;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, itemTitle, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 border border-gray-100">
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete Confirmation</h3>
            <p className="text-gray-500 text-body4 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-medium text-gray-900 italic">"{itemTitle}"</span>? This action cannot be undone.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <button
              onClick={onClose}
              className="h-12 px-4 rounded-xl text-body4 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="h-12 px-4 rounded-xl text-body4 font-medium text-white bg-red-500 hover:bg-red-600 transition-all shadow-md shadow-red-500/20 active:scale-95 cursor-pointer"
            >
              Yes, Delete
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
