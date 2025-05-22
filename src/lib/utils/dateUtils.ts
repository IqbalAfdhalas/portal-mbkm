// lib/utils/dateUtils.ts

/**
 * Format date to Indonesian locale string
 */
export const formatDateToIndonesian = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta',
  };

  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

/**
 * Format date with time to Indonesian locale string
 */
export const formatDateTimeToIndonesian = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  };

  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

/**
 * Format date for form input (YYYY-MM-DD)
 */
export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Format datetime for form input (YYYY-MM-DDTHH:mm)
 */
export const formatDateTimeForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Get relative time string (e.g., "2 hari yang lalu")
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Baru saja';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun yang lalu`;
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 */
export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Check if date is in current week
 */
export const isThisWeek = (date: Date): boolean => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};

/**
 * Check if date is in current month
 */
export const isThisMonth = (date: Date): boolean => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

/**
 * Get start of day
 */
export const getStartOfDay = (date: Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get end of day
 */
export const getEndOfDay = (date: Date): Date => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
};

/**
 * Get start of week (Sunday)
 */
export const getStartOfWeek = (date: Date): Date => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get end of week (Saturday)
 */
export const getEndOfWeek = (date: Date): Date => {
  const end = new Date(date);
  end.setDate(date.getDate() + (6 - date.getDay()));
  end.setHours(23, 59, 59, 999);
  return end;
};

/**
 * Get start of month
 */
export const getStartOfMonth = (date: Date): Date => {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get end of month
 */
export const getEndOfMonth = (date: Date): Date => {
  const end = new Date(date);
  end.setMonth(date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return end;
};

/**
 * Add days to date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add weeks to date
 */
export const addWeeks = (date: Date, weeks: number): Date => {
  return addDays(date, weeks * 7);
};

/**
 * Add months to date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add years to date
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Get difference in days between two dates
 */
export const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
};

/**
 * Get Indonesian day name
 */
export const getIndonesianDayName = (date: Date): string => {
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return dayNames[date.getDay()];
};

/**
 * Get Indonesian month name
 */
export const getIndonesianMonthName = (date: Date): string => {
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return monthNames[date.getMonth()];
};

/**
 * Parse date string to Date object
 */
export const parseDate = (dateString: string): Date | null => {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
};

/**
 * Validate if string is a valid date
 */
export const isValidDate = (dateString: string): boolean => {
  return parseDate(dateString) !== null;
};

/**
 * Format date range
 */
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const start = formatDateToIndonesian(startDate);
  const end = formatDateToIndonesian(endDate);

  if (start === end) {
    return start;
  }

  return `${start} - ${end}`;
};

/**
 * Get time ago string
 */
export const getTimeAgo = (date: Date): string => {
  if (isToday(date)) {
    return 'Hari ini';
  }

  if (isYesterday(date)) {
    return 'Kemarin';
  }

  return getRelativeTime(date);
};

/**
 * Format time only (HH:mm)
 */
export const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Format time with seconds (HH:mm:ss)
 */
export const formatTimeWithSeconds = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Convert timezone
 */
export const convertToTimezone = (date: Date, timezone: string): Date => {
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
};

/**
 * Get current date in Jakarta timezone
 */
export const getCurrentDateJakarta = (): Date => {
  return convertToTimezone(new Date(), 'Asia/Jakarta');
};
