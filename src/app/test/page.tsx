"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor/RichTextEditor'), { ssr: false });

const EditorPage = () => {
  const [content, setContent] = useState('<p>Hello World!</p>');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div>
      <h1>Tiptap Editor</h1>
      <RichTextEditor value={content} onChange={handleContentChange} />
    </div>
  );
};

export default EditorPage;
