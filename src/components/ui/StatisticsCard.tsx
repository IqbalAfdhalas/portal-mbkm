import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiClipboard, FiBookOpen, FiHome } from 'react-icons/fi';
import { MotionDiv } from '@/components/common/MotionClientOnly';

interface StatisticsCardProps {
  title: string;
  value: number;
  icon: 'users' | 'calendar' | 'clipboard' | 'building' | 'book' | 'briefcase';
  color: 'blue' | 'green' | 'orange' | 'purple';
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, icon, color }) => {
  // Define background color based on provided color
  const getBgColor = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-500/10 to-blue-600/20 dark:from-blue-500/20 dark:to-blue-600/30';
      case 'green':
        return 'from-green-500/10 to-green-600/20 dark:from-green-500/20 dark:to-green-600/30';
      case 'orange':
        return 'from-orange-500/10 to-orange-600/20 dark:from-orange-500/20 dark:to-orange-600/30';
      case 'purple':
        return 'from-purple-500/10 to-purple-600/20 dark:from-purple-500/20 dark:to-purple-600/30';
      default:
        return 'from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800';
    }
  };

  // Define icon color based on provided color
  const getIconColor = () => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 dark:text-blue-400';
      case 'green':
        return 'text-green-600 dark:text-green-400';
      case 'orange':
        return 'text-orange-600 dark:text-orange-400';
      case 'purple':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Define border color based on provided color
  const getBorderColor = () => {
    switch (color) {
      case 'blue':
        return 'border-blue-500/30 dark:border-blue-500/40';
      case 'green':
        return 'border-green-500/30 dark:border-green-500/40';
      case 'orange':
        return 'border-orange-500/30 dark:border-orange-500/40';
      case 'purple':
        return 'border-purple-500/30 dark:border-purple-500/40';
      default:
        return 'border-gray-300 dark:border-gray-700';
    }
  };

  // Define the appropriate icon component
  const IconComponent = () => {
    switch (icon) {
      case 'users':
        return <FiUsers className={`text-2xl ${getIconColor()}`} />;
      case 'calendar':
        return <FiCalendar className={`text-2xl ${getIconColor()}`} />;
      case 'clipboard':
        return <FiClipboard className={`text-2xl ${getIconColor()}`} />;
      case 'building':
        return <FiHome className={`text-2xl ${getIconColor()}`} />;
      default:
        return <FiUsers className={`text-2xl ${getIconColor()}`} />;
    }
  };

  // Animation variants
  const cardVariants = {
    hover: {
      y: -5,
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
      variants={cardVariants}
      className={`
        rounded-xl p-5 backdrop-blur-sm 
        bg-gradient-to-br ${getBgColor()} 
        border ${getBorderColor()} 
        shadow-md hover:shadow-lg transition-all
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{title}</h4>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}+</p>
        </div>
        <div
          className={`rounded-full p-3 bg-white/30 dark:bg-gray-800/30 ${getBorderColor()} border`}
        >
          <IconComponent />
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <MotionDiv
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value * 100) / 200, 100)}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r 
            ${color === 'blue' && 'from-blue-400 to-blue-600'} 
            ${color === 'green' && 'from-green-400 to-green-600'} 
            ${color === 'orange' && 'from-orange-400 to-orange-600'} 
            ${color === 'purple' && 'from-purple-400 to-purple-600'}
          `}
        />
      </div>
    </MotionDiv>
  );
};

export default StatisticsCard;
