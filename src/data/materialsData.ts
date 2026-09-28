export interface CongruenceCriterion {
  id: string;
  code: string;
  name: string;
  fullName: string;
  description: string;
  details: string;
  example: string;
  conclusion: string;
  sidesInfo: string[];
  anglesInfo: string[];
}

export interface SimilarityCriterion {
  id: string;
  code: string;
  name: string;
  description: string;
  mathFormula: string;
  example: string;
}

export interface QuadrilateralProperty {
  name: string;
  description: string;
  alwaysSimilar: boolean;
  angleCondition: string;
  sideCondition: string;
  notes: string;
}

export interface RealLifeScenario {
  id: string;
  title: string;
  category: string;
  story: string;
  illustrationType: 'tree' | 'map' | 'photo' | 'tile' | 'pattern' | 'blueprint';
  concept: string;
  formula: string;
  interactiveQuestion: {
    questionText: string;
    inputs: { label: string; key: string; defaultValue: number; unit: string }[];
    calcAnswer: (vals: Record<string, number>) => number;
    explanationTemplate: (vals: Record<string, number>, ans: number) => string;
  };
}

export const CONGRUENCE_CRITERIA: CongruenceCriterion[] = [
  {
    id: 'sss',
    code: 'SSS',
    name: 'Sisi - Sisi - Sisi',
    fullName: 'Postulat Side - Side - Side',
    description: 'Ketiga pasang sisi yang bersesuaian sama panjang persis.',
    details: 'Jika sisi AB = DE, BC = EF, dan AC = DF, maka bentuk dan ukuran segitiga terkunci sepenuhnya sehingga kedua segitiga pasti kongruen.',
    example: 'ΔABC memiliki sisi 5 cm, 7 cm, dan 9 cm. ΔDEF memiliki sisi 5 cm, 7 cm, dan 9 cm. Maka ΔABC ≅ ΔDEF.',
    conclusion: 'Semua sisi bersesuaian sama (k = 1), bentuk terkunci secara rigid tanpa perlu mengukur sudutnya.',
    sidesInfo: ['AB = DE', 'BC = EF', 'AC = DF'],
    anglesInfo: ['Sudut otomatis bersesuaian sama (CPCTC)'],
  },
  {
    id: 'sas',
    code: 'SAS',
    name: 'Sisi - Sudut - Sisi',
    fullName: 'Postulat Side - Angle - Side',
    description: 'Dua pasang sisi bersesuaian sama panjang dan sudut APIT di antara kedua sisi tersebut sama besar.',
    details: 'Sudut apit adalah sudut yang dibentuk oleh dua sisi yang diketahui. Jika dua sisi dan sudut yang diapitnya sama, panjang sisi ketiga dan besar sudut lainnya otomatis terkunci.',
    example: 'AB = DE = 6 cm, ∠B = ∠E = 45°, BC = EF = 8 cm. Maka ΔABC ≅ ΔDEF.',
    conclusion: 'Sudut HARUS diapit oleh kedua sisi yang diketahui (included angle). Jika bukan sudut apit (SSA), belum tentu kongruen.',
    sidesInfo: ['AB = DE', 'BC = EF (Dua sisi menjepit)'],
    anglesInfo: ['∠B = ∠E (Sudut apit)'],
  },
  {
    id: 'asa',
    code: 'ASA',
    name: 'Sudut - Sisi - Sudut',
    fullName: 'Postulat Angle - Side - Angle',
    description: 'Dua pasang sudut bersesuaian sama besar dan sisi yang DIAPIT oleh kedua sudut tersebut sama panjang.',
    details: 'Sisi yang diapit adalah segmen garis yang menghubungkan titik sudut kedua sudut yang diketahui. Panjang sisi ini mengunci jarak antara dua arah garis sudut.',
    example: '∠A = ∠D = 60°, sisi AB = DE = 7 cm, dan ∠B = ∠E = 50°. Maka ΔABC ≅ ΔDEF.',
    conclusion: 'Sisi yang diketahui harus berada tepat di antara dua sudut tersebut.',
    sidesInfo: ['AB = DE (Sisi terapit)'],
    anglesInfo: ['∠A = ∠D', '∠B = ∠E'],
  },
  {
    id: 'aas',
    code: 'AAS',
    name: 'Sudut - Sudut - Sisi',
    fullName: 'Teorema Angle - Angle - Side',
    description: 'Dua pasang sudut bersesuaian sama besar dan satu pasang sisi yang TIDAK DIAPIT sama panjang.',
    details: 'Karena jumlah sudut segitiga selalu 180°, mengetahui dua pasang sudut sama besar secara otomatis membuat sudut ketiga sama besar (180° - ∠1 - ∠2), sehingga mereduksi ke kasus ASA.',
    example: '∠A = ∠D = 40°, ∠B = ∠E = 75°, dan sisi BC = EF = 6 cm (tidak diapit ∠A dan ∠B). Maka ΔABC ≅ ΔDEF.',
    conclusion: 'Kekongruenan terbukti karena sudut ketiga otomatis sama besar.',
    sidesInfo: ['BC = EF (Sisi berseberangan / tidak diapit)'],
    anglesInfo: ['∠A = ∠D', '∠B = ∠E'],
  },
  {
    id: 'rhs',
    code: 'RHS / HL',
    name: 'Hipotenusa - Sisi (Right-Hypotenuse-Side)',
    fullName: 'Teorema Khusus Segitiga Siku-siku (Hypotenuse-Leg)',
    description: 'Khusus segitiga siku-siku: hipotenusa (sisi miring) dan salah satu kaki segitiga bersesuaian sama panjang.',
    details: 'Berdasarkan Teorema Pythagoras (a² + b² = c²), jika hipotenusa (c) dan satu kaki (a) sama panjang, maka kaki lainnya (b = √(c² - a²)) pasti sama panjang, sehingga memenuhi kriteria SSS.',
    example: 'ΔABC dan ΔDEF memiliki sudut 90°. Hipotenusa AC = DF = 10 cm, kaki BC = EF = 6 cm. Maka kaki lainnya pasti 8 cm dan kedua segitiga kongruen.',
    conclusion: 'Hanya berlaku untuk segitiga siku-siku (terdapat sudut 90°).',
    sidesInfo: ['Hipotenusa c₁ = c₂', 'Kaki a₁ = a₂'],
    anglesInfo: ['Sudut siku-siku = 90°'],
  },
];

