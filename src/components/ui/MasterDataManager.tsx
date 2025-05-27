// src/components/ui/MasterDataManager.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Settings, X, Loader2, Trash2, Check, AlertTriangle } from 'lucide-react';
import {
  createAngkatan,
  createProdi,
  createUnit,
  deleteAngkatan,
  deleteProdi,
  deleteUnit,
  checkAngkatanExists,
  checkProdiExists,
  checkUnitExists,
  getAllAngkatan,
  getAllProdi,
  getAllUnit,
  Angkatan,
  Prodi,
  Unit,
  MasterData,
} from '@/lib/firebaseProfiles';

interface MasterDataManagerProps {
  type: 'angkatan' | 'prodi' | 'unit';
  label: string;
  masterData?: MasterData;
  onDataUpdate?: () => void;
}

interface AddItemModalProps {
  type: 'angkatan' | 'prodi' | 'unit';
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ManageItemsModalProps {
  type: 'angkatan' | 'prodi' | 'unit';
  items: Angkatan[] | Prodi[] | Unit[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Add Item Modal Component
const AddItemModal: React.FC<AddItemModalProps> = ({ type, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    fakultas: '',
    deskripsi: '',
    tahun: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getTitle = () => {
    switch (type) {
      case 'angkatan':
        return 'Tambah Angkatan Baru';
      case 'prodi':
        return 'Tambah Program Studi Baru';
      case 'unit':
        return 'Tambah Unit Kerja Baru';
    }
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      kode: '',
      fakultas: '',
      deskripsi: '',
      tahun: '',
    });
    setError('');
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      if (type === 'angkatan') {
        if (!formData.tahun.trim()) {
          throw new Error('Tahun angkatan wajib diisi');
        }

        const exists = await checkAngkatanExists(formData.tahun.trim());
        if (exists) {
          throw new Error(`Angkatan ${formData.tahun} sudah ada`);
        }

        await createAngkatan(formData.tahun.trim());
      } else if (type === 'prodi') {
        if (!formData.nama.trim()) {
          throw new Error('Nama program studi wajib diisi');
        }

        const exists = await checkProdiExists(formData.nama.trim());
        if (exists) {
          throw new Error(`Program studi "${formData.nama}" sudah ada`);
        }

        await createProdi(formData.nama.trim(), formData.kode.trim(), formData.fakultas.trim());
      } else if (type === 'unit') {
        if (!formData.nama.trim()) {
          throw new Error('Nama unit kerja wajib diisi');
        }

        const exists = await checkUnitExists(formData.nama.trim());
        if (exists) {
          throw new Error(`Unit kerja "${formData.nama}" sudah ada`);
        }

        await createUnit(formData.nama.trim(), formData.kode.trim(), formData.deskripsi.trim());
      }

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error instanceof Error ? error.message : 'Gagal menambah data');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{getTitle()}</h3>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'angkatan' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tahun Angkatan *
              </label>
              <input
                type="text"
                value={formData.tahun}
                onChange={e => setFormData(prev => ({ ...prev, tahun: e.target.value }))}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                placeholder="Contoh: 2024"
              />
            </div>
          )}

