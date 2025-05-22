import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBookOpen, FiCalendar, FiBriefcase } from 'react-icons/fi';

import type { ProfileType } from '@/constants/profileData';

interface ProfileCardProps {
  profile: ProfileType;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define card color based on role
  const getCardColor = () => {
    switch (profile.peran) {
      case 'Pembimbing Kampus':
        return {
          gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30',
          glow: 'rgba(59, 130, 246, 0.5)', // blue glow
          badge: 'bg-blue-500 hover:bg-blue-600',
          icon: 'text-blue-500',
        };
      case 'Mentor BAST ANRI':
        return {
          gradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30',
          glow: 'rgba(34, 197, 94, 0.5)', // green glow
          badge: 'bg-green-500 hover:bg-green-600',
          icon: 'text-green-500',
        };
      case 'Mahasiswa':
        return {
          gradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30',
          glow: 'rgba(168, 85, 247, 0.5)', // purple glow
          badge: 'bg-purple-500 hover:bg-purple-600',
          icon: 'text-purple-500',
        };
      default:
        return {
          gradient: 'from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50',
          glow: 'rgba(107, 114, 128, 0.5)', // gray glow
          badge: 'bg-gray-500 hover:bg-gray-600',
          icon: 'text-gray-500',
        };
    }
  };

  const colors = getCardColor();

  // Define animation variants
  const cardVariants = {
    initial: {
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    hover: {
      y: -10,
      boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px 0px ${colors.glow}`,
      transition: {
        y: { type: 'spring', stiffness: 300, damping: 15 },
        boxShadow: { duration: 0.3 },
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.4 },
    },
  };

  const badgeVariants = {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.12, 1],
      transition: {
        repeat: Infinity,
        repeatType: 'reverse' as const,
        duration: 1.5,
      },
    },
  };

  const infoVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const infoItemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Get correct program name
  const getProgramName = (code: string) => {
    switch (code) {
      case 'MI':
        return 'Manajemen Informatika';
      case 'IK':
        return 'Ilmu Komunikasi';
      case 'Arsip':
        return 'Arsip';
      case 'Perpustakaan':
        return 'Perpustakaan';
      default:
        return code;
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={isHovered ? 'hover' : 'initial'}
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`max-w-xs w-full rounded-xl overflow-hidden shadow-md transition-all duration-300 bg-gradient-to-br ${colors.gradient} h-full relative`}
    >
      <div className="flex flex-col h-full">
        {/* 4:3 aspect ratio for image container */}
        <div className="relative aspect-[3/4] bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <motion.img
            variants={imageVariants}
            src={profile.foto || '/api/placeholder/400/300'}
            alt={profile.nama}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
            <motion.div variants={badgeVariants} className="inline-block">
              <span
                className={`text-xs font-medium text-white ${colors.badge} px-3 py-1 rounded-full transition-colors duration-300 shadow-md`}
              >
                {profile.peran}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Profile Info */}
        <motion.div
          className="p-5 flex flex-col flex-grow"
          initial="initial"
          animate="animate"
          variants={infoVariants}
        >
          <motion.h4
            variants={infoItemVariants}
            className="text-lg font-semibold mb-3 font-heading text-gray-800 dark:text-white line-clamp-1"
          >
            {profile.nama}
          </motion.h4>

          <div className="space-y-3 mt-1">
            {/* Conditional rendering based on role */}
            {profile.asalInstitusi && (
              <motion.div
                variants={infoItemVariants}
                className="flex items-center text-sm text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`mr-2 ${colors.icon} flex-shrink-0 transform transition-transform group-hover:scale-125 duration-300`}
                >
                  <FiMapPin size={16} />
                </div>
                <span className="line-clamp-1 group-hover:font-medium transition-all duration-300">
                  {profile.asalInstitusi}
                </span>
              </motion.div>
            )}

            {profile.prodi && (
              <motion.div
                variants={infoItemVariants}
                className="flex items-center text-sm text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`mr-2 ${colors.icon} flex-shrink-0 transform transition-transform group-hover:scale-125 duration-300`}
                >
                  <FiBookOpen size={16} />
                </div>
                <span className="group-hover:font-medium transition-all duration-300">
                  {getProgramName(profile.prodi)}
                </span>
              </motion.div>
            )}

            {profile.angkatan && (
              <motion.div
                variants={infoItemVariants}
                className="flex items-center text-sm text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`mr-2 ${colors.icon} flex-shrink-0 transform transition-transform group-hover:scale-125 duration-300`}
                >
                  <FiCalendar size={16} />
                </div>
                <span className="group-hover:font-medium transition-all duration-300">
                  Angkatan {profile.angkatan}
                </span>
              </motion.div>
            )}

            {profile.unit && (
              <motion.div
                variants={infoItemVariants}
                className="flex items-center text-sm text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`mr-2 ${colors.icon} flex-shrink-0 transform transition-transform group-hover:scale-125 duration-300`}
                >
                  <FiBriefcase size={16} />
                </div>
                <span className="line-clamp-1 group-hover:font-medium transition-all duration-300">
                  Unit: {profile.unit}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Subtle glow overlay effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl opacity-0"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 20px ${colors.glow}`,
          background: `radial-gradient(circle at 50% 50%, ${colors.glow} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

export default ProfileCard;
