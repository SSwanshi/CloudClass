"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import React from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
        },
        validate: href => /^https?:\/\//.test(href),
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-5",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  if (!editor) {
    return <div className="border rounded-lg p-4 bg-white dark:bg-slate-800">Loading editor...</div>;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-600 ${
            editor.isActive('bold') ? 'bg-gray-200 dark:bg-slate-600' : ''
          }`}
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-600 ${
            editor.isActive('italic') ? 'bg-gray-200 dark:bg-slate-600' : ''
          }`}
          title="Italic"
        >
          <span className="italic">I</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-600 ${
            editor.isActive('underline') ? 'bg-gray-200 dark:bg-slate-600' : ''
          }`}
          title="Underline"
        >
          <span className="underline">U</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-600 ${
            editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-slate-600' : ''
          }`}
          title="Bullet List"
        >
          <span>• List</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-600 ${
            editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-slate-600' : ''
          }`}
          title="Numbered List"
        >
          <span>1. List</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-600 ${
            editor.isActive('code') ? 'bg-gray-200 dark:bg-slate-600' : ''
          }`}
          title="Code"
        >
          <span className="font-mono text-sm">{"</>"}</span>
        </button>
      </div>

      {/* Content area */}
      <EditorContent editor={editor} />
    </div>
  );
};