import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBookOpen, FiCalendar, FiBriefcase } from 'react-icons/fi';
import { MotionDiv } from '@/components/common/MotionClientOnly';
import type { ProfileType } from '@/data/kenali-kami/profileData';

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

  // Define animation variants with responsive considerations
  const cardVariants = {
    initial: {
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    hover: {
      y: -8, // Reduced for mobile
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
      scale: 1.03, // Reduced scale for better mobile experience
      transition: { duration: 0.4 },
    },
  };

  const badgeVariants = {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.08, 1], // Reduced scale animation
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
    <MotionDiv
      initial="initial"
      whileHover="hover"
      animate={isHovered ? 'hover' : 'initial'}
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        w-full 
        max-w-[260px] 
        xs:max-w-[280px] 
        sm:max-w-[300px] 
        md:max-w-[320px] 
        lg:max-w-[340px] 
        xl:max-w-[360px]
        rounded-lg 
        sm:rounded-xl 
        lg:rounded-2xl 
        overflow-hidden 
        shadow-md 
        hover:shadow-xl 
        transition-all 
        duration-300 
        bg-gradient-to-br 
        ${colors.gradient} 
        h-full 
        relative
        mx-auto
      `}
    >
      <div className="flex flex-col h-full">
        {/* Image container with responsive aspect ratio */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <motion.img
            variants={imageVariants}
            src={profile.foto || '/api/placeholder/400/300'}
            alt={profile.nama}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />

          {/* Gradient overlay with badge */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 sm:p-3 md:p-4">
            <MotionDiv variants={badgeVariants} className="inline-block">
              <span
                className={`
                  text-[10px] 
                  xs:text-xs 
                  sm:text-sm 
                  font-medium 
                  text-white 
                  ${colors.badge} 
                  px-2 
                  xs:px-3 
                  py-1 
                  xs:py-1.5
                  rounded-full 
                  transition-colors 
                  duration-300 
                  shadow-md
                  whitespace-nowrap
                `}
              >
                {profile.peran}
              </span>
            </MotionDiv>
          </div>
        </div>

        {/* Profile Info with responsive padding */}
        <MotionDiv
          className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow"
          initial="initial"
          animate="animate"
          variants={infoVariants}
        >
          {/* Name with fixed height to ensure alignment */}
          <div className="h-12 sm:h-14 md:h-16 lg:h-18 mb-2 sm:mb-3 md:mb-4 flex items-start">
            <motion.h4
              variants={infoItemVariants}
              className="
                text-sm 
                xs:text-base 
                sm:text-lg 
                md:text-xl 
                font-semibold 
                font-heading 
                text-gray-800 
                dark:text-white 
                line-clamp-2
                leading-tight
              "
            >
              {profile.nama}
            </motion.h4>
          </div>

          {/* Info items with responsive spacing - now aligned */}
          <div className="space-y-1.5 sm:space-y-2 md:space-y-3 flex-grow">
            {/* Institution */}
            {profile.asalInstitusi && (
              <MotionDiv
                variants={infoItemVariants}
                className="flex items-start text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`
                    mr-2 
                    sm:mr-3 
                    ${colors.icon} 
                    flex-shrink-0 
                    transform 
                    transition-transform 
                    group-hover:scale-110
                    duration-300
                    mt-0.5
                  `}
                >
                  <FiMapPin size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <span
                  className="
                  line-clamp-2 
                  group-hover:font-medium 
                  transition-all 
                  duration-300
                  leading-relaxed
                "
                >
                  {profile.asalInstitusi}
                </span>
              </MotionDiv>
            )}

            {/* Program Study */}
            {profile.prodi && (
              <MotionDiv
                variants={infoItemVariants}
                className="flex items-start text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`
                    mr-2 
                    sm:mr-3 
                    ${colors.icon} 
                    flex-shrink-0 
                    transform 
                    transition-transform 
                    group-hover:scale-110
                    duration-300
                    mt-0.5
                  `}
                >
                  <FiBookOpen size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <span
                  className="
                  group-hover:font-medium 
                  transition-all 
                  duration-300
                  leading-relaxed
                  line-clamp-2
                "
                >
                  {getProgramName(profile.prodi)}
                </span>
              </MotionDiv>
            )}

            {/* Year/Batch */}
            {profile.angkatan && (
              <MotionDiv
                variants={infoItemVariants}
                className="flex items-center text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`
                    mr-2 
                    sm:mr-3 
                    ${colors.icon} 
                    flex-shrink-0 
                    transform 
                    transition-transform 
                    group-hover:scale-110
                    duration-300
                  `}
                >
                  <FiCalendar size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <span
                  className="
                  group-hover:font-medium 
                  transition-all 
                  duration-300
                  whitespace-nowrap
                "
                >
                  Angkatan {profile.angkatan}
                </span>
              </MotionDiv>
            )}

            {/* Unit */}
            {profile.unit && (
              <MotionDiv
                variants={infoItemVariants}
                className="flex items-start text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 group"
              >
                <div
                  className={`
                    mr-2 
                    sm:mr-3 
                    ${colors.icon} 
                    flex-shrink-0 
                    transform 
                    transition-transform 
                    group-hover:scale-110
                    duration-300
                    mt-0.5
                  `}
                >
                  <FiBriefcase size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <span
                  className="
                  line-clamp-2 
                  group-hover:font-medium 
                  transition-all 
                  duration-300
                  leading-relaxed
                "
                >
                  Unit: {profile.unit}
                </span>
              </MotionDiv>
            )}
          </div>
        </MotionDiv>
      </div>

      {/* Subtle glow overlay effect - disabled on mobile for performance */}
      <MotionDiv
        className="
          absolute 
          inset-0 
          pointer-events-none 
          rounded-lg 
          sm:rounded-xl 
          lg:rounded-2xl 
          opacity-0
          hidden 
          sm:block
        "
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 15px ${colors.glow}`,
          background: `radial-gradient(circle at 50% 50%, ${colors.glow} 0%, transparent 70%)`,
        }}
      />
    </MotionDiv>
  );
};

export default ProfileCard;
