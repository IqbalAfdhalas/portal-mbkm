// src/lib/utils.ts
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine and merge Tailwind CSS classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format ISO date string to human-readable format
 * @param dateString ISO date string
 * @param options Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: {
    locale?: string;
    format?: 'short' | 'medium' | 'long';
  } = {}
): string {
  const date = new Date(dateString);
  const { locale = 'id-ID', format = 'medium' } = options;

  if (isNaN(date.getTime())) {
    return 'Tanggal tidak valid';
  }

  try {
    switch (format) {
      case 'short':
        return date.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      case 'long':
        return date.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      case 'medium':
      default:
        return date.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    // Fallback formatting
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return date.toLocaleDateString('id-ID', options);
  }
}

/**
 * Scroll ke elemen dengan ID tertentu dengan offset
 * @param id ID elemen yang akan di-scroll
 * @param offset Offset tambahan (default: -80px)
 */
export const scrollToId = (id: string, offset: number = -80) => {
  const el = document.getElementById(id);
  if (!el) return;

  // Temukan tinggi navbar untuk offset yang tepat
  const navbar = document.querySelector('header');
  const navbarHeight = navbar ? navbar.clientHeight : 80;

  // Hitung posisi scroll dengan mempertimbangkan tinggi navbar
  const y = el.getBoundingClientRect().top + window.pageYOffset + offset;

  // Scroll dengan smooth behavior
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });

  // Tambahkan highlight ke menu aktif secara manual jika perlu
  setTimeout(() => {
    // Update URL hash tanpa menyebabkan scroll tambahan
    if (history.pushState) {
      history.pushState(null, '', `#${id}`);
    } else {
      // Fallback untuk browser lama
      window.location.hash = id;
    }

    // Dispatch custom event untuk memberi tahu komponen lain
    // bahwa scroll selesai dan section telah dipilih
    const event = new CustomEvent('sectionSelected', { detail: { id } });
    document.dispatchEvent(event);
  }, 500); // Tunggu scroll selesai sebelum mengupdate URL
};
