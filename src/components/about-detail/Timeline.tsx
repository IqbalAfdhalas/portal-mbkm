//src/components/about-detail/Timeline.tsx

'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import { TimelineItem } from '@/data/about/program-flow';

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="py-6">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Timeline items */}
        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative pl-12 sm:pl-16"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 sm:left-2 top-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-200">
                  {item.isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-[#087E8B]" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <div className="mt-1 text-sm font-medium text-[#087E8B]">{item.date}</div>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

