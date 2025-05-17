import { motion } from 'framer-motion';
import {
  FiUser,
  FiUsers,
  FiBookmark,
  FiCalendar,
  FiHome,
  FiMapPin,
  FiBookOpen,
  FiBriefcase,
} from 'react-icons/fi';

// Type for profile data
export interface ProfileData {
  id: number;
  nama: string;
  foto: string;
  peran: 'Mahasiswa' | 'Pembimbing Kampus' | 'Mentor BAST ANRI';
  prodi: 'MI' | 'IK' | 'Arsip' | 'Perpustakaan' | null;
  angkatan: '2022' | '2023' | '2024' | null;
  asalInstitusi: string | null;
  unit: string | null;
}

interface ProfileCardProps {
  profile: ProfileData;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  // Define card color based on role
  const getCardColor = () => {
    switch (profile.peran) {
      case 'Pembimbing Kampus':
        return 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30';
      case 'Mentor BAST ANRI':
        return 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30';
      case 'Mahasiswa':
        return 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50';
    }
  };

  // Define a motion variant for hover effect
  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      whileHover="hover"
      variants={cardVariants}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br ${getCardColor()}`}
    >
      <div className="flex flex-col h-full">
        {/* Profile Image */}
        <div className="relative pt-[100%] bg-gray-200 dark:bg-gray-700">
          <img
            src={profile.foto || '/api/placeholder/300/300'}
            alt={profile.nama}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-xs font-medium text-white bg-primary px-2 py-1 rounded-full">
              {profile.peran}
            </span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-5 flex flex-col flex-grow">
          <h4 className="text-xl font-semibold mb-2 font-heading text-gray-800 dark:text-white">
            {profile.nama}
          </h4>

          <div className="space-y-2 mt-2 flex-grow">
            {/* Conditional rendering based on role */}
            {profile.asalInstitusi && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FiMapPin className="mr-2 text-primary-light flex-shrink-0" />
                <span>{profile.asalInstitusi}</span>
              </div>
            )}

            {profile.prodi && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FiBookOpen className="mr-2 text-primary-light flex-shrink-0" />
                <span>
                  {profile.prodi === 'MI' && 'Manajemen Informatika'}
                  {profile.prodi === 'IK' && 'Ilmu Komunikasi'}
                  {profile.prodi === 'Arsip' && 'Arsip'}
                  {profile.prodi === 'Perpustakaan' && 'Perpustakaan'}
                </span>
              </div>
            )}

            {profile.angkatan && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FiCalendar className="mr-2 text-primary-light flex-shrink-0" />
                <span>Angkatan {profile.angkatan}</span>
              </div>
            )}

            {profile.unit && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FiBriefcase className="mr-2 text-primary-light flex-shrink-0" />
                <span>Unit: {profile.unit}</span>
              </div>
            )}
          </div>

          {/* Profile action buttons */}
          <div className="pt-4 mt-auto">
            <button className="w-full py-2 px-4 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors text-sm flex items-center justify-center">
              <FiUser className="mr-2" />
              Lihat Profil
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
