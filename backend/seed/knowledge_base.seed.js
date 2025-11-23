import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import Disease from '../src/models/disease.model.js';
import Symptom from '../src/models/symptom.model.js';
import Rule from '../src/models/rule.model.js';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
   console.error('MONGODB_URI belum di-set. Jalankan dengan MONGODB_URI di environment.');
   process.exit(1);
}

async function main() {
   await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
   console.log('Connected to MongoDB');

   try {
      await Promise.all([
         Disease.deleteMany({}),
         Symptom.deleteMany({}),
         Rule.deleteMany({})
      ]);
      console.log('Cleared existing collections');

      const symptoms = [
         { _id: 'S001', name: 'Buah busuk basah', description: 'Buah menjadi lembek, basah, dan cepat melepuh/busuk.' },
         { _id: 'S002', name: 'Daun, ranting, dan cabang membusuk kering', description: 'Bagian vegetatif mengering, berwarna coklat kehitam-hitaman.' },
         { _id: 'S003', name: 'Bercak hitam pada buah & busuk lunak', description: 'Terdapat bercak gelap pada buah yang lalu menjadi area busuk lembek.' },
         { _id: 'S004', name: 'Daun menguning dini', description: 'Daun menguning lebih awal daripada umur normal tanaman.' },
         { _id: 'S005', name: 'Bercak abu-abu dengan pinggiran coklat', description: 'Bercak bundar abu-abu dengan halo coklat pada tepi.' },
         { _id: 'S006', name: 'Batang membusuk', description: 'Bagian batang mengalami pelunakan dan pembusukan.' },
         { _id: 'S007', name: 'Layu dimulai dari pucuk', description: 'Layu muncul dari pucuk, lalu menjalar ke bagian bawah tanaman.' },
         { _id: 'S008', name: 'Bercak basah berwarna hijau suram', description: 'Bercak kecil kebasahan pada buah atau batang berwarna hijau kusam.' },
         { _id: 'S009', name: 'Buah kering & mengeriput', description: 'Buah kehilangan turgor, mengerut dan mengering.' },
         { _id: 'S010', name: 'Kutil/kutil pada akar', description: 'Terbentuk tonjolan/kutil pada permukaan akar.' },
         { _id: 'S011', name: 'Tanaman layu dan mengering', description: 'Seluruh tanaman tampak layu dan akhirnya mengering.' },
         { _id: 'S012', name: 'Tanaman kerdil', description: 'Pertumbuhan terhambat, ukuran tanaman jauh lebih kecil.' },
         { _id: 'S013', name: 'Daun pucuk coklat dan membusuk', description: 'Ujung daun berubah warna menjadi coklat, lalu membusuk.' },
         { _id: 'S014', name: 'Batang mudah terkelupas', description: 'Permukaan kulit batang mudah mengelupas.' },
         { _id: 'S015', name: 'Daun menumpuk (tumpukan daun)', description: 'Pertumbuhan daun berlebihan sehingga tampak menumpuk.' },
         { _id: 'S016', name: 'Daun melengkung ke bawah & berkerut', description: 'Daun melengkung ke bawah disertai kerutan permukaan.' },
         { _id: 'S017', name: 'Daun hijau pekat & mengkilap', description: 'Daun berwarna hijau pekat dan tampak mengkilap/permukaan tidak rata.' },
         { _id: 'S018', name: 'Daun coklat tembaga & mengeriting', description: 'Warna daun menjadi tembaga/coklat dan daun mengeriting.' },
         { _id: 'S019', name: 'Daun keriput, mengeriting & melengkung ke atas', description: 'Daun tampak keriput, menggulung dan melengkung ke arah atas.' },
         { _id: 'S020', name: 'Pertumbuhan terhambat & pucuk mati', description: 'Tanaman kerdil dengan pucuk yang mati.' },
         { _id: 'S021', name: 'Lubang tidak beraturan pada buah', description: 'Buah memiliki lubang tak beraturan akibat ulat/serangga.' },
         { _id: 'S022', name: 'Tanaman gundul', description: 'Daun dan organ atas dimakan sehingga tanaman tampak botak.' },
         { _id: 'S023', name: 'Buah rontok', description: 'Buah mudah gugur sebelum matang.' },
         { _id: 'S024', name: 'Titik hitam di pangkal buah', description: 'Pangkal buah menunjukkan titik atau noda hitam kecil.' },
         { _id: 'S025', name: 'Daun keriput & kekuningan', description: 'Daun menjadi keriput dan berwarna kekuningan.' },
         { _id: 'S026', name: 'Tunas & bunga gugur', description: 'Tunas muda dan bunga mudah rontok/gugur.' },
         { _id: 'S027', name: 'Daun kaku & melengkung ke bawah', description: 'Daun terasa kaku dan melengkung ke arah bawah.' },
         { _id: 'S028', name: 'Permukaan bawah daun seperti tembaga', description: 'Permukaan bawah daun berwarna tembaga/berkilau tembaga.' },
         { _id: 'S029', name: 'Daun berbentuk abnormal', description: 'Perubahan bentuk daun yang tidak normal.' },
         { _id: 'S030', name: 'Daun menguning', description: 'Daun berubah warna menjadi kuning.' },
         { _id: 'S031', name: 'Daun mengeriting ke atas', description: 'Daun menggulung/mengeriting ke arah atas.' }
      ];

      await Symptom.insertMany(symptoms);
      console.log(`Inserted ${symptoms.length} symptoms`);

      const diseases = [
         {
            _id: 'D01',
            name: 'Antraknosa',
            description: 'Penyakit jamur yang sering menyerang buah dan bagian tanaman lain menyebabkan bercak hitam, busuk basah, dan kerusakan jaringan pada cabai.',
            treatment: 'Buang dan musnahkan bagian tanaman yang terinfeksi. Tingkatkan sirkulasi udara, hindari penyiraman malam hari. Gunakan fungisida berbahan aktif seperti mankozeb atau captan sesuai label / anjuran penyuluh pertanian.'
         },
         {
            _id: 'D02',
            name: 'Bercak Daun (Septoria/Serkospora)',
            description: 'Penyakit bercak daun yang menyebabkan daun menguning dini dan muncul bercak berwarna abu-abu dengan pinggiran coklat, mengurangi fotosintesis dan hasil tanaman.',
            treatment: 'Buang daun yang terinfeksi, jaga jarak tanam dan sanitasi lahan. Rotasi tanaman, dan gunakan fungisida spektral jika infestasi berat.'
         },
         {
            _id: 'D03',
            name: 'Layu Fusarium',
            description: 'Penyakit layu akibat jamur Fusarium oxysporum yang menyerang sistem vaskular, menyebabkan layu permanen bahkan tanaman mati.',
            treatment: 'Gunakan bibit tahan jika ada, rotasi dengan tanaman non inang, sanitasi pada alat dan media tanam. Pengendalian kimia sulit; perbaiki drainase dan kebersihan lahan.'
         },
         {
            _id: 'D04',
            name: 'Busuk Buah (Phytophthora)',
            description: 'Penyakit yang menyerang buah dan batang dengan bercak basah berwarna kusam, menyebabkan buah menjadi kering dan mengeriput saat fase lanjut.',
            treatment: 'Perbaiki drainase tanah, kurangi kelembaban tinggi, buang buah terinfeksi. Gunakan fungisida yang efektif terhadap Phytophthora bila diperlukan.'
         },
         {
            _id: 'D05',
            name: 'Bengkak Akar (Nematoda / Rhizomania-like)',
            description: 'Terbentuk kutil atau bengkak pada akar yang mengganggu penyerapan air dan nutrisi sehingga tanaman layu dan kerdil.',
            treatment: 'Rotasi tanaman, solarize media tanam, gunakan varietas tahan jika tersedia. Perbaiki kondisi tanah dan manajemen hama tanah.'
         },
         {
            _id: 'D06',
            name: 'Busuk Daun (Choanephora)',
            description: 'Infeksi jamur yang menyebabkan pucuk dan daun membusuk, sering pada kondisi kelembaban tinggi atau pada tanaman yang rapat.',
            treatment: 'Perbaiki sirkulasi udara, kurangi kelembaban daun, buang jaringan terinfeksi, dan gunakan fungisida bila perlu.'
         },
         {
            _id: 'D07',
            name: 'Kerupuk (ciri fisiologis / virus-like)',
            description: 'Gangguan fisiologis atau virus yang menyebabkan daun menumpuk, kerdil, dan perubahan morfologi daun seperti melengkung dan kerutan.',
            treatment: 'Perbaiki nutrisi, cek serangan virus/vektor, gunakan bibit sehat, dan kontrol vektor (mis. thrips, kutu) secara mekanis/kimiawi bila diperlukan.'
         },
         {
            _id: 'D08',
            name: 'Layu Bakteri',
            description: 'Penyakit bakteri yang menyebabkan layu cepat dimulai dari pucuk namun daun tetap hijau, diikuti pembusukan pada batang bawah dan akar.',
            treatment: 'Sanitasi alat, hindari penyiraman yang memudahkan penyebaran bakteri, buang tanaman terinfeksi, rotasi tanaman.'
         },
         {
            _id: 'D09',
            name: 'Virus Kuning',
            description: 'Penyakit virus yang menyebabkan daun menguning, pengeritingan, dan pertumbuhan tersendat; biasanya disebarkan oleh vektor seperti kutu daun.',
            treatment: 'Gunakan benih/bibit sehat, kontrol vektor (insektisida/biologi), buang tanaman parah, dan praktik sanitasi kebun.'
         },
         {
            _id: 'D10',
            name: 'Hama Tungau (Mite)',
            description: 'Serangan tungau menyebabkan gugurnya tunas & bunga, daun kaku dan melengkung, serta perubahan warna pada permukaan bawah daun (tembaga).',
            treatment: 'Semprot dengan acaricide yang sesuai atau gunakan agen biologis, kurangi debu dan temperatur tinggi, cek secara berkala untuk pengendalian dini.'
         },
         {
            _id: 'D11',
            name: 'Hama Thrips',
            description: 'Thrips menghisap jaringan daun/buah sehingga daun menjadi keriput, mengeriting, berwarna tembaga, dan pertumbuhan terhambat.',
            treatment: 'Traps (sticky yellow), kontrol vektor dengan insektisida sistemik/kontak sesuai label, serta menjaga kebersihan kebun.'
         },
         {
            _id: 'D12',
            name: 'Ulat Grayak',
            description: 'Serangan larva ulat memakan buah dan daun, meninggalkan lubang tidak beraturan dan tanaman menjadi gundul.',
            treatment: 'Pengumpulan manual, penggunaan perangkap, atau aplikasi insektisida berbasis Bacillus thuringiensis atau insektisida kimia bila diperlukan.'
         },
         {
            _id: 'D13',
            name: 'Hama Lalat Buah',
            description: 'Lalat buah menyebabkan kerusakan pada pangkal buah, timbul titik-titik hitam, dan buah dapat busuk atau rontok.',
            treatment: 'Menjaga sanitasi, perangkap feromon/larva, serta aplikasi insektisida sesuai aturan jika serangan berat.'
         },
         {
            _id: 'D14',
            name: 'Hama Kutu Daun (Aphid)',
            description: 'Kutu daun menyebabkan tanaman kerdil, daun keriput serta kekuningan; vektor potensial virus juga.',
            treatment: 'Semprot insektisida kontak atau sistemik, gunakan predator alami (ladybird), dan pastikan benih/bibit sehat.'
         }
      ];

      await Disease.insertMany(diseases);
      console.log(`Inserted ${diseases.length} diseases`);

      const rules = [
         // Antraknosa (D01)
         { disease_id: 'D01', symptom_id: 'S001', mb: 0.85, md: 0.1 },
         { disease_id: 'D01', symptom_id: 'S002', mb: 0.8, md: 0.05 },
         { disease_id: 'D01', symptom_id: 'S003', mb: 0.7, md: 0.1 },

         // Bercak Daun Serkospora (D02)
         { disease_id: 'D02', symptom_id: 'S004', mb: 0.7, md: 0.2 },
         { disease_id: 'D02', symptom_id: 'S005', mb: 0.9, md: 0.1 },

         // Layu Fusarium (D03)
         { disease_id: 'D03', symptom_id: 'S006', mb: 0.6, md: 0.1 },
         { disease_id: 'D03', symptom_id: 'S007', mb: 0.8, md: 0.1 },

         // Busuk Buah Phytophora (D04)
         { disease_id: 'D04', symptom_id: 'S008', mb: 0.7, md: 0.1 },
         { disease_id: 'D04', symptom_id: 'S009', mb: 0.8, md: 0.2 },

         // Bengkak Akar (D05)
         { disease_id: 'D05', symptom_id: 'S010', mb: 0.9, md: 0.15 },
         { disease_id: 'D05', symptom_id: 'S011', mb: 0.7, md: 0.1 },
         { disease_id: 'D05', symptom_id: 'S012', mb: 0.6, md: 0.2 },

         // Busuk Daun Choanephora (D06)
         { disease_id: 'D06', symptom_id: 'S013', mb: 0.8, md: 0.1 },
         { disease_id: 'D06', symptom_id: 'S006', mb: 0.6, md: 0.1 },
         { disease_id: 'D06', symptom_id: 'S014', mb: 0.65, md: 0.1 },

         // Kerupuk (D07)
         { disease_id: 'D07', symptom_id: 'S015', mb: 0.9, md: 0.1 },
         { disease_id: 'D07', symptom_id: 'S012', mb: 0.6, md: 0.2 },
         { disease_id: 'D07', symptom_id: 'S016', mb: 0.8, md: 0.1 },
         { disease_id: 'D07', symptom_id: 'S017', mb: 0.8, md: 0.05 },

         // Layu Bakteri (D08)
         { disease_id: 'D08', symptom_id: 'S007', mb: 0.8, md: 0.05 },
         { disease_id: 'D08', symptom_id: 'S014', mb: 0.7, md: 0.1 },

         // Virus Kuning (D09)
         { disease_id: 'D09', symptom_id: 'S030', mb: 0.9, md: 0.1 },
         { disease_id: 'D09', symptom_id: 'S031', mb: 0.8, md: 0.2 },

         // Hama Tungau (D10)
         { disease_id: 'D10', symptom_id: 'S026', mb: 0.8, md: 0.05 },
         { disease_id: 'D10', symptom_id: 'S027', mb: 0.9, md: 0.1 },
         { disease_id: 'D10', symptom_id: 'S028', mb: 0.75, md: 0.05 },
         { disease_id: 'D10', symptom_id: 'S029', mb: 0.85, md: 0.1 },

         // Hama Thrips (D11)
         { disease_id: 'D11', symptom_id: 'S018', mb: 0.6, md: 0.2 },
         { disease_id: 'D11', symptom_id: 'S019', mb: 0.9, md: 0.1 },
         { disease_id: 'D11', symptom_id: 'S020', mb: 0.6, md: 0.1 },

         // Ulat Grayak (D12)
         { disease_id: 'D12', symptom_id: 'S021', mb: 0.6, md: 0.1 },
         { disease_id: 'D12', symptom_id: 'S022', mb: 0.8, md: 0.15 },

         // Hama Lalat Buah (D13)
         { disease_id: 'D13', symptom_id: 'S023', mb: 0.7, md: 0.05 },
         { disease_id: 'D13', symptom_id: 'S024', mb: 0.9, md: 0.1 },
         { disease_id: 'D13', symptom_id: 'S001', mb: 0.85, md: 0.1 },

         // Hama Kutu Daun (D14)
         { disease_id: 'D14', symptom_id: 'S012', mb: 0.6, md: 0.2 },
         { disease_id: 'D14', symptom_id: 'S025', mb: 0.85, md: 0.1 }
      ];

      await Rule.insertMany(rules);
      console.log(`Inserted ${rules.length} rules`);

      console.log('Seeding selesai ✅');
   } catch (err) {
      console.error('Error saat seeding:', err);
   } finally {
      await mongoose.disconnect();
      console.log('Disconnected');
   }
}

main().catch(err => {
   console.error(err);
   process.exit(1);
});
