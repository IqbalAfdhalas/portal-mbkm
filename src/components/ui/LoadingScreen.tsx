// src/components/ui/LoadingScreen.tsx
import { motion } from 'framer-motion';
import { MotionDiv } from '@/components/common/MotionClientOnly';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-dark-DEFAULT">
      <div className="flex flex-col items-center space-y-6">
        <MotionDiv
          className="relative h-16 w-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute h-full w-full rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute h-full w-full rounded-full border-t-4 border-primary-light"></div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Memuat...</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Mohon tunggu sebentar</p>
        </MotionDiv>
      </div>
    </div>
  );
};

export default LoadingScreen;
