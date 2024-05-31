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
import { useField } from "formik";

interface TiptapEditorProps {
  value: string;
  label: string;
  name: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onChange,
  name,
  label
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "my-bulletlist-class"
        },
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "my-orderlist-class"
        },
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true
      }),
      Link,
      Heading,
      Placeholder.configure({
        placeholder: "Kaiser is cooking...."
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue(content);
      onChange(content);
    }
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const handleBlur = () => {
    setTouched(true);
  };

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
    <div>
      {label && (
        <label htmlFor={name} className={` ${styles.label}`}>
          <div>{label}</div>
        </label>
      )}

      <div className={styles.editorContainer}>
        <div className={styles.toolbar}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? styles.isActive : ""}
          >
            <BoldIcon />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? styles.isActive : ""}
          >
            <ItalicIcon />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? styles.isActive : ""}
          >
            <UnderLineIcon />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? styles.isActive : ""}
          >
            <LinkeThroughIcon />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? styles.isActive : ""}
          >
            <BulletListIcon />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? styles.isActive : ""}
          >
            <OrderListIcon />
          </button>
          <button
            type="button"
            onClick={addLink}
            className={editor.isActive("link") ? styles.isActive : ""}
          >
            <LinkIcon />
          </button>
        </div>
        <div onBlur={handleBlur}>
          <EditorContent
            editor={editor}
            className={
              meta.error && meta.touched
                ? "border-primary400"
                : styles.editorContent
            }
            {...field}
          />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(TiptapEditor), { ssr: false });
