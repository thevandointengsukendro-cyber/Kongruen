import { Mission } from '../types';

export const MISSIONS_DATA: Mission[] = [
  {
    id: 1,
    caseNumber: 'KASUS 01',
    title: 'Dua Segitiga Identik',
    subtitle: 'Misteri Fragmen Artefak Laboratorium',
    dossier:
      'Di ruang forensik laboratorium, asisten menemukan dua pecahan pelat logam segitiga misterius (Segitiga ABC dan Segitiga DEF). Detektif diminta menyelidiki apakah kedua pelat ini berasal dari cetakan yang sama persis atau bukan.',
    suspectsDesc:
      'Pecahan A (ΔABC) memiliki sisi: AB = 3 cm, BC = 4 cm, AC = 5 cm.\nPecahan B (ΔDEF) memiliki sisi: DE = 3 cm, EF = 4 cm, DF = 5 cm.',
    shapeA: {
      name: 'Segitiga ABC',
      sides: [3, 4, 5],
      angles: [36.9, 53.1, 90],
      labels: { s1: 'AB = 3 cm', s2: 'BC = 4 cm', s3: 'AC = 5 cm' },
      type: 'triangle',
    },
    shapeB: {
      name: 'Segitiga DEF',
      sides: [3, 4, 5],
      angles: [36.9, 53.1, 90],
      labels: { s1: 'DE = 3 cm', s2: 'EF = 4 cm', s3: 'DF = 5 cm' },
      type: 'triangle',
    },
    question: 'Apakah hubungan antara Segitiga ABC dan Segitiga DEF?',
    options: [
      { id: 'A', label: 'A', text: 'Kongruen' },
      { id: 'B', label: 'B', text: 'Sebangun tetapi tidak kongruen' },
      { id: 'C', label: 'C', text: 'Tidak kongruen dan tidak sebangun' },
    ],
    correctAnswer: 'A',
    hints: [
      'Bandingkan panjang sisi-sisi yang bersesuaian pada kedua segitiga.',
      'Jika ketiga pasang sisi bersesuaian sama panjang (AB = DE, BC = EF, AC = DF), kriteria apa yang berlaku?',
      'Ingat kriteria SSS (Sisi-Sisi-Sisi) pada segitiga.',
    ],
    explanation: {
      summary:
        'Ketiga pasang sisi yang bersesuaian sama panjang persis. Oleh karena itu, kedua segitiga terbukti kongruen berdasarkan kriteria SSS (Sisi - Sisi - Sisi).',
      steps: [
        {
          stepNumber: 1,
          title: 'Pemeriksaan Sisi Bersesuaian',
          content: 'AB = DE = 3 cm\nBC = EF = 4 cm\nAC = DF = 5 cm',
          mathHighlight: 'AB/DE = 3/3 = 1, BC/EF = 4/4 = 1, AC/DF = 5/5 = 1',
        },
        {
          stepNumber: 2,
          title: 'Pemeriksaan Faktor Skala (k)',
          content: 'Karena rasio perbandingan sisi k = 1 dan bentuknya sama persis, kedua bangun memiliki ukuran identik.',
          mathHighlight: 'k = 1',
        },
        {
          stepNumber: 3,
          title: 'Kaidah Postulat Segitiga',
          content: 'Berdasarkan postulat SSS (Side-Side-Side), jika tiga pasang sisi yang bersesuaian sama panjang, maka ΔABC ≅ ΔDEF.',
          mathHighlight: 'ΔABC ≅ ΔDEF (SSS)',
        },
      ],
      conclusion: 'Kedua segitiga adalah KONGRUEN (memiliki bentuk dan ukuran yang sama persis).',
      criterionBadge: 'Postulat SSS (Sisi - Sisi - Sisi)',
    },
  },
  {
    id: 2,
    caseNumber: 'KASUS 02',
    title: 'Segitiga Hasil Pembesaran',
    subtitle: 'Jejak Pembesaran Lensa Mikroskop',
    dossier:
      'Detektif memeriksa slide preparat di bawah mikroskop optik. Terdapat dua segitiga: Segitiga Pertama adalah objek mikroskopis asli, dan Segitiga Kedua adalah proyeksi bayangan yang diperbesar pada layar proyektor.',
    suspectsDesc:
      'Segitiga Pertama memiliki sisi: 3 cm, 4 cm, dan 5 cm.\nSegitiga Kedua memiliki sisi: 6 cm, 8 cm, dan 10 cm.',
    shapeA: {
      name: 'Segitiga Pertama (Asli)',
      sides: [3, 4, 5],
      angles: [36.9, 53.1, 90],
      labels: { s1: '3 cm', s2: '4 cm', s3: '5 cm' },
      type: 'triangle',
    },
    shapeB: {
      name: 'Segitiga Kedua (Proyeksi)',
      sides: [6, 8, 10],
      angles: [36.9, 53.1, 90],
      labels: { s1: '6 cm', s2: '8 cm', s3: '10 cm' },
      type: 'triangle',
    },
    question: 'Bagaimana hubungan antara kedua segitiga tersebut?',
    options: [
      { id: 'A', label: 'A', text: 'Kongruen' },
      { id: 'B', label: 'B', text: 'Sebangun tetapi tidak kongruen' },
      { id: 'C', label: 'C', text: 'Tidak kongruen dan tidak sebangun' },
    ],
    correctAnswer: 'B',
    hints: [
      'Hitung rasio perbandingan masing-masing sisi: 6/3, 8/4, dan 10/5.',
      'Perhatikan apakah nilai perbandingannya konstan atau berbeda.',
      'Karena ukurannya berbeda (panjang sisi tidak sama), apakah mereka bisa kongruen?',
    ],
    explanation: {
      summary:
        'Rasio perbandingan seluruh sisi bersesuaian konstan bernilai 2 (faktor skala k = 2). Kedua segitiga sebangun, tetapi tidak kongruen karena ukurannya berbeda.',
      steps: [
        {
          stepNumber: 1,
          title: 'Menghitung Perbandingan Sisi Bersesuaian',
          content: 'Bandingkan masing-masing sisi:\n• 6 cm / 3 cm = 2\n• 8 cm / 4 cm = 2\n• 10 cm / 5 cm = 2',
          mathHighlight: '6/3 = 8/4 = 10/5 = 2',
        },
        {
          stepNumber: 2,
          title: 'Analisis Faktor Skala (k)',
          content: 'Karena semua rasio sama yaitu k = 2, kedua segitiga memiliki proporsi yang sama persis (sudut-sudutnya tetap sama).',
          mathHighlight: 'k = 2 (k ≠ 1)',
        },
        {
          stepNumber: 3,
          title: 'Penentuan Kongruensi vs Kesebangunan',
          content: 'Syarat kongruen memerlukan k = 1 (ukuran sama persis). Karena k = 2 (ukuran berbeda), maka kedua bangun sebangun namun tidak kongruen.',
          mathHighlight: 'Bangun 1 ~ Bangun 2, tetapi Bangun 1 ≇ Bangun 2',
        },
      ],
      conclusion: 'Kedua segitiga adalah SEBANGUN TETAPI TIDAK KONGRUEN.',
      criterionBadge: 'Kriteria SSS Sebanding (k = 2)',
    },
  },
  {
    id: 3,
    caseNumber: 'KASUS 03',
    title: 'Pemeriksaan Sudut',
    subtitle: 'Analisis Sudut Kompas Navigasi',
    dossier:
      'Dua pelat penunjuk arah ditemukan pada brankas berkunci. Sensor teodolit detektif mendeteksi besar sudut dan panjang sisi dari kedua segitiga tersebut.',
    suspectsDesc:
      'Kedua segitiga memiliki sudut bersesuaian: 50°, 60°, dan 70°.\nKedua segitiga juga memiliki panjang sisi bersesuaian: 4 cm, 5 cm, dan 6 cm.',
    shapeA: {
      name: 'Segitiga Navigasi Alpha',
      sides: [4, 5, 6],
      angles: [50, 60, 70],
      labels: { s1: '4 cm', s2: '5 cm', s3: '6 cm' },
      type: 'triangle',
    },
    shapeB: {
      name: 'Segitiga Navigasi Beta',
      sides: [4, 5, 6],
      angles: [50, 60, 70],
      labels: { s1: '4 cm', s2: '5 cm', s3: '6 cm' },
      type: 'triangle',
    },
    question: 'Apakah kedua segitiga tersebut kongruen?',
    options: [
      { id: 'A', label: 'A', text: 'Kongruen' },
      { id: 'B', label: 'B', text: 'Sebangun tetapi tidak kongruen' },
      { id: 'C', label: 'C', text: 'Tidak kongruen dan tidak sebangun' },
    ],
    correctAnswer: 'A',
    hints: [
      'Amati besar sudut-sudut yang bersesuaian: 50° = 50°, 60° = 60°, 70° = 70°.',
      'Amati panjang sisi-sisi yang bersesuaian: 4 cm = 4 cm, 5 cm = 5 cm, 6 cm = 6 cm.',
      'Jika semua sudut sama besar DAN semua sisi sama panjang, kesimpulan apa yang didapat?',
    ],
    explanation: {
      summary:
        'Sisi-sisi dan sudut-sudut yang bersesuaian sama persis. Kedua segitiga memenuhi syarat utama kekongruenan.',
      steps: [
        {
          stepNumber: 1,
          title: 'Pemeriksaan Sudut Bersesuaian',
          content: 'Sudut bersesuaian sama besar: 50° = 50°, 60° = 60°, dan 70° = 70° (jumlah sudut = 180°).',
          mathHighlight: '∠A = ∠D = 50°, ∠B = ∠E = 60°, ∠C = ∠F = 70°',
        },
        {
          stepNumber: 2,
          title: 'Pemeriksaan Sisi Bersesuaian',
          content: 'Sisi-sisi yang bersesuaian sama panjang persis: 4 cm = 4 cm, 5 cm = 5 cm, dan 6 cm = 6 cm.',
          mathHighlight: 'Sisi 1 = 4 cm, Sisi 2 = 5 cm, Sisi 3 = 6 cm',
        },
        {
          stepNumber: 3,
          title: 'Penerapan Kaidah Kekongruenan',
          content: 'Karena bentuk dan ukuran sama persis (faktor skala k = 1), kedua bangun memenuhi kriteria kekongruenan (ASA / SAS / SSS).',
          mathHighlight: 'Δ1 ≅ Δ2',
        },
      ],
      conclusion: 'Kedua segitiga adalah KONGRUEN.',
      criterionBadge: 'Syarat Lengkap Kekongruenan (Sisi & Sudut Identik)',
    },
  },
  {
    id: 4,
    caseNumber: 'KASUS 04',
    title: 'Misteri Faktor Skala',
    subtitle: 'Rasio Perbandingan Denah Kriminal',
    dossier:
      'Detektif menyita dokumen denah lokasi rahasia. Ada dua gambar segitiga pembagi wilayah. Detektif perlu mengungkap rasio pembesaran (faktor skala k) dari segitiga pertama ke segitiga kedua untuk membuka koordinat GPS.',
    suspectsDesc:
      'Segitiga Pertama: 5 cm, 7 cm, dan 9 cm.\nSegitiga Kedua: 10 cm, 14 cm, dan 18 cm.',
    shapeA: {
      name: 'Segitiga Wilayah 1',
      sides: [5, 7, 9],
      angles: [33.6, 50.7, 95.7],
      labels: { s1: '5 cm', s2: '7 cm', s3: '9 cm' },
      type: 'triangle',
    },
    shapeB: {
      name: 'Segitiga Wilayah 2',
      sides: [10, 14, 18],
      angles: [33.6, 50.7, 95.7],
      labels: { s1: '10 cm', s2: '14 cm', s3: '18 cm' },
      type: 'triangle',
    },
    question: 'Tentukan faktor skala (k) dari segitiga pertama ke segitiga kedua!',
    options: [
      { id: 'A', label: 'A', text: 'k = 1' },
      { id: 'B', label: 'B', text: 'k = 2' },
      { id: 'C', label: 'C', text: 'k = 3' },
    ],
    correctAnswer: 'B',
    hints: [
      'Gunakan rumus faktor skala: k = (sisi bangun kedua) / (sisi bangun pertama).',
      'Coba bagi sisi pertama: 10 ÷ 5 = ?',
      'Periksa apakah 14 ÷ 7 dan 18 ÷ 9 memberikan hasil yang sama.',
    ],
    explanation: {
      summary:
        'Faktor skala diperoleh dengan membagi panjang sisi segitiga kedua dengan sisi segitiga pertama yang bersesuaian. Hasilnya adalah k = 2.',
      steps: [
        {
          stepNumber: 1,
          title: 'Rumus Faktor Skala',
          content: 'Faktor skala k didefinisikan sebagai perbandingan sisi bangun tujuan terhadap sisi bangun asal.',
          mathHighlight: 'k = sisi bangun kedua / sisi bangun pertama',
        },
        {
          stepNumber: 2,
          title: 'Substitusi Nilai Sisi',
          content: '• Sisi 1: 10 / 5 = 2\n• Sisi 2: 14 / 7 = 2\n• Sisi 3: 18 / 9 = 2',
          mathHighlight: 'k = 10/5 = 14/7 = 18/9 = 2',
        },
        {
          stepNumber: 3,
          title: 'Kesimpulan Penggandaan',
          content: 'Seluruh sisi pada segitiga kedua mengalami pembesaran tepat dua kali lipat dibanding segitiga pertama.',
          mathHighlight: 'k = 2',
        },
      ],
      conclusion: 'Faktor skala dari segitiga pertama ke segitiga kedua adalah 2 (Pilihan B).',
      criterionBadge: 'Perhitungan Faktor Skala (Dilation Factor k)',
    },
  },
  {
    id: 5,
    caseNumber: 'KASUS 05',
    title: 'Persegi yang Sebangun',
    subtitle: 'Ubin Keramik Brankas Tersembunyi',
    dossier:
      'Di lantai ruang penyimpanan barang bukti rahasia, detektif menemukan dua ubin keramik berbentuk persegi dengan ukuran berbeda. Pelat tombol kunci brankas menuntut penentuan hubungan geometris antara kedua persegi tersebut.',
    suspectsDesc:
      'Persegi A memiliki panjang sisi 4 cm.\nPersegi B memiliki panjang sisi 8 cm.',
    shapeA: {
      name: 'Persegi A',
      sides: [4, 4, 4, 4],
      angles: [90, 90, 90, 90],
      labels: { s1: 's = 4 cm' },
      type: 'square',
    },
    shapeB: {
      name: 'Persegi B',
      sides: [8, 8, 8, 8],
      angles: [90, 90, 90, 90],
      labels: { s1: 's = 8 cm' },
      type: 'square',
    },
    question: 'Bagaimana hubungan geometris antara Persegi A dan Persegi B?',
    options: [
      { id: 'A', label: 'A', text: 'Kongruen' },
      { id: 'B', label: 'B', text: 'Sebangun tetapi tidak kongruen' },
      { id: 'C', label: 'C', text: 'Tidak kongruen dan tidak sebangun' },
    ],
    correctAnswer: 'B',
    hints: [
      'Semua persegi selalu memiliki empat sudut siku-siku (90°). Apakah sudut-sudutnya sama besar?',
      'Bandingkan panjang sisinya: 8 cm dibanding 4 cm. Apakah perbandingan sisinya konstan?',
      'Karena panjang sisinya berbeda (4 cm ≠ 8 cm), apakah mereka kongruen?',
    ],
    explanation: {
      summary:
        'Semua sudut persegi sama besar yaitu 90°. Perbandingan sisi adalah 8/4 = 2 (konstan). Oleh karena itu, kedua persegi sebangun, tetapi tidak kongruen karena sisinya berbeda panjang.',
      steps: [
        {
          stepNumber: 1,
          title: 'Pemeriksaan Sudut',
          content: 'Setiap sudut pada Persegi A dan Persegi B adalah 90° (siku-siku), sehingga semua sudut yang bersesuaian sama besar.',
          mathHighlight: '∠A₁ = ∠B₁ = 90° untuk keempat sudut',
        },
        {
          stepNumber: 2,
          title: 'Pemeriksaan Perbandingan Sisi',
          content: 'Perbandingan sisi: 8 cm / 4 cm = 2 untuk semua empat pasang sisi.',
          mathHighlight: 'k = s_B / s_A = 8 / 4 = 2',
        },
        {
          stepNumber: 3,
          title: 'Kaidah Umum Persegi',
          content: 'Dua persegi APAPUN selalu sebangun karena sudutnya selalu 90° dan rasionya selalu seimbang. Mereka hanya kongruen jika sisinya sama panjang.',
          mathHighlight: 'Persegi A ~ Persegi B, namun Persegi A ≇ Persegi B',
        },
      ],
      conclusion: 'Kedua persegi adalah SEBANGUN TETAPI TIDAK KONGRUEN.',
      criterionBadge: 'Sifat Kesebangunan Persegi (Sudut 90° & k = 2)',
    },
  },
];
