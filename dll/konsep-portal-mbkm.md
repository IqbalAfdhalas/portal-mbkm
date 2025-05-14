# Konsep Portal MBKM BAST ANRI (Revisi)

## 1. Konsep Umum Website

### Jenis Aplikasi
Single Page Application (SPA) dengan halaman detail terpisah untuk beberapa section

### Fitur Utama
- **Smooth Scrolling**: Navigasi antar section dalam satu halaman
- **Navbar Scrollspy**: Status aktif berubah sesuai section yang sedang dilihat
- **Halaman Detail**: Konten lengkap untuk beberapa section tertentu
- **Glass Morphism Navbar**: Navbar transparan yang berubah saat di-scroll
- **Responsive Design**: Optimasi untuk desktop dan mobile (desktop-first approach)
- **Dark/Light Mode**: Toggle untuk preferensi user
- **User Authentication**: Sistem login/register dengan Firebase

## 2. Struktur Website

### Menu Navigasi (Urutan)
1. Home
2. Tentang MBKM
3. Program
4. Statistik
5. Direktori
6. Galeri 
7. Forum
8. FAQ
9. Kontak
10. Login/User Dropdown (pojok kanan navbar)

### Section dalam Halaman Utama
Semua menu di atas akan menjadi section dalam halaman utama, dengan konten preview/ringkasan.

### Halaman Detail Terpisah
- **Tentang MBKM**: Detail lengkap visi misi, struktur program, timeline
- **Direktori Mahasiswa**: Detail profil dengan fitur search & filter
- **Forum**: Halaman interaksi forum diskusi
- **Detail Project/Kegiatan**: Halaman khusus untuk setiap project
- **Login/Register**: Halaman autentikasi user
- **User Profile**: Halaman profil dan pengaturan user
- **Admin Dashboard**: Halaman khusus untuk role admin

## 3. Desain & Interaksi

### Navbar Design
- **Initial State**: Transparan dengan ukuran logo/text normal
- **Scrolled State**: Background semi-transparan dengan blur effect
- **Animation**: Logo mengecil 10-15% saat di-scroll
- **Active Indicator**: Garis atau dot yang bergerak sesuai section aktif
- **Sticky**: Selalu terlihat di bagian atas layar
- **Auth Area**: Tombol login atau user dropdown di pojok kanan

### Implementasi Navbar dengan Login/Dropdown User
- **Desain UI**:
  - Konsistensi visual dengan tema keseluruhan
  - Avatar user bulat untuk personalisasi
  - Transisi smooth saat dropdown muncul/hilang (fade/slide)
  
- **Fitur Dropdown User**:
  - Profil ringkas: nama, email, foto kecil di bagian atas dropdown
  - Menu navigasi cepat: link ke profil, pengaturan, aktivitas terbaru
  - Admin panel: hanya muncul untuk user dengan hak admin
  - Logout: dengan konfirmasi ringan untuk mencegah logout tidak sengaja
  
- **State Management**:
  - Context API: untuk status autentikasi
  - Local Storage/Cookies: simpan token untuk persistensi sesi
  - Auto-refresh token: perpanjang sesi jika user masih aktif
  
- **UX Improvements**:
  - Loading state: indikator saat proses login/logout
  - Toast notifications: notifikasi sukses/error yang tidak mengganggu
  - Remember me: opsi untuk tetap login di perangkat yang sama
  - Redirect logic: arahkan kembali ke halaman terakhir setelah login

### Desain Halaman Login
- **Layout & Struktur**:
  - Split screen design: form di kiri, ilustrasi/branding di kanan
  - Centered card: form dalam card dengan shadow ringan dan sudut membulat
  - Responsive: full width di mobile, centered di desktop
  - White space: jarak yang cukup antar elemen untuk keterbacaan
  
- **Elemen Form**:
  - Input yang bersih: label floating atau placeholder yang menghilang saat diketik
  - Validasi real-time: feedback langsung untuk format email/password yang tidak valid
  - Show/Hide password: toggle untuk menampilkan/menyembunyikan password
  - Remember me: checkbox dengan label jelas
  - CTA button: tombol login yang mencolok dengan warna primer (biru `#087E8B`)
  
- **Fitur Authentication**:
  - Login dengan email: sistem dengan email dan password
  - Pemulihan password: link "Lupa Password" yang menonjol
  - Switch ke register: tab atau link untuk beralih ke form registrasi
  
- **UX & Microcopy**:
  - Pesan error jelas: teks bantuan spesifik ketika login gagal
  - Loading state: animasi pada tombol login saat proses berlangsung
  - Welcome back: sapaan personal untuk kesan ramah
  - Privacy notice: teks ringkas tentang kebijakan privasi/keamanan
  
