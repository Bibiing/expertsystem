export const testSuite = [
  // --- GROUP 1: BUAH ---
  {
    id: 'T-01',
    name: 'Patek (Antraknosa)',
    input: [
      { symptom_id: 'S003', certainty: 0.9 },
      { symptom_id: 'S001', certainty: 0.6 },
    ],
  },
  {
    id: 'T-02',
    name: 'Lalat Buah (Bactrocera)',
    input: [
      { symptom_id: 'S024', certainty: 1.0 },
      { symptom_id: 'S023', certainty: 0.8 },
    ],
  },
  {
    id: 'T-03',
    name: 'Lalat Buah (Bactrocera)',
    input: [
      { symptom_id: 'S024', certainty: 0.9 },
      { symptom_id: 'S003', certainty: 0.8 },
      { symptom_id: 'S001', certainty: 0.7 },
    ],
  },
  {
    id: 'T-04',
    name: 'Busuk Phytophthora',
    input: [
      { symptom_id: 'S008', certainty: 0.9 },
      { symptom_id: 'S009', certainty: 0.6 },
    ],
  },
  {
    id: 'T-05',
    name: 'Ulat Grayak (Spodoptera)',
    input: [
      { symptom_id: 'S021', certainty: 1.0 },
      { symptom_id: 'S022', certainty: 0.7 },
    ],
  },

  // --- GROUP 2: DAUN ---
  {
    id: 'T-06',
    name: 'Bercak Daun (Cercospora)',
    input: [
      { symptom_id: 'S005', certainty: 0.9 },
      { symptom_id: 'S004', certainty: 0.5 },
    ],
  },
  {
    id: 'T-07',
    name: 'Busuk Pucuk (Choanephora)',
    input: [
      { symptom_id: 'S013', certainty: 0.9 },
      { symptom_id: 'S006', certainty: 0.4 },
    ],
  },
  {
    id: 'T-08',
    name: 'Virus Mosaik (CMV/TMV)',
    input: [
      { symptom_id: 'S025', certainty: 0.8 },
      { symptom_id: 'S012', certainty: 0.5 },
    ],
  },
  {
    id: 'T-09',
    name: 'Virus Kuning (Gemini/Bule)',
    input: [
      { symptom_id: 'S030', certainty: 1.0 },
      { symptom_id: 'S031', certainty: 0.6 },
    ],
  },
  {
    id: 'T-10',
    name: 'Virus Kuning (Gemini/Bule)',
    input: [
      { symptom_id: 'S030', certainty: 0.6 },
      { symptom_id: 'S025', certainty: 0.6 },
    ],
  },

  // --- GROUP 3: KERITING (HAMA) ---
  {
    id: 'T-11',
    name: 'Hama Tungau (Mites)',
    input: [
      { symptom_id: 'S016', certainty: 0.9 },
      { symptom_id: 'S018', certainty: 0.7 },
    ],
  },
  {
    id: 'T-12',
    name: 'Hama Thrips',
    input: [
      { symptom_id: 'S019', certainty: 0.9 },
      { symptom_id: 'S028', certainty: 0.7 },
    ],
  },
  {
    id: 'T-13',
    name: 'Hama Thrips',
    input: [
      { symptom_id: 'S016', certainty: 0.5 },
      { symptom_id: 'S019', certainty: 0.5 },
      { symptom_id: 'S028', certainty: 0.8 },
    ],
  },
  {
    id: 'T-14',
    name: 'Kutu Daun (Aphids)',
    input: [
      { symptom_id: 'S015', certainty: 0.9 },
      { symptom_id: 'S016', certainty: 0.3 },
    ],
  },

  // --- GROUP 4: LAYU & AKAR ---
  {
    id: 'T-15',
    name: 'Layu Fusarium (Jamur)',
    input: [
      { symptom_id: 'S007', certainty: 0.8 },
      { symptom_id: 'S004', certainty: 0.4 },
    ],
  },
  {
    id: 'T-16',
    name: 'Layu Fusarium (Jamur)',
    input: [
      { symptom_id: 'S011', certainty: 0.8 },
      { symptom_id: 'S033', certainty: 1.0 },
    ],
  },
  {
    id: 'T-17',
    name: 'Layu Bakteri (Ralstonia)',
    input: [
      { symptom_id: 'S011', certainty: 0.8 },
      { symptom_id: 'S032', certainty: 1.0 },
    ],
  },
  {
    id: 'T-18',
    name: 'Nematoda (Akar Bengkak)',
    input: [
      { symptom_id: 'S012', certainty: 0.6 },
      { symptom_id: 'S010', certainty: 1.0 },
    ],
  },
  {
    id: 'T-19',
    name: 'Layu Fusarium (Jamur)',
    input: [{ symptom_id: 'S011', certainty: 0.8 }],
  },

  // --- GROUP 5: EDGE CASES (Hasil Diagnosa Tetap/Dominan) ---
  {
    id: 'T-20',
    name: 'Keyakinan Rendah',
    input: [{ symptom_id: 'S003', certainty: 0.2 }],
  },
  {
    id: 'T-21',
    name: 'Ulat Grayak (Spodoptera)',
    input: [
      { symptom_id: 'S021', certainty: 0.8 },
      { symptom_id: 'S030', certainty: 0.8 },
    ],
  },
  {
    id: 'T-22',
    name: 'Panik (Banyak Gejala Rendah)',
    input: [
      { symptom_id: 'S001', certainty: 0.5 },
      { symptom_id: 'S005', certainty: 0.5 },
      { symptom_id: 'S011', certainty: 0.5 },
      { symptom_id: 'S016', certainty: 0.5 },
    ],
  },
  {
    id: 'T-23',
    name: 'Gejala Umum (Kerdil Only)',
    input: [{ symptom_id: 'S012', certainty: 0.8 }],
  },
  {
    id: 'T-24',
    name: 'Busuk Phytophthora',
    input: [
      { symptom_id: 'S006', certainty: 0.9 },
      { symptom_id: 'S008', certainty: 0.9 },
      { symptom_id: 'S009', certainty: 0.9 },
      { symptom_id: 'S023', certainty: 0.9 },
    ],
  },
  {
    id: 'T-25',
    name: 'Negative Evidence (Bukan Nematoda)',
    input: [
      { symptom_id: 'S010', certainty: 0.0 },
      { symptom_id: 'S012', certainty: 0.8 },
    ],
  },
];
