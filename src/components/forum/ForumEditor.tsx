// src/components/forum/ForumEditor.tsx
import React, { useState } from 'react';

interface ForumEditorProps {
  placeholder?: string;
  initialContent?: string;
  onSubmit: (content: string) => void | Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
  buttonText?: string;
  minHeight?: string;
}

const ForumEditor: React.FC<ForumEditorProps> = ({
  placeholder = 'Tulis disini...',
  initialContent = '',
  onSubmit,
  onCancel,
  isSubmitting = false,
  buttonText = 'Kirim',
  minHeight = '100px',
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSubmitting) {
      await onSubmit(content);
      // Only clear if not in edit mode (initialContent is empty)
      if (!initialContent) {
        setContent('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="forum-editor">
      <div className="border dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-3 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#087E8B] dark:focus:ring-[#164B69] rounded-t-lg`}
          style={{ minHeight }}
        />

        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-750 border-t dark:border-gray-700">
          <div className="flex space-x-2">
            {/* Simple formatting buttons could go here in future versions */}
          </div>

          <div className="flex space-x-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors"
                disabled={isSubmitting}
              >
                Batal
              </button>
            )}

            <button
              type="submit"
              className={`px-4 py-1.5 text-sm font-medium text-white bg-[#087E8B] dark:bg-[#164B69] rounded-md hover:bg-[#076978] dark:hover:bg-[#0f3854] transition-colors ${
                isSubmitting || !content.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForumEditor;
