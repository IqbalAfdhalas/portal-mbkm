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
