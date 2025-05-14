// src/components/sections/Stats.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const Stats = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const statistics = [
    { value: 1500, suffix: '+', label: 'Mahasiswa Terdaftar' },
    { value: 35, suffix: '+', label: 'Universitas Mitra' },
    { value: 8, suffix: '', label: 'Program Tersedia' },
    { value: 95, suffix: '%', label: 'Tingkat Kepuasan' },
  ];

  return (
    <section id="stats" className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
            Statistik Program MBKM
          </h2>
          <p className="text-blue-100 mt-2">
            Data partisipasi dan kepuasan berdasarkan penyelenggaraan terkini.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {inView && <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />}
              </div>
              <p className="text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
