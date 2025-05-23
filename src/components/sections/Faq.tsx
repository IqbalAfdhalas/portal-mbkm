// src/components/sections/Faq.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/common/MotionClientOnly';

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
};

const FaqItem = ({ question, answer, isOpen, toggleOpen, index }: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Dynamic gradient based on index for visual variety
  const gradients = [
    'from-blue-600 to-indigo-700',
    'from-teal-600 to-blue-700',
    'from-indigo-600 to-purple-700',
    'from-cyan-600 to-blue-700',
    'from-blue-700 to-indigo-800',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <MotionDiv
      className={`mb-6 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${isOpen ? 'scale-102 shadow-xl' : 'hover:shadow-xl'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      layout
    >
      <div className={`bg-gradient-to-r ${gradient} dark:opacity-95`}>
        <button
          className="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
          onClick={toggleOpen}
          aria-expanded={isOpen}
        >
          <h3 className="text-lg md:text-xl font-semibold font-heading text-white group-hover:text-white/90 transition-colors duration-200 pr-8">
            {question}
          </h3>
          <MotionDiv
            animate={{
              rotate: isOpen ? 180 : 0,
              backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-white rounded-full p-1.5 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </MotionDiv>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.4, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden bg-white dark:bg-gray-800"
            ref={contentRef}
          >
            <div className="p-6 border-t-2 border-white/10">
              <MotionDiv
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-start mb-2">
                  <div
                    className={`p-2 rounded-full bg-gradient-to-r ${gradient} text-white mr-4 mt-1 flex-shrink-0`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p>{answer}</p>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};

const Faq = () => {
  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // FAQ data from the document
  const FaqItems = [
    {
      question: 'Apa itu program MBKM BAST ANRI – USK Unggul?',
      answer:
        'Program kolaborasi Merdeka Belajar Kampus Merdeka (MBKM) antara Balai Arsip Statis dan Tsunami (BAST ANRI) dengan Universitas Syiah Kuala (USK Unggul), memberi kesempatan mahasiswa USK belajar kearsipan modern, digitalisasi arsip, dan manajemen rekod di lingkungan Arsip Nasional RI.',
    },
    {
      question: 'Siapa saja yang berhak mengikuti program ini?',
      answer:
        'Mahasiswa aktif USK semua fakultas, minimal semester 5, dengan IPK ≥ 3.00 serta memiliki Surat Rekomendasi dari fakultas dan program studi.',
    },
    {
      question: 'Berapa lama durasi magang dan beban SKS-nya?',
      answer:
        'Program berlangsung selama satu semester (6 bulan) dengan beban 20 SKS. Mahasiswa wajib menyelesaikan minimal 900 jam magang, termasuk tugas lapangan, proyek digitalisasi, dan laporan portofolio.',
    },
    {
      question: 'Bagaimana mekanisme penilaian dan konversi SKS?',
      answer:
        'Penilaian dilakukan oleh mentor ANRI dan dosen pembimbing USK berdasarkan kehadiran, logbook harian, laporan tengah, proyek akhir, dan penilaian sikap. Nilai akhir akan dikonversi menjadi 20 SKS sesuai ketentuan yang berlaku di Universitas Syiah Kuala.',
    },
    {
      question: 'Apakah saya mendapat sertifikat setelah selesai program?',
      answer:
        'Ya, peserta yang menyelesaikan program akan mendapatkan sertifikat resmi dari BAST ANRI–USK sebagai bukti partisipasi dan penyelesaian program magang.',
    },
    {
      question: 'Bagaimana cara menghubungi admin atau mentor?',
      answer:
        'Untuk kendala teknis portal, silakan hubungi email portal@mbkm-usk.ac.id. Untuk konsultasi terkait kearsipan atau mentoring, dapat menghubungi BAST ANRI melalui email bast@anri.go.id.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="Faq"
      className="py-20 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <MotionDiv
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-1 w-12 bg-blue-500 rounded-full mr-3"></span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 px-4 py-1.5 rounded-full">
              Pertanyaan Umum
            </span>
            <span className="h-1 w-12 bg-blue-500 rounded-full ml-3"></span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-800 dark:text-white mt-2 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Frequently Asked Questions
          </h2>

          <motion.p
            className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Temukan jawaban untuk pertanyaan umum seputar program magang MBKM BAST ANRI
          </motion.p>
        </MotionDiv>

        <MotionDiv
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {FaqItems.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFaq(index)}
              index={index}
            />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

export default Faq;
