//src/components/about-detail/Accordion.tsx

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { MotionDiv } from '@/components/common/MotionClientOnly';


export interface AccordionProps {
  id: string;
  title: string;
  content: string;
  isOpenDefault?: boolean;
}

export const Accordion = ({ id, title, content, isOpenDefault = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const { theme } = useTheme();

  // Dynamic theme styling
  const themeStyles = {
    light: {
      header: 'bg-white hover:bg-gray-50',
      headerActive: 'bg-blue-50',
      title: 'text-gray-800',
      border: 'border-gray-200',
      content: 'bg-white',
      contentText: 'text-gray-700',
      icon: 'text-blue-600',
      focus: 'focus:ring-blue-500',
      divider: 'bg-gray-100',
    },
    dark: {
      header: 'bg-gray-800 hover:bg-gray-750',
      headerActive: 'bg-gray-700',
      title: 'text-gray-100',
      border: 'border-gray-700',
      content: 'bg-gray-800',
      contentText: 'text-gray-300',
      icon: 'text-blue-400',
      focus: 'focus:ring-blue-700',
      divider: 'bg-gray-700',
    },
  };

  // Current theme
  const currentTheme = theme === 'dark' ? themeStyles.dark : themeStyles.light;

  // Format content for better presentation
  const formatContent = (htmlContent: string) => {
    // Add proper spacing between paragraphs if needed
    let formattedContent = htmlContent;

    // Ensure proper spacing for lists
    formattedContent = formattedContent.replace(/<li>/g, '<li class="mb-2">');

    // Add classes to links
    formattedContent = formattedContent.replace(
      /<a(.*?)>/g,
      `<a$1 class="text-blue-600 dark:text-blue-400 hover:underline">`
    );

    return formattedContent;
  };

  return (
    <div
      className={`border-b ${currentTheme.border} last:border-b-0 transition-colors duration-300`}
    >
      <button
        id={`accordion-header-${id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        className={`w-full flex justify-between items-center py-5 px-4 text-left transition-all duration-300 rounded-t-lg
          ${isOpen ? currentTheme.headerActive : currentTheme.header}
          ${currentTheme.focus} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={`text-lg font-medium ${currentTheme.title} transition-colors duration-300`}>
          {title}
        </h3>
        <MotionDiv
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`${currentTheme.icon} transition-colors duration-300`}
        >
          <ChevronDown className="h-5 w-5" />
        </MotionDiv>
      </button>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-header-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Subtle divider line */}
            <div
              className={`h-px w-full ${currentTheme.divider} transition-colors duration-300`}
            ></div>

            <div
              className={`py-6 px-6 ${currentTheme.content} ${currentTheme.contentText} transition-colors duration-300`}
            >
              <div
                className="
    prose prose-sm md:prose lg:prose-lg max-w-none dark:prose-invert 
    prose-headings:font-semibold
    prose-headings:text-gray-900 dark:prose-headings:text-gray-100 
    prose-p:leading-relaxed prose-p:mb-5 prose-p:indent-6 prose-p:text-justify
    prose-li:leading-relaxed prose-li:mb-2 prose-li:ml-6 list-disc
    prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
  "
                dangerouslySetInnerHTML={{ __html: formatContent(content) }}
              />
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};
