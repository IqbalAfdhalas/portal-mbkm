// src/components/sections/Contact.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulasi pengiriman data
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Handle form submission ke Firebase atau API lainnya
      console.log('Form data:', data);

      toast.success('Pesan berhasil dikirim!');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Hubungi Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Ada Pertanyaan?
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Silakan hubungi kami untuk informasi lebih lanjut tentang program MBKM BAST ANRI atau
            pertanyaan lainnya.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-primary p-8 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-6">Informasi Kontak</h3>

                  <div className="space-y-6 mt-8">
                    <div className="flex items-start space-x-4">
                      <svg
                        className="w-6 h-6 text-blue-300 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium text-white">Alamat</h4>
                        <p className="text-blue-100 text-sm mt-1">
                          Jl. Tengku Hasan di Bakoi, Bakoy, Kec. Ingin Jaya, Kabupaten Aceh Besar, Aceh 23116
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <svg
                        className="w-6 h-6 text-blue-300 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium text-white">Telepon</h4>
                        <p className="text-blue-100 text-sm mt-1">(0651) 7551698</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <svg
                        className="w-6 h-6 text-blue-300 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium text-white">Email</h4>
                        <p className="text-blue-100 text-sm mt-1">bast@anri.go.id</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-medium mb-4">Media Sosial</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.397 0-.79-.023-1.175-.069 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14 0-.21-.015-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.170 5.818c0-.366.247-.673.247-.673s.608-.172.99-.172c.404.008.825.145.997.414.275.394.132 1.118.132 1.118s.008 2.044-.497 2.526c0 0-.436-.464-.918.05-.517.552-.591 1.523-.6 2.084l1.84-.007c.742-.04 1.488 0 2.194.124.707.115 1.136.709 1.154 1.423.02.637-.561 1.708-2.205 1.748-1.88.04-2.938-.943-2.938-.943v3.53c0 .84-.68 1.525-1.525 1.525-.838 0-1.523-.684-1.523-1.523v-9.97a1.523 1.523 0 013.046 0v.022c.533-.608 1.21-.972 1.906-.972.465 0 .94.12 1.34.358a2.56 2.56 0 011.152 1.102c.214.445.178.806.178 1.423v5.375c0 .878-.712 1.588-1.588 1.588-.877 0-1.587-.71-1.587-1.588V10.01c0-.052-.415-.79-1.22-.756-.79.032-1.162.45-1.18.82-.008.472-.008.894-.008 1.202l4.103-.008" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 p-8">
                <h3 className="text-2xl font-heading font-semibold text-primary dark:text-white mb-6">
                  Kirim Pesan
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white`}
                        placeholder="Nama lengkap anda"
                        {...register('name', { required: 'Nama harus diisi' })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white`}
                        placeholder="email@example.com"
                        {...register('email', {
                          required: 'Email harus diisi',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Format email tidak valid',
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subjek
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white`}
                      placeholder="Subjek pesan"
                      {...register('subject', { required: 'Subjek harus diisi' })}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white resize-none`}
                      placeholder="Tulis pesan anda disini..."
                      {...register('message', { required: 'Pesan harus diisi' })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary hover:bg-primary-light text-white font-medium transition-colors duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Mengirim...
                        </>
                      ) : (
                        'Kirim Pesan'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