          {(type === 'prodi' || type === 'unit') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {type === 'prodi' ? 'Nama Program Studi' : 'Nama Unit Kerja'} *
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={e => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  placeholder={
                    type === 'prodi' ? 'Contoh: Teknik Informatika' : 'Contoh: Bidang IT'
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kode (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.kode}
                  onChange={e => setFormData(prev => ({ ...prev, kode: e.target.value }))}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  placeholder={type === 'prodi' ? 'Contoh: TI' : 'Contoh: BIT'}
                />
              </div>

              {type === 'prodi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fakultas (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.fakultas}
                    onChange={e => setFormData(prev => ({ ...prev, fakultas: e.target.value }))}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    placeholder="Contoh: Fakultas Teknik"
                  />
                </div>
              )}

              {type === 'unit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi (Opsional)
                  </label>
                  <textarea
                    value={formData.deskripsi}
                    onChange={e => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                    disabled={loading}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 resize-none"
                    placeholder="Deskripsi singkat tentang unit kerja"
                  />
                </div>
              )}
            </>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Items Modal Component
const ManageItemsModal: React.FC<ManageItemsModalProps> = ({
  type,
  items,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [deletingItem, setDeletingItem] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  const getTitle = () => {
    switch (type) {
      case 'angkatan':
        return 'Kelola Angkatan';
      case 'prodi':
        return 'Kelola Program Studi';
      case 'unit':
        return 'Kelola Unit Kerja';
    }
  };

  const getItemDisplay = (item: Angkatan | Prodi | Unit) => {
    if (type === 'angkatan') {
      return (item as Angkatan).tahun;
    } else {
      return (item as Prodi | Unit).nama;
    }
  };

  const handleDelete = async (item: Angkatan | Prodi | Unit) => {
    if (loading || deletingItem) return;

    const itemId = item.id;
    const displayName = getItemDisplay(item);

    setLoading(true);
    setDeletingItem(itemId);

    try {
      if (type === 'angkatan') {
        await deleteAngkatan(itemId);
      } else if (type === 'prodi') {
        await deleteProdi(itemId);
      } else if (type === 'unit') {
        await deleteUnit(itemId);
      }

      onSuccess();
      setShowConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      // You might want to show an error message here
    } finally {
      setLoading(false);
      setDeletingItem(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{getTitle()}</h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Belum ada data {type}
            </div>
          ) : (
            <div className="space-y-2">
              {items.map(item => {
                const itemId = item.id;
                const displayName = getItemDisplay(item);

                return (
                  <div
                    key={itemId}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <span className="text-gray-800 dark:text-white font-medium">
                        {displayName}
                      </span>
                      {type !== 'angkatan' && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {type === 'prodi' && (
                            <>
                              {(item as Prodi).kode && `Kode: ${(item as Prodi).kode}`}
                              {(item as Prodi).fakultas && ` • ${(item as Prodi).fakultas}`}
                            </>
                          )}
                          {type === 'unit' && (
                            <>
                              {(item as Unit).kode && `Kode: ${(item as Unit).kode}`}
                              {(item as Unit).deskripsi && (
                                <div className="mt-1 text-xs">{(item as Unit).deskripsi}</div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {showConfirmDelete === itemId ? (
                        <>
                          <button
                            onClick={() => setShowConfirmDelete(null)}
                            disabled={loading}
                            className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            disabled={loading || deletingItem === itemId}
                            className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                          >
                            {deletingItem === itemId ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Hapus
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3 h-3" />
                                Yakin?
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setShowConfirmDelete(itemId)}
                          disabled={loading}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Master Data Manager Component
const MasterDataManager: React.FC<MasterDataManagerProps> = ({
  type,
  label,
  masterData,
  onDataUpdate,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [items, setItems] = useState<Angkatan[] | Prodi[] | Unit[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from database
  const fetchData = async () => {
    setLoading(true);
    try {
      let data: Angkatan[] | Prodi[] | Unit[];

      switch (type) {
        case 'angkatan':
          data = await getAllAngkatan();
          break;
        case 'prodi':
          data = await getAllProdi();
          break;
        case 'unit':
          data = await getAllUnit();
          break;
        default:
          data = [];
      }

      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [type]);

  const handleSuccess = () => {
    fetchData(); // Refresh data from database
    // Call the parent's onDataUpdate if provided
    if (onDataUpdate) {
      onDataUpdate();
    }
  };

  const getItemCount = () => {
    // If masterData is provided, use it for counting
    if (masterData) {
      switch (type) {
        case 'angkatan':
          return masterData.angkatanList.length;
        case 'prodi':
          return masterData.prodiList.length;
        case 'unit':
          return masterData.unitList.length;
        default:
          return 0;
      }
    }
    // Otherwise use local items
    return items.length;
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {label}: {loading ? '...' : `(${getItemCount()})`}
        </span>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={loading}
          className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors disabled:opacity-50"
          title={`Tambah ${label}`}
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowManageModal(true)}
          disabled={loading}
          className="p-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
          title={`Kelola ${label}`}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Add Modal */}
      <AddItemModal
        type={type}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />

      {/* Manage Modal */}
      <ManageItemsModal
        type={type}
        items={items}
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default MasterDataManager;
