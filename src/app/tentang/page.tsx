// src/app/tentang/page.tsx
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaHandshake, FaLightbulb, FaUniversity } from 'react-icons/fa';
import { MdTimeline } from 'react-icons/md';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const fadeInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 }
  }
};

const fadeInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 }
  }
};

const TentangMBKMPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-dark-DEFAULT min-h-screen">
      {/* Hero Section - Modern Glass Morphism Style */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-600/90 z-10"></div>
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/pattern-dots.svg" 
            alt="Background pattern" 
            fill
            className="object-cover"
          />
        </div>
        
        {/* Glass Card */}
        <div className="container mx-auto px-4 z-20">
          <motion.div 
            className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">
              Tentang MBKM BAST ANRI
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Program Merdeka Belajar Kampus Merdeka di Badan Arsip Nasional Republik Indonesia
            </p>
            <div className="h-1.5 w-32 bg-white/80 rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Modern Card Design */}
      <div className="container mx-auto px-4 py-16">
        {/* Tentang Section with Split Layout */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div className="flex-1" variants={fadeInFromLeft}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-primary dark:text-blue-400 relative">
                Tentang Program
                <span className="block h-1.5 w-24 bg-secondary rounded-full mt-4"></span>
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-lg">
                  Program Merdeka Belajar – Kampus Merdeka (MBKM) merupakan kebijakan Menteri Pendidikan dan 
                  Kebudayaan yang bertujuan mendorong mahasiswa untuk menguasai berbagai keilmuan untuk bekal 
                  memasuki dunia kerja. Kebijakan MBKM memberikan kesempatan bagi mahasiswa untuk mengambil 
                  SKS di luar program studi selama maksimal 3 semester.
                </p>
                <p className="text-lg">
                  MBKM BAST ANRI merupakan program kerja sama antara perguruan tinggi dengan Badan Arsip Nasional 
                  Republik Indonesia untuk memberikan pengalaman praktis bagi mahasiswa dalam bidang kearsipan, 
                  pengelolaan dokumen, pelestarian, dan digitalisasi arsip sejarah Indonesia.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 rounded-3xl overflow-hidden shadow-xl"
              variants={fadeInFromRight}
            >
              <Image 
                src="/api/placeholder/600/400"
                alt="MBKM BAST ANRI Program" 
                width={600} 
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Visi & Misi with Modern Gradient Cards */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-primary dark:text-blue-400 text-center relative">
            Visi & Misi
            <span className="block h-1.5 w-24 bg-secondary rounded-full mt-4 mx-auto"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="rounded-3xl overflow-hidden shadow-xl"
              variants={scaleIn}
            >
              <div className="bg-gradient-to-br from-primary to-blue-600 p-1">
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 h-full">
                  <h3 className="text-2xl font-heading font-bold mb-6 text-primary dark:text-blue-400">
                    Visi
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 text-lg">
                    Menjadi program unggulan yang mencetak generasi muda profesional kearsipan yang kompeten, 
                    inovatif, dan berwawasan global demi memajukan pelestarian serta pengelolaan arsip 
                    nasional di era digital.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-3xl overflow-hidden shadow-xl"
              variants={scaleIn}
            >
              <div className="bg-gradient-to-br from-secondary to-amber-500 p-1">
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 h-full">
                  <h3 className="text-2xl font-heading font-bold mb-6 text-secondary dark:text-amber-400">
                    Misi
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3"></span>
                      <span className="text-lg">Menyelenggarakan program magang berkualitas yang berfokus pada pengembangan kompetensi kearsipan.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3"></span>
                      <span className="text-lg">Membangun kemitraan strategis dengan perguruan tinggi untuk mengembangkan kurikulum kearsipan yang relevan.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3"></span>
                      <span className="text-lg">Mengembangkan inovasi dalam bidang pengelolaan dan pelestarian arsip melalui pemanfaatan teknologi digital.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3"></span>
                      <span className="text-lg">Mendorong penelitian dan pengembangan di bidang kearsipan untuk kemajuan ilmu pengetahuan.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3"></span>
                      <span className="text-lg">Meningkatkan kesadaran publik akan pentingnya arsip sebagai aset informasi nasional.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Program Structure with Floating Cards */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-primary dark:text-blue-400 text-center relative">
            Struktur Program
            <span className="block h-1.5 w-24 bg-secondary rounded-full mt-4 mx-auto"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border-t-4 border-primary"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary dark:text-blue-400 mb-6">
                <FaGraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Pembelajaran</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mahasiswa mendapatkan pembelajaran teori kearsipan, sejarah arsip, dan pengantar ilmu kearsipan 
                dari praktisi dan akademisi berpengalaman.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border-t-4 border-blue-500"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-6">
                <FaHandshake size={32} />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Praktik Kerja</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Program magang intensif di berbagai divisi ANRI, memberikan pengalaman hands-on dalam 
                pengolahan, preservasi, dan digitalisasi arsip.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border-t-4 border-secondary"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary dark:text-amber-400 mb-6">
                <FaLightbulb size={32} />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Proyek Inovasi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mahasiswa mengembangkan proyek inovasi untuk memecahkan permasalahan nyata dalam 
                pengelolaan arsip dengan pendekatan teknologi.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border-t-4 border-indigo-500"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6">
                <FaUniversity size={32} />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Penelitian</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Kesempatan melakukan penelitian di bidang kearsipan dengan bimbingan dari 
                ahli dengan akses ke sumber arsip primer yang unik.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Timeline with Modern Visualization */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-primary dark:text-blue-400 text-center flex items-center justify-center">
            <MdTimeline className="mr-3" size={40} /> Timeline Program
            <span className="block h-1.5 w-24 bg-secondary rounded-full mt-4 ml-4"></span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Timeline items with floating cards */}
            <div className="relative border-l-2 border-primary-light dark:border-blue-700 ml-6 md:ml-12 pl-12 py-2">
              {/* Timeline items */}
              <motion.div 
                className="mb-16 relative"
                variants={scaleIn}
              >
                <div className="absolute -left-16 mt-2 w-10 h-10 rounded-full bg-primary shadow-lg flex items-center justify-center text-white">
                  <span className="font-bold">1</span>
                </div>
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 border-l-4 border-primary">
                  <h3 className="text-2xl font-heading font-bold text-primary dark:text-blue-400">
                    Periode Pendaftaran
                  </h3>
                  <p className="text-sm font-semibold bg-primary/10 text-primary dark:text-blue-300 inline-block px-4 py-1 rounded-full mb-4 mt-2">
                    Januari - Februari 2026
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    Pembukaan pendaftaran untuk mahasiswa tahun akademik 2025/2026. Proses seleksi meliputi 
                    seleksi administratif, tes tertulis, dan wawancara.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-16 relative"
                variants={scaleIn}
              >
                <div className="absolute -left-16 mt-2 w-10 h-10 rounded-full bg-blue-500 shadow-lg flex items-center justify-center text-white">
                  <span className="font-bold">2</span>
                </div>
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-heading font-bold text-blue-500 dark:text-blue-400">
                    Pembekalan & Orientasi
                  </h3>
                  <p className="text-sm font-semibold bg-blue-500/10 text-blue-500 dark:text-blue-300 inline-block px-4 py-1 rounded-full mb-4 mt-2">
                    Maret 2026
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    Mahasiswa terpilih mengikuti program pembekalan dan orientasi di ANRI. Pengenalan 
                    terhadap lingkungan kerja, prosedur, dan protokol keamanan.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-16 relative"
                variants={scaleIn}
              >
                <div className="absolute -left-16 mt-2 w-10 h-10 rounded-full bg-indigo-500 shadow-lg flex items-center justify-center text-white">
                  <span className="font-bold">3</span>
                </div>
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-heading font-bold text-indigo-500 dark:text-indigo-400">
                    Fase Pembelajaran
                  </h3>
                  <p className="text-sm font-semibold bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 inline-block px-4 py-1 rounded-full mb-4 mt-2">
                    April - Mei 2026
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    Pelatihan intensif dan pembelajaran teori kearsipan. Workshop dan seminar dari 
                    para ahli di bidang arsip dan dokumentasi.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-16 relative"
                variants={scaleIn}
              >
                <div className="absolute -left-16 mt-2 w-10 h-10 rounded-full bg-purple-500 shadow-lg flex items-center justify-center text-white">
                  <span className="font-bold">4</span>
                </div>
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-heading font-bold text-purple-500 dark:text-purple-400">
                    Fase Praktik Kerja
                  </h3>
                  <p className="text-sm font-semibold bg-purple-500/10 text-purple-500 dark:text-purple-300 inline-block px-4 py-1 rounded-full mb-4 mt-2">
                    Juni - Agustus 2026
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    Penempatan di divisi-divisi ANRI sesuai minat dan kompetensi mahasiswa. Praktik 
                    langsung dalam pengelolaan arsip nasional.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-16 relative"
                variants={scaleIn}
              >
                <div className="absolute -left-16 mt-2 w-10 h-10 rounded-full bg-secondary shadow-lg flex items-center justify-center text-white">
                  <span className="font-bold">5</span>
                </div>
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 border-l-4 border-secondary">
                  <h3 className="text-2xl font-heading font-bold text-secondary dark:text-amber-400">
                    Pengembangan Proyek Inovasi
                  </h3>
                  <p className="text-sm font-semibold bg-secondary/10 text-secondary dark:text-amber-300 inline-block px-4 py-1 rounded-full mb-4 mt-2">
                    September - Oktober 2026
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    Mahasiswa mengembangkan proyek inovasi dengan bimbingan mentor. Fokus pada 
                    solusi teknologi untuk masalah kearsipan.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative"
                variants={scaleIn}
              >
                <div className="absolute -left-16 mt-2 w-10 h-10 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white">
                  <span className="font-bold">6</span>
                </div>
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 border-l-4 border-green-500">
                  <h3 className="text-2xl font-heading font-bold text-green-500 dark:text-green-400">
                    Evaluasi & Presentasi Akhir
                  </h3>
                  <p className="text-sm font-semibold bg-green-500/10 text-green-500 dark:text-green-300 inline-block px-4 py-1 rounded-full mb-4 mt-2">
                    November - Desember 2026
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    Presentasi hasil proyek dan inovasi. Evaluasi akhir program dan pemberian sertifikat 
                    penyelesaian program MBKM.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Call to Action */}
        <motion.section
          className="rounded-3xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="bg-gradient-to-r from-primary to-blue-600 p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">
              Tertarik Bergabung dengan MBKM BAST ANRI?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Dapatkan pengalaman berharga dan keterampilan profesional dalam bidang kearsipan 
              melalui program MBKM BAST ANRI.
            </p>
            <button className="bg-white text-primary font-bold text-lg px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Daftar Sekarang
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default TentangMBKMPage;