import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBookOpen, FiCalendar, FiBriefcase } from 'react-icons/fi';
import type { ProfileType } from '@/constants/profileData';
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
      className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-gradient-to-r ${getCardColor()} border-l-4`}
    >
      <div className="flex items-center p-4">
        {/* Profile Image */}
        <div className="w-16 h-16 mr-4 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={profile.foto || '/api/placeholder/300/300'}
            alt={profile.nama}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h4 className="text-lg font-semibold font-heading text-gray-800 dark:text-white line-clamp-1">
                {profile.nama}
              </h4>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 ${getBadgeColor()}`}
              >
                {profile.peran}
              </span>
            </div>

            {/* Additional Profile Info */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 md:mt-0">
              {profile.asalInstitusi && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiMapPin className="mr-1 text-primary-light flex-shrink-0" />
                  <span className="line-clamp-1">{profile.asalInstitusi}</span>
                </div>
              )}

              {profile.prodi && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiBookOpen className="mr-1 text-primary-light flex-shrink-0" />
                  <span>
                    {profile.prodi === 'ManajemenInformatika' && 'Manajemen Informatika'}
                    {profile.prodi === 'IlmuKomunikasi' && 'Ilmu Komunikasi'}
                    {profile.prodi === 'Sejarah' && 'Sejarah'}
                    {profile.prodi === 'BahasaInggris' && 'Bahasa Inggris'}
                    {profile.prodi === 'TehnikMesin' && 'Tehnik Mesin'}
                  </span>
                </div>
              )}

              {profile.angkatan && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiCalendar className="mr-1 text-primary-light flex-shrink-0" />
                  <span>Angkatan {profile.angkatan}</span>
                </div>
              )}

              {profile.unit && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiBriefcase className="mr-1 text-primary-light flex-shrink-0" />
                  <span className="line-clamp-1">Unit: {profile.unit}</span>
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
