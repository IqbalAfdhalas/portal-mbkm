'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';




// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Reusable Components
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-DEFAULT dark:text-blue-400 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-20 h-1 bg-gradient-to-r from-primary-DEFAULT to-primary-light rounded-full mx-auto mt-4"></div>
    </motion.div>
  );
};

const TeamMemberCard = ({ name, role, photo }: { name: string; role: string; photo: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={scaleIn}
      className="bg-white dark:bg-dark-surface rounded-xl shadow-md p-6 text-center group transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:translate-y-[-5px]"
    >
      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-xl font-semibold text-primary-DEFAULT dark:text-blue-400 mb-1">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{role}</p>
    </motion.div>
  );
};

const PartnerLogo = ({ logo, name }: { logo: string; name: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="flex items-center justify-center p-4 bg-white dark:bg-dark-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-24 hover:translate-y-[-3px]"
    >
      <Image src={logo} alt={name} width={120} height={60} className="object-contain max-h-16" />
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem = ({
  period,
  title,
  description,
  index,
  isLast,
}: {
  period: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="relative flex items-start"
    >
      {!isLast && (
        <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gradient-to-b from-primary-DEFAULT to-primary-light dark:from-blue-500 dark:to-blue-700"></div>
      )}
      <div className="z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-DEFAULT to-primary-light dark:from-blue-600 dark:to-blue-400 flex items-center justify-center shadow-md">
        <span className="text-white text-xs font-bold">{index + 1}</span>
      </div>
      <div className="ml-6">
        <span className="block text-sm font-medium text-secondary-DEFAULT dark:text-secondary-light">
          {period}
        </span>
        <h3 className="text-lg font-heading font-semibold mt-1 text-primary-DEFAULT dark:text-blue-400">
          {title}
        </h3>
        <p className="mt-1 text-gray-600 dark:text-gray-300 mb-8">{description}</p>
      </div>
    </motion.div>
  );
};

// Card data for struktur program
const programStructureCards = [
  {
    title: 'Persiapan',
    description: 'Tahap persiapan meliputi seleksi peserta, orientasi program, dan pengenalan lingkungan kerja di ANRI.',
    icon: '📝',
  },
  {
    title: 'Implementasi',
    description: 'Pelaksanaan magang di ANRI dengan penugasan proyek nyata sesuai bidang keahlian mahasiswa.',
    icon: '🚀',
  },
  {
    title: 'Evaluasi',
    description: 'Proses penilaian berkala terhadap kinerja mahasiswa dan efektivitas program magang.',
    icon: '📊',
  },
  {
    title: 'Pengembangan',
    description: 'Pendalaman keahlian melalui pelatihan dan workshop khusus bidang kearsipan digital.',
    icon: '💡',
  },
];

// Timeline data
const timelineItems = [
  {
    period: 'Januari - Februari',
    title: 'Pendaftaran & Seleksi',
    description: 'Pembukaan pendaftaran program dan proses seleksi peserta.',
    
  },
  {
    period: 'Maret',
    title: 'Orientasi Program',
    description: 'Pengenalan pada lingkungan kerja dan budaya organisasi ANRI.',
  },
  {
    period: 'April - Juni',
    title: 'Implementasi Program',
    description: 'Pelaksanaan magang dengan bimbingan mentor profesional.',
  },
  {
    period: 'Juli',
    title: 'Evaluasi Tengah',
    description: 'Penilaian progress dan pemberian feedback untuk perbaikan.',
  },
  {
    period: 'Agustus - Oktober',
    title: 'Pengembangan Proyek',
    description: 'Pengerjaan proyek utama dan pendalaman keahlian spesifik.',
  },
  {
    period: 'November - Desember',
    title: 'Finalisasi & Sertifikasi',
    description: 'Penyelesaian proyek akhir dan pemberian sertifikasi.',
  },
];

// Animated Card Component
const AnimatedCard = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={scaleIn}
      className="bg-white dark:bg-dark-surface rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full hover:translate-y-[-5px]"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-heading font-semibold mb-3 text-primary-DEFAULT dark:text-blue-400">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default function TentangPage() {
  return (
    <main>
      {/* Hero Section - Modern, Professional Design */}
      <section className="relative w-full h-72 md:h-96 lg:h-[500px] mb-16">
        <Image
          src="/images/serah_terima.jpg"
          alt="MBKM BAST ANRI"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                Program MBKM BAST di Arsip Nasional Republik Indonesia
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Pengalaman belajar praktis di bidang kearsipan untuk mahasiswa seluruh Indonesia
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section - Refreshed Design */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <SectionHeader title="Tentang MBKM BAST ANRI" />
        <div className="grid md:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              src="/images/about-anri.jpg"
              alt="Gedung ANRI"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-5 text-base leading-relaxed"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-primary-DEFAULT dark:text-blue-400 font-heading">
              Sejarah & Profil Program
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Program Merdeka Belajar Kampus Merdeka (MBKM) Bidang Arsip Statis dan Tata Kelola (BAST) di Arsip Nasional Republik Indonesia (ANRI) merupakan inisiatif kolaboratif antara Kementerian Pendidikan dan Kebudayaan dengan ANRI untuk memberikan pengalaman belajar praktis kepada mahasiswa di bidang kearsipan.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Program ini dirancang untuk memberikan kesempatan kepada mahasiswa dari berbagai disiplin ilmu untuk mengembangkan kompetensi di bidang pengelolaan arsip statis, preservasi digital, dan sistem informasi kearsipan. Melalui program ini, mahasiswa mendapatkan pengalaman kerja nyata dan kredit semester yang dapat diakui oleh institusi pendidikan tinggi mereka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section - Enhanced Professional Look */}
      <section className="bg-gray-50 dark:bg-dark-DEFAULT py-16 md:py-20">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Visi & Misi" 
            subtitle="Tujuan dan sasaran program MBKM BAST ANRI" 
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto"
          >
            {/* Vision */}
            <motion.div 
              variants={scaleIn} 
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-md p-8 border-t-4 border-primary-DEFAULT dark:border-blue-600 h-full hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-2xl font-heading font-semibold mb-5 text-primary-DEFAULT dark:text-blue-400">
                Visi
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Menjadi program unggulan dalam pengembangan sumber daya manusia di bidang kearsipan digital yang inovatif, adaptif terhadap perkembangan teknologi, dan mampu menjawab tantangan era digital dalam preservasi dan akses arsip nasional.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
              variants={scaleIn} 
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-md p-8 border-t-4 border-secondary-DEFAULT dark:border-secondary-DEFAULT h-full hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-2xl font-heading font-semibold mb-5 text-primary-DEFAULT dark:text-blue-400">
                Misi
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300 list-none">
                {[
                  'Memberikan pengalaman praktis dalam pengelolaan arsip statis',
                  'Membangun kompetensi digital dalam preservasi arsip',
                  'Menumbuhkan kesadaran pentingnya arsip sebagai memori kolektif bangsa',
                  'Mengembangkan inovasi dalam sistem informasi kearsipan',
                ].map((point, i) => (
                  <li key={i} className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-secondary-DEFAULT mt-1 mr-3 flex-shrink-0" 
                      fill="none" stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Structure Section - Streamlined */}
      <section
        aria-label="Struktur Program MBKM BAST ANRI"
        className="container mx-auto px-6 py-16 md:py-20 max-w-6xl"
      >
        <SectionHeader 
          title="Struktur Program" 
          subtitle="Komponen utama dalam Program MBKM BAST ANRI" 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {programStructureCards.map((card, idx) => (
            <AnimatedCard key={idx} index={idx} {...card} />
          ))}
        </div>
      </section>

      {/* Timeline Section - More Professional */}
      <section
        aria-label="Timeline Program MBKM BAST ANRI"
        className="bg-gray-50 dark:bg-dark-DEFAULT py-16 md:py-20"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader 
            title="Timeline Program" 
            subtitle="Urutan kegiatan dalam Program MBKM BAST ANRI" 
          />
          <div className="mt-10 pl-6 border-l-2 border-primary-DEFAULT dark:border-blue-600">
            {timelineItems.map((item, idx) => (
              <TimelineItem
                key={idx}
                index={idx}
                isLast={idx === timelineItems.length - 1}
                {...item}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tim Pengelola Section - Lighter, More Professional */}
      <section
        aria-label="Tim Pengelola Program MBKM BAST ANRI"
        className="container mx-auto px-6 py-16 md:py-20 max-w-6xl"
      >
        <SectionHeader 
          title="Tim Pengelola Program" 
          subtitle="Para profesional yang mengelola program MBKM BAST ANRI" 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          <TeamMemberCard
            name="ARRAJULA STAQUFA"
            role="Koordinator Program"
            photo="/images/team/rina.jpg"
          />
          <TeamMemberCard
            name="Iqbal Afdhalas"
            role="Mentor Arsip Digital"
            photo="/images/team/budi.jpg"
          />
          <TeamMemberCard
            name="Kevin putra zerian"
            role="Manajer Pelatihan"
            photo="/images/team/sari.jpg"
          />
          <TeamMemberCard
            name="Abidah Ardelia"
            role="Pengelola Dokumentasi"
            photo="/images/team/agus.jpg"
          />
        </div>
      </section>

      {/* Partner & Kolaborator Section - Minimalist, Professional */}
      <section
        aria-label="Partner dan Kolaborator Program MBKM BAST ANRI"
        className="bg-gray-50 dark:bg-dark-DEFAULT py-16 md:py-20"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader 
            title="Partner & Kolaborator" 
            subtitle="Institusi yang bekerja sama mewujudkan program MBKM BAST ANRI" 
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 items-center mt-10 justify-center max-w-4xl mx-auto">
            <PartnerLogo logo="/images/Logo_ANRI.png" name="ANRI" />
            <PartnerLogo logo="/images/kemdikbud.png" name="Kemdikbud" />
            <PartnerLogo logo="/images/logo_mbkm_white.png" name="Universitas Syiah Kuala" />
          </div>
        </div>
      </section>
    </main>
  );
}