- **Branding Elements**:
  - Logo MBKM: di bagian atas form atau area ilustrasi
  - Color scheme: gradasi biru (`#0B3954` to `#087E8B`) sesuai brand
  - Ilustrasi tematik: gambar yang mencerminkan tema arsip/pendidikan

### Interaksi Section
- **Tombol "Selengkapnya"**: Mengarah ke halaman detail
- **Navbar di Halaman Detail**: Link kembali ke section terkait di halaman utama
- **Section Transitions**: Subtle animations saat scrolling (fade in/slide up)
- **Microinteractions**: Hover states yang menarik pada cards dan tombol

## 4. Tech Stack & Dependencies

### Core Technologies
- **Next.js** (v14.0.0): Framework React dengan SSR & routing
- **TypeScript** (v5.0.0+): Type safety & better development experience
- **Tailwind CSS** (v3.3.0+): Utility-first CSS framework
- **Firebase** (v10.0.0+): Backend services

### Firebase Services
- **Authentication**: Untuk login forum dan area member
- **Firestore**: Database untuk direktori, forum, dan projects
- **Storage**: Penyimpanan media (foto, dokumen)
- **Hosting**: Deployment website
- **Analytics**: User behavior tracking

### Additional Libraries
- **Framer Motion** (v10.16.0+): Untuk animasi smooth
- **React Intersection Observer** (v9.5.0+): Implementasi scrollspy
- **React Hook Form** (v7.46.0+): Form handling & validation
- **Next-themes** (v0.2.1+): Dark/light mode toggle
- **Firebase React Hooks** (v5.1.0+): Hooks untuk integrasi Firebase
- **React-icons** (v4.11.0+): Library icon komprehensif

## 5. Color Scheme & Typography

### Primary Colors
- Biru Tua: `#0B3954` (Header, navigasi, footer)
- Biru Muda: `#087E8B` (Button utama, highlight)
- Gradasi Biru: `linear-gradient(135deg, #0B3954, #087E8B)`

### Secondary Colors
- Orange: `#FF5A5F` (Call to Action, notification)
- Orange Light: `#FF8A8F` (Hover state CTA)

### Neutral Colors
- Abu Gelap: `#333333` (Teks utama)
- Abu Medium: `#666666` (Teks sekunder)
- Abu Terang: `#999999` (Placeholder, disabled)
- Abu Sangat Terang: `#F2F2F2` (Background sections)
- Putih: `#FFFFFF` (Background utama)

### Dark Mode Colors
- Dark Primary: `#164B69` (Highlight elements)
- Dark Background: `#121212` (Main background)
- Dark Surface: `#2D3748` (Cards, containers)
- Dark Text: `#E2E8F0` (Primary text)

### Typography
- **Headings**: Poppins
  - H1: 32px, weight: 700
  - H2: 24px, weight: 600
  - H3: 20px, weight: 600
  - H4: 18px, weight: 600
- **Body**: Nunito
  - Body: 16px, weight: 400
  - Small: 14px, weight: 400
  - Caption: 12px, weight: 400

## 6. Struktur Folder Project

```
portal-mbkm/
├── .next/                  # Next.js build output
├── public/                 # Static assets
│   ├── fonts/              # Custom fonts
│   ├── images/             # Static images
│   └── favicon.ico         # Favicon
├── src/
│   ├── app/                # App router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page (SPA)
│   │   ├── tentang/[slug]/page.tsx   # Detail pages
│   │   ├── direktori/page.tsx        # Direktori page
│   │   ├── forum/page.tsx            # Forum page
│   │   ├── auth/                     # Auth pages
│   │   │   ├── login/page.tsx        # Login page
│   │   │   ├── register/page.tsx     # Register page
│   │   │   └── forgot-password/page.tsx # Forgot password
│   │   ├── profile/                  # User profile
│   │   │   ├── page.tsx              # Profile main page
│   │   │   └── settings/page.tsx     # User settings
│   │   ├── admin/                    # Admin area
│   │   │   ├── page.tsx              # Admin dashboard
│   │   │   └── [section]/page.tsx    # Admin sections
│   │   └── ...
│   ├── components/         # Reusable components
│   │   ├── layout/         # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── UserDropdown.tsx      # User dropdown component
│   │   │   └── ...
│   │   ├── sections/       # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Stats.tsx
│   │   │   └── ...
│   │   ├── ui/             # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx            # User avatar component
│   │   │   ├── LoginForm.tsx         # Login form component
│   │   │   ├── RegisterForm.tsx      # Register form component
│   │   │   └── ...
│   │   └── shared/         # Shared components
│   ├── hooks/              # Custom hooks
│   │   ├── useScrollspy.ts
│   │   ├── useFirebase.ts
│   │   ├── useAuth.ts              # Auth hooks
│   │   └── ...
│   ├── lib/                # Utilities
│   │   ├── firebase.ts     # Firebase config
│   │   ├── utils.ts        # Helper functions
│   │   ├── auth.ts         # Auth utilities
│   │   └── ...
│   ├── types/              # TypeScript types
│   │   ├── index.ts
│   │   ├── firebase.ts
│   │   ├── user.ts         # User type definitions
│   │   └── ...
│   ├── styles/             # Global styles
│   │   └── globals.css     # Tailwind imports
│   ├── context/            # React context
│   │   ├── AuthContext.tsx # Authentication context
│   │   └── ...
│   └── constants/          # Constants and configs
│       ├── navigation.ts
│       ├── theme.ts
│       ├── roles.ts        # User roles definitions
│       └── ...
├── firebase/               # Firebase functions (optional)
├── .gitignore
├── .env.local              # Environment variables
├── next.config.js          # Next.js config
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind config
├── tsconfig.json           # TypeScript config
└── README.md
```

