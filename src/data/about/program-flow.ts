//src/data/about/program-flow.ts

import { AccordionItem } from './mbkm';

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  isCompleted?: boolean;
}

export interface ProgramFlowData {
  headerTitle: string;
  headerDescription: string;
  timelineItems: TimelineItem[];
  accordionItems: AccordionItem[];
}

export const programFlowData: ProgramFlowData = {
  headerTitle: 'Alur Program MBKM BAST ANRI',
  headerDescription: 'Langkah-langkah pelaksanaan program dari tahap persiapan hingga evaluasi.',
  timelineItems: [
    {
      id: 'open-registration',
      title: 'Pembukaan Registrasi',
      date: 'Januari - Februari',
      description: 'Pendaftaran program dibuka untuk mahasiswa dari seluruh Indonesia',
      isCompleted: true,
    },
    {
      id: 'selection',
      title: 'Seleksi dan Pemilihan Peserta',
      date: 'Maret',
      description: 'Proses seleksi administratif dan wawancara untuk memilih peserta terbaik',
      isCompleted: true,
    },
    {
      id: 'orientation',
      title: 'Orientasi Program',
      date: 'April',
      description: 'Pengenalan program, aturan, dan ekspektasi kepada peserta terpilih',
      isCompleted: true,
    },
    {
      id: 'implementation',
      title: 'Pelaksanaan Program',
      date: 'Mei - Oktober',
      description: 'Periode aktif peserta menjalankan program di BAST ANRI',
      isCompleted: false,
    },
    {
      id: 'evaluation',
      title: 'Evaluasi dan Penilaian',
      date: 'November',
      description: 'Penilaian kinerja peserta dan evaluasi program secara keseluruhan',
      isCompleted: false,
    },
    {
      id: 'follow-up',
      title: 'Tindak Lanjut dan Pelaporan',
      date: 'Desember',
      description: 'Finalisasi laporan program dan perencanaan untuk angkatan berikutnya',
      isCompleted: false,
    },
  ],
  accordionItems: [
    {
      id: 'persiapan',
      title: 'Persiapan',
      content: `
        <p>Tahap persiapan program MBKM BAST ANRI meliputi:</p>
        <ul>
          <li><strong>Penyusunan Program</strong> - Tim MBKM dan BAST ANRI menyusun rencana program, termasuk kurikulum, metode pembelajaran, sistem evaluasi, dan jadwal kegiatan.</li>
          <li><strong>Sosialisasi Program</strong> - Informasi tentang program disebarluaskan melalui berbagai kanal komunikasi, termasuk website resmi, media sosial, dan sosialisasi di kampus-kampus.</li>
          <li><strong>Pembukaan Pendaftaran</strong> - Portal pendaftaran online dibuka untuk mahasiswa dari perguruan tinggi yang telah bermitra.</li>
          <li><strong>Seleksi Peserta</strong> - Proses seleksi dilakukan melalui beberapa tahap, termasuk seleksi administrasi, tes pengetahuan dasar, dan wawancara.</li>
          <li><strong>Penempatan</strong> - Peserta yang lolos seleksi akan ditempatkan di unit-unit kerja BAST ANRI sesuai dengan minat, bakat, dan kebutuhan program.</li>
        </ul>
      `,
      isOpen: true,
    },
    {
      id: 'pelaksanaan',
      title: 'Pelaksanaan',
      content: `
        <p>Tahap pelaksanaan program MBKM BAST ANRI meliputi:</p>
        <ol>
          <li><strong>Orientasi Program</strong> - Peserta mengikuti orientasi untuk mengenal lingkungan kerja, budaya organisasi, dan sistem kerja di BAST ANRI.</li>
          <li><strong>Pembelajaran Teori</strong> - Peserta mendapatkan materi teoretis tentang kearsipan, tata naskah, dan manajemen dokumen dari para ahli di BAST ANRI.</li>
          <li><strong>Praktik Kerja</strong> - Peserta terlibat langsung dalam aktivitas kerja sehari-hari di unit penempatan masing-masing.</li>
          <li><strong>Proyek Khusus</strong> - Setiap peserta atau kelompok peserta diberi tanggung jawab untuk mengerjakan proyek khusus yang relevan dengan bidang kearsipan.</li>
          <li><strong>Monitoring Berkala</strong> - Dosen pembimbing dari kampus dan mentor dari BAST ANRI secara berkala melakukan monitoring terhadap perkembangan peserta.</li>
          <li><strong>Laporan Kemajuan</strong> - Peserta menyusun dan menyampaikan laporan kemajuan bulanan kepada dosen pembimbing dan mentor.</li>
        </ol>
      `,
      isOpen: false,
    },
    {
      id: 'evaluasi',
      title: 'Evaluasi',
      content: `
        <p>Tahap evaluasi program MBKM BAST ANRI meliputi:</p>
        <ul>
          <li><strong>Evaluasi Kinerja Peserta</strong> - Penilaian terhadap kinerja peserta dilakukan oleh mentor dari BAST ANRI berdasarkan kriteria yang telah ditetapkan, seperti kedisiplinan, inisiatif, kemampuan bekerja sama, dan kualitas hasil kerja.</li>
          <li><strong>Presentasi Akhir</strong> - Peserta mempresentasikan hasil proyek khusus yang telah dikerjakan di hadapan tim penilai dari BAST ANRI dan dosen pembimbing dari kampus.</li>
          <li><strong>Penilaian Akhir</strong> - Nilai akhir peserta dihitung berdasarkan komponen evaluasi kinerja, presentasi akhir, dan laporan akhir, yang kemudian dikonversi menjadi SKS.</li>
          <li><strong>Evaluasi Program</strong> - Tim MBKM dan BAST ANRI melakukan evaluasi terhadap keseluruhan program, termasuk kurikulum, metode pembelajaran, sistem pembimbingan, dan hasil yang dicapai.</li>
          <li><strong>Survei Kepuasan</strong> - Peserta diminta untuk mengisi survei kepuasan untuk memberikan umpan balik terhadap pelaksanaan program.</li>
        </ul>
      `,
      isOpen: false,
    },
    {
      id: 'follow-up',
      title: 'Follow-up',
      content: `
        <p>Tahap follow-up program MBKM BAST ANRI meliputi:</p>
        <ul>
          <li><strong>Sertifikasi</strong> - Peserta yang telah menyelesaikan program dengan baik akan menerima sertifikat dari BAST ANRI dan pengakuan SKS dari kampus.</li>
          <li><strong>Tracer Study</strong> - Tim program melakukan tracer study untuk memantau perkembangan alumni program dan dampak program terhadap karir mereka.</li>
          <li><strong>Penyempurnaan Program</strong> - Berdasarkan hasil evaluasi dan umpan balik, tim program melakukan penyempurnaan terhadap desain dan pelaksanaan program untuk angkatan berikutnya.</li>
          <li><strong>Publikasi Hasil</strong> - Hasil program dan proyek-proyek terbaik dipublikasikan melalui berbagai media untuk menginspirasi mahasiswa lain dan mempromosikan program.</li>
          <li><strong>Pengembangan Kerjasama</strong> - Tim program mengidentifikasi peluang untuk memperluas kerjasama dengan lebih banyak perguruan tinggi dan unit kerja di BAST ANRI.</li>
          <li><strong>Alumni Engagement</strong> - Alumni program diajak untuk terus terlibat dalam kegiatan-kegiatan BAST ANRI dan menjadi mentor untuk angkatan berikutnya.</li>
        </ul>
      `,
      isOpen: false,
    },
  ],
};

