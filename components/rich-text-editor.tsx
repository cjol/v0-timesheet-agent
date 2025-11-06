"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Link } from "@tiptap/extension-link"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Link as LinkIcon,
  Palette,
} from "lucide-react"
import { useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
  fillHeight?: boolean
}

export function RichTextEditor({ value, onChange, className, fillHeight = false }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: fillHeight
          ? "tiptap max-w-none focus:outline-none h-full p-4 bg-background text-foreground"
          : "tiptap max-w-none focus:outline-none min-h-[200px] p-4 bg-background text-foreground",
      },
    },
  })

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    if (url === null) {
      return
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className={`${className} ${fillHeight ? 'flex flex-col h-full' : ''}`}>
      <div className="border border-border rounded-t-lg bg-muted/50 p-2 flex flex-wrap gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-muted ${
            editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""
          }`}
          title="Heading"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive("bold") ? "bg-muted" : ""}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive("italic") ? "bg-muted" : ""}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-8 bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-muted ${
            editor.isActive("bulletList") ? "bg-muted" : ""
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-muted ${
            editor.isActive("orderedList") ? "bg-muted" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-8 bg-border mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-muted ${editor.isActive("link") ? "bg-muted" : ""}`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <label className="p-2 rounded hover:bg-muted cursor-pointer flex items-center" title="Text Color">
          <Palette className="w-4 h-4" />
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-0 h-0 opacity-0"
          />
        </label>
      </div>
      <div className={`border border-t-0 border-border rounded-b-lg overflow-auto ${fillHeight ? 'flex-1 min-h-0' : ''}`}>
        <EditorContent editor={editor} className={fillHeight ? 'h-full' : ''} />
      </div>
    </div>
  )
}