## 7. Implementasi Komponen Utama

### Navbar Implementation

```tsx
// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScrollspy } from '@/hooks/useScrollspy';
import { navigation } from '@/constants/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import UserDropdown from '@/components/layout/UserDropdown';
import LoginButton from '@/components/ui/LoginButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollspy(
    navigation.map(item => item.id),
    { threshold: 0.5 }
  );
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.img
            src="/images/logo.svg"
            alt="MBKM BAST ANRI"
            className="h-auto"
            animate={{ 
              width: scrolled ? 120 : 150
            }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={`text-sm font-medium transition-colors relative ${
                activeSection === item.id
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Component Here */}
          {!loading && (
            <>
              {user ? (
                <UserDropdown user={user} />
              ) : (
                <LoginButton />
              )}
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden">
          {/* Mobile menu implementation */}
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
```

### Auth Context Implementation

```typescript
// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Check if user is admin (example implementation)
      if (currentUser) {
        const idTokenResult = await currentUser.getIdTokenResult();
        setIsAdmin(!!idTokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, remember?: boolean) => {
    try {
      // Set persistence if needed
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login berhasil!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Gagal masuk. Silakan coba lagi.');
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      toast.success('Registrasi berhasil!');
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.message || 'Registrasi gagal. Silakan coba lagi.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout berhasil!');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Gagal logout. Silakan coba lagi.');
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email reset password telah dikirim!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Gagal mengirim email reset. Silakan coba lagi.');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      resetPassword,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 8. Firebase Configuration

```typescript
// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize analytics only on client-side
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, db, auth, storage, analytics };

// Helper function to set authentication persistence
export const setAuthPersistence = async (remember: boolean) => {
  const persistenceType = remember ? browserLocalPersistence : browserSessionPersistence;
  return setPersistence(auth, persistenceType);
};
```

## 9. Setup & Installation

### Instalasi Project

```bash
# Buat project Next.js dengan TypeScript
npx create-next-app@14.0.0 portal-mbkm --typescript

# Masuk ke direktori project
cd portal-mbkm

# Install dependencies utama
npm install tailwindcss@3.3.0 postcss@8.4.31 autoprefixer@10.4.16 framer-motion@10.16.0 firebase@10.5.0 react-intersection-observer@9.5.0 react-hook-form@7.46.0 next-themes@0.2.1 react-icons@4.11.0 react-hot-toast

# Setup Tailwind CSS
npx tailwindcss init -p

# Tambahkan file .env.local dengan konfigurasi Firebase
```

### Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B3954',
          light: '#087E8B',
        },
        secondary: {
          DEFAULT: '#FF5A5F',
          light: '#FF8A8F',
        },
        dark: {
          DEFAULT: '#121212',
          surface: '#2D3748',
          primary: '#164B69',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## 10. Next Steps & Rekomendasi

### Rekomendasi Pengembangan
1. Mulai dengan setup dasar Next.js dan Tailwind CSS
2. Implementasikan styling global dan tema (light/dark)
3. Bangun komponen Navbar dan Footer
4. Setup Firebase dan Auth Context
5. Implementasikan halaman Login/Register
6. Develop section utama homepage satu per satu
7. Integrasikan Firebase untuk backend services
8. Buat halaman detail terpisah
9. Implementasikan responsiveness untuk semua device
10. Bangun sistem role-based access untuk Admin

### Performa & Optimasi
- Gunakan Next.js Image component untuk lazy loading
- Implementasikan code splitting untuk performa yang lebih baik
- Optimalkan assets (compress images, minimize CSS/JS)
- Terapkan SSG (Static Site Generation) untuk halaman statis
- Gunakan ISR (Incremental Static Regeneration) untuk halaman dengan konten dinamis