//src/components/about-detail/ProgramFlowContent.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Accordion, AccordionItemProps } from './Accordion';
import { Timeline } from './Timeline';
import { programFlowData } from '@/data/about/program-flow';

export const ProgramFlowContent: React.FC = () => {
  const { title, description, timelineItems, accordionItems } = programFlowData;

  return (
    <div className="space-y-8">
      {/* Header Component */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
      </div>

      {/* Timeline Visual */}
      <div className="mb-12">
        <h3 className="text-2xl font-medium text-gray-800 mb-6">Timeline Program</h3>
        <Timeline items={timelineItems} />
      </div>

      {/* Accordion Sections */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-2xl font-medium text-gray-800 mb-6">Detail Tahapan Program</h3>
        <Accordion items={accordionItems as AccordionItemProps[]} />
      </div>

      {/* Footer Section with Back to Top button */}
      <div className="flex justify-center mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2 bg-[#087E8B] text-white rounded-md hover:bg-[#0B3954] transition-colors focus:outline-none focus:ring-2 focus:ring-[#087E8B] focus:ring-offset-2"
          aria-label="Kembali ke atas halaman"
        >
          Kembali ke Atas
        </button>
      </div>
    </div>
  );
};

export default ProgramFlowContent;