export const SIMILARITY_CRITERIA: SimilarityCriterion[] = [
  {
    id: 'aa',
    code: 'AA (Sudut - Sudut)',
    name: 'Dua Pasang Sudut Bersesuaian Sama Besar',
    description: 'Jika dua sudut dari suatu segitiga sama besar dengan dua sudut segitiga lainnya, maka sudut ketiga otomatis sama besar (jumlah = 180°), dan kedua segitiga pasti sebangun.',
    mathFormula: '∠A = ∠D, ∠B = ∠E ⟹ ΔABC ~ ΔDEF',
    example: 'Segitiga 1 bersudut 40° dan 60°. Segitiga 2 bersudut 40° dan 60°. Walaupun ukurannya beda, kedua segitiga pasti sebangun.',
  },
  {
    id: 'sss_prop',
    code: 'SSS Sebanding',
    name: 'Ketiga Pasang Sisi Bersesuaian Sebanding',
    description: 'Jika rasio panjang ketiga pasang sisi bersesuaian bernilai sama (faktor skala k konstan), maka kedua segitiga sebangun.',
    mathFormula: 'AB/DE = BC/EF = AC/DF = k ⟹ ΔABC ~ ΔDEF',
    example: 'Segitiga 1 (3, 4, 5 cm) dan Segitiga 2 (6, 8, 10 cm). Rasio = 6/3 = 8/4 = 10/5 = 2. Maka sebangun.',
  },
  {
    id: 'sas_prop',
    code: 'SAS Sebanding',
    name: 'Dua Pasang Sisi Sebanding & Sudut Apit Sama Besar',
    description: 'Jika perbandingan dua pasang sisi bersesuaian sama dan sudut yang diapit oleh kedua pasang sisi tersebut sama besar, maka kedua segitiga sebangun.',
    mathFormula: 'AB/DE = AC/DF = k  DAN  ∠A = ∠D ⟹ ΔABC ~ ΔDEF',
    example: 'Sisi 4 cm dan 6 cm menjepit sudut 50°. Segitiga lain sisi 8 cm dan 12 cm menjepit sudut 50°. Rasio = 2 dan sudut sama. Maka sebangun.',
  },
];

