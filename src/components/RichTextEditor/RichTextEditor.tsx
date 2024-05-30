import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import dynamic from "next/dynamic";
import "prosemirror-view/style/prosemirror.css";
import styles from "./RichTextEditor.module.scss";
import BoldIcon from "@/assets/icons/bold.svg";
import ItalicIcon from "@/assets/icons/italic.svg";
import BulletListIcon from "@/assets/icons/bulletlist.svg";
import OrderListIcon from "@/assets/icons/orderedlist.svg";
import LinkIcon from "@/assets/icons/link-1.svg";
import LinkeThroughIcon from "@/assets/icons/line-through.svg";
import UnderLineIcon from "@/assets/icons/text-underline.svg";

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        }
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      BulletList,
      OrderedList,
      ListItem,
      Link,
      Heading,
      Placeholder.configure({
        placeholder: "Kaiser is cooking...."
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const addLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? styles.isActive : ""}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles.isActive : ""}
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? styles.isActive : ""}
        >
          <UnderLineIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? styles.isActive : ""}
        >
          <LinkeThroughIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles.isActive : ""}
        >
          <BulletListIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? styles.isActive : ""}
        >
          <OrderListIcon />
        </button>
        <button
          onClick={addLink}
          className={editor.isActive("link") ? styles.isActive : ""}
        >
          <LinkIcon />
        </button>
      </div>
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(TiptapEditor), { ssr: false });
