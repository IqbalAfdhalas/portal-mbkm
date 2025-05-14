'use client';

import React from 'react';
import ThreeDPosterHero from '../ui/3DPosterHero';

export default function Hero() {
  return (
    <ThreeDPosterHero
      title={
        <>
          Portal{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            MBKM
          </span>{' '}
          BAST ANRI
        </>
      }
      subtitle="Transformasi Pembelajaran"
      description="Platform resmi BAST ANRI untuk mendukung program Merdeka Belajar Kampus Merdeka. Jelajahi berbagai inovasi pembelajaran dan kolaborasi antara perguruan tinggi dan dunia kerja."
      ctaText="Jelajahi Program"
      ctaLink="#program"
      secondaryCtaText="Tentang MBKM"
      secondaryCtaLink="#tentang"
      poster={{
        src: '/public/images/hero-illustration.png', // Ganti path jika perlu
        alt: 'Poster utama MBKM',
      }}
    />
  );
}
