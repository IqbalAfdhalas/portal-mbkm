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

  // Define accent color for decorative elements
  const getAccentColor = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500/20 dark:bg-blue-400/30';
      case 'green':
        return 'bg-green-500/20 dark:bg-green-400/30';
      case 'orange':
        return 'bg-orange-500/20 dark:bg-orange-400/30';
      case 'purple':
        return 'bg-purple-500/20 dark:bg-purple-400/30';
      default:
        return 'bg-gray-500/20 dark:bg-gray-400/30';
    }
  };

  // Define hover glow color
  const getHoverGlow = () => {
    switch (color) {
      case 'blue':
        return 'rgba(59, 130, 246, 0.3)';
      case 'green':
        return 'rgba(34, 197, 94, 0.3)';
      case 'orange':
        return 'rgba(249, 115, 22, 0.3)';
      case 'purple':
        return 'rgba(168, 85, 247, 0.3)';
      default:
        return 'rgba(107, 114, 128, 0.3)';
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

  // Define the appropriate icon component with responsive sizing
  const IconComponent = () => {
    const iconClasses = `
      w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7
      ${getIconColor()} transition-all duration-300
    `;

    switch (icon) {
      case 'users':
        return <FiUsers className={iconClasses} />;
      case 'calendar':
        return <FiCalendar className={iconClasses} />;
      case 'clipboard':
        return <FiClipboard className={iconClasses} />;
      case 'building':
        return <FiHome className={iconClasses} />;
      case 'book':
        return <FiBookOpen className={iconClasses} />;
      default:
        return <FiUsers className={iconClasses} />;
    }
  };

  // Animation variants with responsive considerations
  const cardVariants = {
    initial: {
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    hover: {
      y: -8,
      boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px 0px ${getHoverGlow()}`,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const iconContainerVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const decorativeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <MotionDiv
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      className={`
        w-full h-full min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[160px]
        rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-xl
        p-2 xs:p-3 sm:p-4 md:p-6 lg:p-4 xl:p-5
        backdrop-blur-sm bg-gradient-to-br ${getBgColor()} 
        border ${getBorderColor()} 
        transition-all duration-300
        flex flex-col justify-between
        relative overflow-hidden
      `}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large decorative circle - moved further away from icon */}
        <MotionDiv
          variants={decorativeVariants}
          initial="initial"
          animate="animate"
          className={`
            absolute -top-12 -right-12 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
            rounded-full ${getAccentColor()} opacity-20
          `}
        />

        {/* Small decorative circles */}
        <MotionDiv
          variants={decorativeVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '0.7s' }}
          className={`
            absolute -bottom-4 -left-4 w-8 h-8 sm:w-10 sm:h-10
            rounded-full ${getAccentColor()} opacity-20
          `}
        />

        {/* Decorative dots pattern */}
        <div className="absolute bottom-2 right-2 flex space-x-1 opacity-20">
          <div className={`w-1 h-1 rounded-full ${getAccentColor()}`} />
          <div className={`w-1 h-1 rounded-full ${getAccentColor()}`} />
          <div className={`w-1 h-1 rounded-full ${getAccentColor()}`} />
        </div>
      </div>

      {/* Header section with title and icon */}
      <div className="flex items-start justify-between mb-2 xs:mb-3 sm:mb-4 relative z-20">
        <div className="flex-1 min-w-0 mr-2">
          <h4
            className="
            text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-sm xl:text-sm
            font-medium text-gray-600 dark:text-gray-300 
            line-clamp-2 leading-tight
          "
          >
            {title}
          </h4>
        </div>

        <MotionDiv
          variants={iconContainerVariants}
          className={`
            rounded-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 lg:p-2.5 xl:p-3
            bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
            ${getBorderColor()} border-2 shadow-lg
            flex-shrink-0 relative z-20
          `}
        >
          <IconComponent />
        </MotionDiv>
      </div>

      {/* Value section with enhanced styling */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-baseline space-x-1"
        >
          <p
            className="
            text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl
            font-bold text-gray-800 dark:text-white
            leading-none
          "
          >
            {value.toLocaleString()}
          </p>
          <span
            className={`
            text-sm xs:text-base sm:text-lg md:text-xl lg:text-lg
            font-semibold ${getIconColor()}
          `}
          >
            +
          </span>
        </motion.div>

        {/* Subtle accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60%' }}
          transition={{ duration: 1, delay: 0.8 }}
          className={`
            h-0.5 mt-2 rounded-full ${getAccentColor()}
          `}
        />
      </div>
    </MotionDiv>
  );
};

export default StatisticsCard;
