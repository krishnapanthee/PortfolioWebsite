"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect } from "react";

const lowlight = createLowlight(common);

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      ImageExtension,
    ],
    content: value || "<p>Write your article content here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-sm leading-relaxed text-[#d4d4d4]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-[#262626] rounded-xl overflow-hidden bg-[#111111] space-y-0">
      {/* Toolbar */}
      <div className="p-2 border-b border-[#222222] bg-[#161616] flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("bold") ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="Bold"
        >
          <Bold size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("italic") ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="Italic"
        >
          <Italic size={15} />
        </button>

        <div className="h-4 w-px bg-[#2a2a2a] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("heading", { level: 1 }) ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="H1 Heading"
        >
          <Heading1 size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="H2 Heading"
        >
          <Heading2 size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="H3 Heading"
        >
          <Heading3 size={15} />
        </button>

        <div className="h-4 w-px bg-[#2a2a2a] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("bulletList") ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="Bullet List"
        >
          <List size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("orderedList") ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="Ordered List"
        >
          <ListOrdered size={15} />
        </button>

        <div className="h-4 w-px bg-[#2a2a2a] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("blockquote") ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="Quote"
        >
          <Quote size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded text-xs transition-colors ${
            editor.isActive("codeBlock") ? "bg-[#10b981] text-black" : "text-[#a3a3a3] hover:bg-[#262626]"
          }`}
          title="Code Block"
        >
          <Code size={15} />
        </button>

        <div className="h-4 w-px bg-[#2a2a2a] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded text-xs text-[#a3a3a3] hover:bg-[#262626] transition-colors"
          title="Undo"
        >
          <Undo size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded text-xs text-[#a3a3a3] hover:bg-[#262626] transition-colors"
          title="Redo"
        >
          <Redo size={15} />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