export const QUADRILATERAL_PROPERTIES: QuadrilateralProperty[] = [
  {
    name: 'Persegi',
    description: 'Semua sudut 90° dan keempat sisinya sama panjang.',
    alwaysSimilar: true,
    angleCondition: 'Semua sudut selalu 90° (pasti sama untuk setiap persegi).',
    sideCondition: 'Perbandingan sisi selalu sama di keempat sisi: s₂ / s₁ = k.',
    notes: 'Dua persegi APAPUN selalu sebangun!',
  },
  {
    name: 'Persegi Panjang',
    description: 'Semua sudut 90°, sisi yang berhadapan sama panjang.',
    alwaysSimilar: false,
    angleCondition: 'Semua sudut selalu 90° (sudut selalu terpenuhi).',
    sideCondition: 'Rasio panjang dan lebar HARUS sama: p₂/p₁ = l₂/l₁.',
    notes: 'TIDAK selalu sebangun! Misalnya ukuran 4×2 (rasio 2:1) tidak sebangun dengan ukuran 5×3 (rasio 1.67:1).',
  },
  {
    name: 'Jajargenjang',
    description: 'Sisi berhadapan sejajar dan sama panjang, sudut berhadapan sama.',
    alwaysSimilar: false,
    angleCondition: 'Sudut yang bersesuaian harus sama besar (misal 60° dan 120°).',
    sideCondition: 'Rasio kedua sisi berdekatan harus sama: a₂/a₁ = b₂/b₁.',
    notes: 'Harus memeriksa kesamaan sudut DAN kesebandingan sisi.',
  },
  {
    name: 'Belah Ketupat',
    description: 'Keempat sisinya sama panjang, sudut berhadapan sama.',
    alwaysSimilar: false,
    angleCondition: 'Sudut-sudut bersesuaian HARUS sama besar.',
    sideCondition: 'Perbandingan keempat sisi selalu seimbang (karena 4 sisinya sama).',
    notes: 'TIDAK selalu sebangun! Belah ketupat bersudut 30° tidak sebangun dengan belah ketupat bersudut 60° walaupun semua sisinya proporsional.',
  },
  {
    name: 'Trapesium',
    description: 'Memiliki sepasang sisi berhadapan sejajar.',
    alwaysSimilar: false,
    angleCondition: 'Seluruh sudut bersesuaian harus sama besar.',
    sideCondition: 'Rasio sisi alas, sisi atas, dan kedua kaki harus memiliki nilai k yang sama.',
    notes: 'Dua trapesium sembarang atau sama kaki jarang sebangun kecuali rasionya tepat identik.',
  },
  {
    name: 'Layang-layang',
    description: 'Memiliki dua pasang sisi berdekatan sama panjang.',
    alwaysSimilar: false,
    angleCondition: 'Sudut yang bersesuaian harus sama besar.',
    sideCondition: 'Rasio kedua pasang sisi harus sama persis.',
    notes: 'TIDAK selalu sebangun kecuali proporsi layang-layangnya identik.',
  },
];

