// src/components/sections/Faq.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
};

const FaqItem = ({ question, answer, isOpen, toggleOpen }: FaqItemProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        className="w-full text-left py-6 px-4 flex justify-between items-center focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold font-heading text-primary-light dark:text-blue-400">
          {question}
        </h3>
        <span className="text-primary-light dark:text-blue-400 ml-2">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 pb-6 text-gray-600 dark:text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // FAQ data from the document
  const FaqItems = [
    {
      question: 'Apa itu program magang MBKM BAST ANRI?',
      answer: 'Program ini adalah bentuk pelaksanaan Merdeka Belajar Kampus Merdeka (MBKM) di lingkungan Arsip Nasional Republik Indonesia yang memberikan pengalaman kerja langsung bagi mahasiswa selama satu semester penuh (20 SKS). Mahasiswa akan belajar tentang tata kelola arsip modern dan praktik kearsipan digital di instansi pemerintah.'
    },
    {
      question: 'Magang di ANRI ngapain aja?',
      answer: 'Mahasiswa akan terlibat dalam beberapa kegiatan seperti digitalisasi arsip, pengembangan sistem kearsipan elektronik, dokumentasi kebijakan, pengelolaan arsip dinamis dan statis, serta proyek khusus sesuai latar belakang keilmuan. Selain itu, ada sesi mentoring mingguan dan kunjungan ke berbagai depot arsip ANRI.'
    },
    {
      question: 'Bagaimana cara mendaftar program ini?',
      answer: 'Pendaftaran dilakukan melalui portal MBKM kampus masing-masing. Setelah lolos seleksi administrasi, mahasiswa akan mengikuti wawancara online, dan jika diterima akan diarahkan untuk login ke portal BAST ANRI untuk melengkapi data dan memulai program.'
    },
    {
      question: 'Berapa lama durasi program magang MBKM di ANRI?',
      answer: 'Program berlangsung selama satu semester penuh (sekitar 6 bulan) dengan beban ekuivalen 20 SKS. Mahasiswa diharapkan menyelesaikan minimal 900 jam kegiatan yang terdiri dari magang langsung, pengerjaan proyek, dan dokumentasi portofolio.'
    },
    {
      question: 'Saya lupa password untuk login ke portal, harus bagaimana?',
      answer: 'Klik "Lupa Password" pada halaman login portal, lalu ikuti petunjuk untuk reset melalui email yang terdaftar. Email reset akan dikirim dalam waktu maksimal 5 menit. Jika masih mengalami kendala, hubungi admin di admin@bast-anri.go.id.'
    },
    {
      question: 'Apakah saya mendapatkan sertifikat setelah selesai program?',
      answer: 'Ya, setiap peserta yang menyelesaikan program dengan baik akan mendapatkan sertifikat resmi dari ANRI. Sertifikat akan diterbitkan dalam format digital dan fisik setelah program berakhir dan semua persyaratan terpenuhi, termasuk laporan akhir dan penilaian dari mentor.'
    },
    {
      question: 'Apakah portal ini bisa diakses lewat HP?',
      answer: 'Ya, portal MBKM BAST ANRI dirancang dengan responsif dan dapat diakses secara optimal baik melalui perangkat mobile maupun desktop. Semua fitur utama termasuk pengumpulan tugas, diskusi forum, dan pengisian logbook tersedia dalam versi mobile.'
    },
    {
      question: 'Kapan tahap pendaftaran dibuka setiap tahunnya?',
      answer: 'Pendaftaran dibuka dua kali setahun mengikuti semester akademik. Periode Gasal (Agustus-Januari) dibuka pendaftarannya pada Mei-Juni, sedangkan periode Genap (Februari-Juli) dibuka pendaftarannya pada November-Desember.'
    },
    {
      question: 'Apakah ada tunjangan atau kompensasi untuk mahasiswa magang?',
      answer: 'ANRI menyediakan uang transportasi harian bagi peserta program. Selain itu, peserta juga akan mendapatkan akses ke fasilitas kantor termasuk ruang kerja, perpustakaan arsip, dan kantin dengan subsidi. Untuk mahasiswa dari luar kota, ANRI tidak menyediakan akomodasi penginapan.'
    },
    {
      question: 'Bagaimana proses penilaian dan konversi SKS di program ini?',
      answer: 'Penilaian dilakukan oleh mentor ANRI dan dosen pendamping dari kampus dengan komponen: kehadiran (20%), logbook harian (20%), laporan tengah (20%), proyek akhir (30%), dan soft skills (10%). Hasil penilaian akan dikonversi menjadi 20 SKS sesuai kebijakan kampus masing-masing.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="Faq"
      className="py-20 bg-white dark:bg-gradient-to-b dark:from-[#1A202C] dark:to-[#2D3748]"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Pertanyaan Umum
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Pertanyaan umum seputar program magang MBKM BAST ANRI
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto bg-white dark:bg-[#2D3748] rounded-lg shadow-md overflow-hidden"
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
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;