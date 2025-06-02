/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBookOpen, FiCalendar, FiBriefcase } from 'react-icons/fi';
import type { ProfileType } from '@/data/kenali-kami/profileData';
import { MotionDiv } from '@/components/common/MotionClientOnly';

interface ProfileListItemProps {
  profile: ProfileType;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({ profile }) => {
  // Define card color based on role
  const getCardColor = () => {
    switch (profile.peran) {
      case 'Pembimbing Kampus':
        return 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 border-l-blue-400';
      case 'Mentor BAST ANRI':
        return 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 border-l-green-400';
      case 'Mahasiswa':
        return 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 border-l-purple-400';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border-l-gray-400';
    }
  };

  // Define badge color based on role
  const getBadgeColor = () => {
    switch (profile.peran) {
      case 'Pembimbing Kampus':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Mentor BAST ANRI':
        return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
      case 'Mahasiswa':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300';
    }
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
      case 'Sejarah':
        return 'Sejarah';
      case 'Bahasa Inggris':
        return 'Bahasa Inggris';
      case 'Tehnik Mesin':
        return 'Tehnik Mesin';
      case 'Biologi':
        return 'Biologi';
      default:
        return code;
    }
  };

  // Motion variants for hover effect
  const listItemVariants = {
    hover: {
      x: 5,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <MotionDiv
      whileHover="hover"
      variants={listItemVariants}
      className={`
        rounded-lg sm:rounded-xl overflow-hidden 
        shadow-md hover:shadow-lg transition-all duration-300
        bg-gradient-to-r ${getCardColor()} 
        border-l-2 sm:border-l-4 
        w-full
      `}
    >
      <div className="flex items-start sm:items-center p-2 xs:p-3 sm:p-4 md:p-5 lg:p-4 xl:p-5">
        {/* Profile Image - Responsive sizing */}
        <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 mr-2 xs:mr-3 sm:mr-4 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50 dark:ring-gray-700/50">
          <img
            src={profile.foto || '/api/placeholder/300/300'}
            alt={profile.nama}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4">
            {/* Name and Role Section */}
            <div className="min-w-0 flex-shrink">
              <h4
                className="
                text-sm xs:text-base sm:text-lg md:text-xl lg:text-lg xl:text-base
                font-semibold font-heading text-gray-800 dark:text-white 
                line-clamp-1 sm:line-clamp-2 mb-1 sm:mb-2
              "
              >
                {profile.nama}
              </h4>
              <span
                className={`
                  text-[10px] xs:text-xs sm:text-sm 
                  font-medium px-1.5 xs:px-2 py-0.5 sm:py-1 
                  rounded-full inline-block 
                  ${getBadgeColor()}
                  whitespace-nowrap
                `}
              >
                {profile.peran}
              </span>
            </div>

            {/* Additional Profile Info - Responsive layout */}
            <div className="flex flex-col xs:flex-row xs:flex-wrap lg:flex-col xl:flex-row gap-1 xs:gap-2 sm:gap-3 lg:gap-1 xl:gap-2 mt-1 sm:mt-2 lg:mt-0 lg:flex-shrink-0">
              {profile.asalInstitusi && (
                <div className="flex items-center text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-sm text-gray-600 dark:text-gray-300 group">
                  <FiMapPin
                    className="mr-1 text-primary-light flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    size={12}
                  />
                  <span className="line-clamp-1 group-hover:font-medium transition-all duration-200 leading-tight">
                    {profile.asalInstitusi}
                  </span>
                </div>
              )}

              {profile.prodi && (
                <div className="flex items-center text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-sm text-gray-600 dark:text-gray-300 group">
                  <FiBookOpen
                    className="mr-1 text-primary-light flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    size={12}
                  />
                  <span className="group-hover:font-medium transition-all duration-200 line-clamp-1">
                    {getProgramName(profile.prodi)}
                  </span>
                </div>
              )}

              {profile.angkatan && (
                <div className="flex items-center text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-sm text-gray-600 dark:text-gray-300 group">
                  <FiCalendar
                    className="mr-1 text-primary-light flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    size={12}
                  />
                  <span className="group-hover:font-medium transition-all duration-200 whitespace-nowrap">
                    Angkatan {profile.angkatan}
                  </span>
                </div>
              )}

              {profile.unit && (
                <div className="flex items-center text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-sm text-gray-600 dark:text-gray-300 group">
                  <FiBriefcase
                    className="mr-1 text-primary-light flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    size={12}
                  />
                  <span className="line-clamp-1 group-hover:font-medium transition-all duration-200 leading-tight">
                    Unit: {profile.unit}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ProfileListItem;
