"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
  Heading1,
  Heading2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = window.prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50/50 sticky top-0 z-10">
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("bold") ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("italic") ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("underline") ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon size={18} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("heading", { level: 1 }) ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("heading", { level: 2 }) ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("bulletList") ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("orderedList") ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={addLink}
        className={cn(
          "p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer",
          editor.isActive("link") ? "bg-[#FF5C19] text-white hover:bg-orange-600" : "text-gray-600"
        )}
        title="Add Link"
      >
        <LinkIcon size={18} />
      </button>

      <div className="flex-1" />

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }}
        className="p-2 rounded-md hover:bg-gray-200 transition-colors text-gray-400 cursor-pointer"
        title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }}
        className="p-2 rounded-md hover:bg-gray-200 transition-colors text-gray-400 cursor-pointer"
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2] }
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-[#FF5C19] underline cursor-pointer"
    }
  }),
];

const TiptapEditor: React.FC<EditorProps> = ({ value, onChange, placeholder, className }) => {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none focus:outline-none min-h-[250px] p-6 text-body4 font-neueMontreal leading-relaxed font-inter",
          className
        ),
      },
    },
  });

  // Watch for external value changes (e.g. when switching items)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:border-[#FF5C19] transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
