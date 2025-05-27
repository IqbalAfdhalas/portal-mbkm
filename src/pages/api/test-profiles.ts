// pages/api/test-profiles.ts
import { NextApiRequest, NextApiResponse } from 'next';
import {
  testFirebaseConnection,
  getAllProfiles,
  createProfile,
  migrateDummyData,
} from '../../lib/firebaseProfiles';

// Import dummy data untuk migration
import { profileData } from '../../data/kenali-kami/profileData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action } = req.query;

  try {
    // 1. Test Firebase Connection
    if (action === 'test') {
      const isConnected = await testFirebaseConnection();
      return res.json({
        success: true,
        connected: isConnected,
        message: isConnected ? '✅ Firebase terhubung!' : '❌ Firebase gagal terhubung!',
      });
    }

    // 2. Migrate Dummy Data
    if (action === 'migrate') {
      // Convert ProfileType to ProfileInput format dan remove undefined values
      const convertedData = profileData.map(profile => {
        const cleanProfile: any = {
          nama: profile.nama,
          peran: profile.peran,
          foto: profile.foto,
        };

        // Hanya tambahkan field yang tidak undefined
        if (profile.asalInstitusi !== undefined) cleanProfile.asalInstitusi = profile.asalInstitusi;
        if (profile.prodi !== undefined) cleanProfile.prodi = profile.prodi;
        if (profile.angkatan !== undefined) cleanProfile.angkatan = profile.angkatan;
        if (profile.unit !== undefined) cleanProfile.unit = profile.unit;

        return cleanProfile;
      });

      // Debug: log data sebelum dikirim
      console.log('Data yang akan di-migrate:', JSON.stringify(convertedData, null, 2));

      await migrateDummyData(convertedData);
      return res.json({
        success: true,
        message: '✅ Data dummy berhasil di-upload ke Firebase!',
        count: convertedData.length,
        data: convertedData,
      });
    }

    // 3. Get All Profiles
    if (action === 'get') {
      const profiles = await getAllProfiles();
      return res.json({
        success: true,
        message: `✅ Berhasil ambil ${profiles.length} profiles`,
        data: profiles,
      });
    }

    // 4. Create Test Profile
    if (action === 'create') {
      const testProfile = {
        nama: 'Test User ' + new Date().getTime(),
        peran: 'Mahasiswa' as const,
        asalInstitusi: 'Universitas Test',
        prodi: 'Manajemen Informatika' as const,
        angkatan: '2024' as const,
      };

      const newId = await createProfile(testProfile);
      return res.json({
        success: true,
        message: '✅ Test profile berhasil dibuat!',
        id: newId,
        data: testProfile,
      });
    }

    return res.json({
      success: false,
      message: 'Gunakan parameter: ?action=test | migrate | get | create',
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: '❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'),
    });
  }
}