export const REAL_LIFE_SCENARIOS: RealLifeScenario[] = [
  {
    id: 'tree_shadow',
    title: '1. Mengukur Tinggi Pohon Menggunakan Bayangan',
    category: 'Forensik Luar Ruang',
    story: 'Detektif ingin mengukur tinggi pohon misterius di halaman laboratorium tanpa harus memanjatnya. Detektif menancapkan tongkat tegak lurus di tanah pada siang hari.',
    illustrationType: 'tree',
    concept: 'Sinar matahari datang secara sejajar, sehingga sudut elevasi matahari terhadap tanah sama besar (AA). Terbentuk dua segitiga siku-siku sebangun antara pohon-bayangan dan tongkat-bayangan.',
    formula: 'Tinggi Pohon / Tinggi Tongkat = Bayangan Pohon / Bayangan Tongkat\nTinggi Pohon = (Bayangan Pohon × Tinggi Tongkat) / Bayangan Tongkat',
    interactiveQuestion: {
      questionText: 'Hitung tinggi pohon jika diketahui data berikut:',
      inputs: [
        { label: 'Tinggi Tongkat', key: 'stickH', defaultValue: 1.5, unit: 'm' },
        { label: 'Panjang Bayangan Tongkat', key: 'stickS', defaultValue: 2, unit: 'm' },
        { label: 'Panjang Bayangan Pohon', key: 'treeS', defaultValue: 12, unit: 'm' },
      ],
      calcAnswer: (v) => parseFloat(((v.treeS * v.stickH) / v.stickS).toFixed(2)),
      explanationTemplate: (v, ans) =>
        `Tinggi Pohon = (${v.treeS} m × ${v.stickH} m) ÷ ${v.stickS} m = ${ans} meter. Faktor skala k = ${v.treeS} ÷ ${v.stickS} = ${(v.treeS / v.stickS).toFixed(2)}.`,
    },
  },
  {
    id: 'map_scale',
    title: '2. Menentukan Jarak Sebenarnya dari Skala Peta',
    category: 'Kartografi & Navigasi',
    story: 'Pada peta rute pelarian tersangka, skala yang tertera adalah 1 : 250.000. Detektif mengukur jarak garis lurus antara dua lokasi pada peta.',
    illustrationType: 'map',
    concept: 'Peta merupakan bentuk sebangun dari wilayah bumi asli dengan faktor pereduksian skala konstan.',
    formula: 'Jarak Sebenarnya = Jarak pada Peta × Angka Skala\nSkala 1 : S artinya 1 cm pada peta = S cm (atau S/100.000 km) di lapangan.',
    interactiveQuestion: {
      questionText: 'Hitung jarak sebenarnya di darat dalam kilometer (km):',
      inputs: [
        { label: 'Jarak pada Peta', key: 'mapDist', defaultValue: 4, unit: 'cm' },
        { label: 'Faktor Skala (1 : x)', key: 'scaleVal', defaultValue: 250000, unit: '' },
      ],
      calcAnswer: (v) => parseFloat(((v.mapDist * v.scaleVal) / 100000).toFixed(2)),
      explanationTemplate: (v, ans) =>
        `Jarak Asli = ${v.mapDist} cm × ${v.scaleVal} = ${(v.mapDist * v.scaleVal).toLocaleString()} cm = ${ans} km.`,
    },
  },
  {
    id: 'photo_zoom',
    title: '3. Memperbesar & Memperkecil Foto Barang Bukti',
    category: 'Laboratorium Digital Forensik',
    story: 'Sebuah foto paspor berukuran 3 cm × 4 cm perlu diperbesar agar detil wajah tersangka terlihat jelas pada papan investigasi.',
    illustrationType: 'photo',
    concept: 'Agar foto tidak terdistorsi (gepeng/melar), perbesaran harus mempertahankan aspek rasio (sebangun). Luas foto akan membesar sebesar k².',
    formula: 'Lebar Baru = k × Lebar Asli\nPanjang Baru = k × Panjang Asli\nLuas Baru = k² × Luas Asli',
    interactiveQuestion: {
      questionText: 'Jika foto diperbesar dengan faktor skala k, berapakah luas foto yang baru?',
      inputs: [
        { label: 'Lebar Asli', key: 'origW', defaultValue: 3, unit: 'cm' },
        { label: 'Tinggi Asli', key: 'origH', defaultValue: 4, unit: 'cm' },
        { label: 'Faktor Skala Pembesaran (k)', key: 'kScale', defaultValue: 3, unit: 'kali' },
      ],
      calcAnswer: (v) => parseFloat((v.origW * v.origH * Math.pow(v.kScale, 2)).toFixed(2)),
      explanationTemplate: (v, ans) =>
        `Luas Asli = ${v.origW} × ${v.origH} = ${v.origW * v.origH} cm². Luas Baru = ${v.origW * v.origH} × (${v.kScale})² = ${v.origW * v.origH} × ${v.kScale * v.kScale} = ${ans} cm².`,
    },
  },
  {
    id: 'tile_compare',
    title: '4. Membandingkan Ukuran & Kebutuhan Ubin',
    category: 'Rekonstruksi Tempat Kejadian Perkara',
    story: 'Lantai ruang brankas berukuran tertentu dilapisi ubin keramik persegi. Detektif membandingkan dua jenis ubin keramik yang tersedia.',
    illustrationType: 'tile',
    concept: 'Semua ubin persegi adalah sebangun. Perbandingan luas ubin berbanding kuadrat dari panjang sisinya: L₂/L₁ = (s₂/s₁)².',
    formula: 'Luas Ubin = sisi × sisi\nRasio Luas = (sisi₂ / sisi₁)²\nJumlah ubin kecil yang setara = Rasio Luas',
    interactiveQuestion: {
      questionText: 'Berapa buah ubin kecil yang dibutuhkan untuk menyamai luas satu ubin besar?',
      inputs: [
        { label: 'Sisi Ubin Kecil (s₁)', key: 'tileSmall', defaultValue: 20, unit: 'cm' },
        { label: 'Sisi Ubin Besar (s₂)', key: 'tileBig', defaultValue: 60, unit: 'cm' },
      ],
      calcAnswer: (v) => parseFloat((Math.pow(v.tileBig / v.tileSmall, 2)).toFixed(2)),
      explanationTemplate: (v, ans) =>
        `Faktor skala k = ${v.tileBig} / ${v.tileSmall} = ${(v.tileBig / v.tileSmall).toFixed(1)}. Rasio luas k² = (${(v.tileBig / v.tileSmall).toFixed(1)})² = ${ans} ubin kecil.`,
    },
  },
  {
    id: 'congruent_patterns',
    title: '5. Motif Bangun Kongruen (Tessellation Paving / Batik)',
    category: 'Pola Geometri & Kriptografi',
    story: 'Pola paving block dan batik tradisional memanfaatkan ubin berbentuk poligon yang kongruen persis agar saling mengunci (tessellation) tanpa celah.',
    illustrationType: 'pattern',
    concept: 'Semua ubin dalam tessellation harus memiliki bentuk dan ukuran yang identik (kongruen, k = 1) agar dapat menutupi bidang secara sempurna.',
    formula: 'Kekongruenan: Bentuk sama, Luas sama, Keliling sama.\nLuas Total = Jumlah Ubin × Luas Satu Ubin',
    interactiveQuestion: {
      questionText: 'Hitung luas lantai yang tertutup jika dipasang N ubin kongruen:',
      inputs: [
        { label: 'Jumlah Ubin Segitiga Kongruen', key: 'count', defaultValue: 50, unit: 'buah' },
        { label: 'Alas Tiap Segitiga', key: 'base', defaultValue: 10, unit: 'cm' },
        { label: 'Tinggi Tiap Segitiga', key: 'height', defaultValue: 8, unit: 'cm' },
      ],
      calcAnswer: (v) => parseFloat((v.count * 0.5 * v.base * v.height).toFixed(2)),
      explanationTemplate: (v, ans) =>
        `Luas 1 segitiga = ½ × ${v.base} × ${v.height} = ${0.5 * v.base * v.height} cm². Luas total = ${v.count} × ${0.5 * v.base * v.height} = ${ans} cm² (${(ans / 10000).toFixed(2)} m²).`,
    },
  },
  {
    id: 'floor_blueprint',
    title: '6. Membuat Denah Bangunan Arsitektur',
    category: 'Arsitektur & Cetak Biru',
    story: 'Sebelum membangun gedung laboratorium forensik, arsitek membuat denah blueprint berukuran proporsional dengan skala 1 : 100.',
    illustrationType: 'blueprint',
    concept: 'Setiap ruangan pada denah sebangun dengan ruangan sebenarnya. Sudut-sudut ruangan dipertahankan 90° dan panjang sisi diperkecil dengan skala 1 : 100.',
    formula: 'Panjang Denah = Panjang Asli ÷ Skala\nLebar Denah = Lebar Asli ÷ Skala',
    interactiveQuestion: {
      questionText: 'Hitung panjang ruangan laboratorium pada denah (skala 1 : 100) dalam cm:',
      inputs: [
        { label: 'Panjang Ruangan Nyata', key: 'realLength', defaultValue: 8, unit: 'meter' },
        { label: 'Lebar Ruangan Nyata', key: 'realWidth', defaultValue: 6, unit: 'meter' },
      ],
      calcAnswer: (v) => parseFloat(((v.realLength * 100) / 100).toFixed(2)),
      explanationTemplate: (v, ans) =>
        `Panjang pada denah = (${v.realLength} × 100 cm) ÷ 100 = ${ans} cm. Lebar pada denah = (${v.realWidth} × 100 cm) ÷ 100 = ${v.realWidth} cm.`,
    },
  },
];
