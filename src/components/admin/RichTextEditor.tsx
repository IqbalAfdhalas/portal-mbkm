// src/components/admin/RichTextEditor.tsx
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';


// We'll use a simple HTML editor that works on the client-side only
const SimpleEditor = dynamic(
  async () => {
    const mod = await import('react-simple-wysiwyg');
    return mod.default;
  },
  { ssr: false }
);

interface RichTextEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent, onChange }) => {
  const [content, setContent] = useState(initialContent || '');

  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <SimpleEditor
        value={content}
        onChange={handleChange}
        containerProps={{
          className: 'min-h-[300px] w-full',
        }}
      />
    </div>
  );
};

export default RichTextEditor;
