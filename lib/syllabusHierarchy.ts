/**
 * Comprehensive Syllabus Hierarchy Engine
 * Resolves raw question metadata into strict, academic 5-tier progressive structure:
 * Unit (L1) -> Broad Topic (L2) -> Subtopic/Entity (L3) -> Learning Node (L4) -> Questions (L5)
 */

export function slugify(text: string): string {
  return (text || 'unnamed')
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface CanonicalSubtopic {
  nameAr: string;
  nameEn: string;
  slug: string;
}

// Canonical author and category patterns
const CANONICAL_PATTERNS: Array<{
  keywords: string[];
  nameAr: string;
  nameEn: string;
  slug: string;
}> = [
  // === UNIT 1: ARABIC POETRY ===
  {
    keywords: ['امرؤ القيس', 'امْرِئِ الْقَيْسِ', 'امرى القيس', 'imru'],
    nameAr: 'امْرُؤُ الْقَيْسِ',
    nameEn: "Imru' al-Qais",
    slug: 'imru-al-qays'
  },
  {
    keywords: ['طرفة بن العبد', 'طَرَفَةَ', 'tarafa'],
    nameAr: 'طَرَفَةُ بْنُ الْعَبْدِ',
    nameEn: 'Tarafah ibn al-Abd',
    slug: 'tarafa-ibn-al-abd'
  },
  {
    keywords: ['زهير بن أبي سلمى', 'زُهَيْرِ', 'zuhayr'],
    nameAr: 'زُهَيْرُ بْنُ أَبِي سُلْمَى',
    nameEn: 'Zuhayr ibn Abi Sulma',
    slug: 'zuhayr-ibn-abi-sulma'
  },
  {
    keywords: ['عنترة بن شداد', 'عَنْتَرَةَ', 'antara'],
    nameAr: 'عَنْتَرَةُ بْنُ شَدَّادٍ',
    nameEn: "'Antarah ibn Shaddad",
    slug: 'antara-ibn-shaddad'
  },
  {
    keywords: ['عمرو بن كلثوم', 'عَمْرِو بْنِ كُلْثُومٍ', 'kulthum'],
    nameAr: 'عَمْرُو بْنُ كُلْثُومٍ',
    nameEn: "'Amr ibn Kulthum",
    slug: 'amr-ibn-kulthum'
  },
  {
    keywords: ['لبيد بن ربيعة', 'لَبِيدِ', 'labid'],
    nameAr: 'لَبِيدُ بْنُ رَبِيعَةَ',
    nameEn: 'Labid ibn Rabi\'ah',
    slug: 'labid-ibn-rabi-a'
  },
  {
    keywords: ['الحارث بن حلزة', 'الْحَارِثُ', 'harith'],
    nameAr: 'الْحَارِثُ بْنُ حِلِّزَةَ',
    nameEn: 'Al-Harith ibn Hillizah',
    slug: 'al-harith-ibn-hilliza'
  },
  {
    keywords: ['النابغة الذبياني', 'النَّابِغَةُ', 'nabigha'],
    nameAr: 'النَّابِغَةُ الذُّبْيَانِيُّ',
    nameEn: 'Al-Nabighah al-Dhubyani',
    slug: 'al-nabigha-al-dhubyani'
  },
  {
    keywords: ['الأعشى', 'الْأَعْشَى', "a'sha"],
    nameAr: 'الْأَعْشَى (مَيْمُونُ بْنُ قَيْسٍ)',
    nameEn: "Al-A'sha",
    slug: 'al-a-sha'
  },
  {
    keywords: ['حاتم الطائي', 'حَاتِمٍ', 'hatim'],
    nameAr: 'حَاتِمٌ الطَّائِيُّ',
    nameEn: "Hatim al-Ta'i",
    slug: 'hatim-al-tai'
  },
  {
    keywords: ['عبيد بن الأبرص', 'الْأَبْرَصِ', 'ubayd'],
    nameAr: 'عَبِيدُ بْنُ الْأَبْرَصِ',
    nameEn: 'Ubayd ibn al-Abras',
    slug: 'ubayd-ibn-al-abras'
  },
  {
    keywords: ['حماد الراوية', 'حَمَّادٍ الرَّاوِيَةِ', 'hammad'],
    nameAr: 'حَمَّادٌ الرَّاوِيَةُ',
    nameEn: 'Hammad al-Rawiyah',
    slug: 'hammad-al-rawiyah'
  },
  {
    keywords: ['الشنفرى', 'shanfara'],
    nameAr: 'الشَّنْفَرَى',
    nameEn: 'Al-Shanfara',
    slug: 'al-shanfara'
  },
  {
    keywords: ['تأبط شرا', 'taabbata'],
    nameAr: 'تَأَبَّطَ شَرًّا',
    nameEn: 'Ta\'abbata Sharran',
    slug: 'taabbata-sharran'
  },
  {
    keywords: ['عروة بن الورد', 'urwah'],
    nameAr: 'عُرْوَةُ بْنُ الْوَرْدِ',
    nameEn: 'Urwah ibn al-Ward',
    slug: 'urwah-ibn-al-ward'
  },
  {
    keywords: ['حسان بن ثابت', 'hassan ibn'],
    nameAr: 'حَسَّانُ بْنُ ثَابِتٍ',
    nameEn: 'Hassan ibn Thabit',
    slug: 'hassan-ibn-thabit'
  },
  {
    keywords: ['كعب بن زهير', "ka'b ibn", 'kab ibn'],
    nameAr: 'كَعْبُ بْنُ زُهَيْرٍ',
    nameEn: 'Ka\'b ibn Zuhayr',
    slug: 'kab-ibn-zuhayr'
  },
  {
    keywords: ['الخنساء', 'khansa'],
    nameAr: 'الْخَنْسَاءُ',
    nameEn: 'Al-Khansa',
    slug: 'al-khansa'
  },
  {
    keywords: ['الحطيئة', 'hutay'],
    nameAr: 'الْحُطَيْئَةُ',
    nameEn: 'Al-Hutay\'ah',
    slug: 'al-hutayah'
  },
  {
    keywords: ['جرير', 'jarir'],
    nameAr: 'جَرِيرٌ',
    nameEn: 'Jarir',
    slug: 'jarir'
  },
  {
    keywords: ['الفرزدق', 'farazdaq'],
    nameAr: 'الْفَرَزْدَقُ',
    nameEn: 'Al-Farazdaq',
    slug: 'al-farazdaq'
  },
  {
    keywords: ['الأخطل', 'akhtal'],
    nameAr: 'الْأَخْطَلُ',
    nameEn: 'Al-Akhtal',
    slug: 'al-akhtal'
  },
  {
    keywords: ['عمر بن أبي ربيعة', 'umar ibn abi'],
    nameAr: 'عُمَرُ بْنُ أَبِي رَبِيعَةَ',
    nameEn: 'Umar ibn Abi Rabi\'ah',
    slug: 'umar-ibn-abi-rabiah'
  },
  {
    keywords: ['جميل بثينة', 'jamil buthayna'],
    nameAr: 'جَمِيلُ بُثَيْنَةَ',
    nameEn: 'Jamil Buthaynah',
    slug: 'jamil-buthaynah'
  },
  {
    keywords: ['قيس بن الملوح', 'مجنون ليلى', 'majnoon layla'],
    nameAr: 'قَيْسُ بْنُ الْمُلَوَّحِ (مَجْنُونُ لَيْلَى)',
    nameEn: 'Qays ibn al-Mulawwah',
    slug: 'qays-ibn-al-mulawwah'
  },
  {
    keywords: ['المتنبي', 'mutanabbi'],
    nameAr: 'أَبُو الطَّيِّبِ الْمُتَنَبِّي',
    nameEn: 'Al-Mutanabbi',
    slug: 'al-mutanabbi'
  },
  {
    keywords: ['المعري', 'maari', "ma'arri"],
    nameAr: 'أَبُو الْعَلَاءِ الْمَعَرِّيُّ',
    nameEn: 'Abu al-Ala al-Ma\'arri',
    slug: 'abu-al-ala-al-maarri'
  },
  {
    keywords: ['أبو تمام', 'abu tammam'],
    nameAr: 'أَبُو تَمَّامٍ',
    nameEn: 'Abu Tammam',
    slug: 'abu-tammam'
  },
  {
    keywords: ['البحتري', 'buhturi'],
    nameAr: 'الْبُحْتُرِيُّ',
    nameEn: 'Al-Buhturi',
    slug: 'al-buhturi'
  },
  {
    keywords: ['أبو نواس', 'abu nuwas'],
    nameAr: 'أَبُو نُوَاسٍ',
    nameEn: 'Abu Nuwas',
    slug: 'abu-nuwas'
  },
  {
    keywords: ['بشار بن برد', 'bashshar'],
    nameAr: 'بَشَّارُ بْنُ بُرْدٍ',
    nameEn: 'Bashshar ibn Burd',
    slug: 'bashshar-ibn-burd'
  },
  {
    keywords: ['أبو العتاهية', 'abu al-atahiah', 'abu al-atahiya'],
    nameAr: 'أَبُو الْعَتَاهِيَةِ',
    nameEn: 'Abu al-Atahiyah',
    slug: 'abu-al-atahiyah'
  },
  {
    keywords: ['ابن الرومي', 'ibn al-rumi'],
    nameAr: 'ابْنُ الرُّومِيِّ',
    nameEn: 'Ibn al-Rumi',
    slug: 'ibn-al-rumi'
  },

  // === UNIT 2: ARABIC PROSE ===
  {
    keywords: ['الجاحظ', 'al-jahiz'],
    nameAr: 'الْجَاحِظُ',
    nameEn: 'Al-Jahiz',
    slug: 'al-jahiz'
  },
  {
    keywords: ['ابن المقفع', 'ibn al-muqaffa'],
    nameAr: 'ابْنُ الْمُقَفَّعِ',
    nameEn: 'Ibn al-Muqaffa',
    slug: 'ibn-al-muqaffa'
  },
  {
    keywords: ['بديع الزمان', 'hamadhani'],
    nameAr: 'بَدِيعُ الزَّمَانِ الْهَمَذَانِيُّ',
    nameEn: 'Badi al-Zaman al-Hamadhani',
    slug: 'badi-al-zaman-al-hamadhani'
  },
  {
    keywords: ['الحريري', 'al-hariri'],
    nameAr: 'الْحَرِيرِيُّ',
    nameEn: 'Al-Hariri',
    slug: 'al-hariri'
  },
  {
    keywords: ['التوحيدي', 'أبو حيان', 'al-tawhidi'],
    nameAr: 'أَبُو حَيَّانَ التَّوْحِيدِيُّ',
    nameEn: 'Abu Hayyan al-Tawhidi',
    slug: 'abu-hayyan-al-tawhidi'
  },
  {
    keywords: ['ابن العميد', 'ibn al-amid'],
    nameAr: 'ابْنُ الْعَمِيدِ',
    nameEn: 'Ibn al-Amid',
    slug: 'ibn-al-amid'
  },
  {
    keywords: ['الصاحب بن عباد', 'sahib ibn abbad'],
    nameAr: 'الصَّاحِبُ بْنُ عَبَّادٍ',
    nameEn: 'Al-Sahib ibn Abbad',
    slug: 'al-sahib-ibn-abbad'
  },
  {
    keywords: ['القاضي الفاضل', 'al-qadi al-fadil'],
    nameAr: 'الْقَاضِي الْفَاضِلُ',
    nameEn: 'Al-Qadi al-Fadil',
    slug: 'al-qadi-al-fadil'
  },

  // === UNIT 3: MAHJAR & ANDALUSIAN ===
  {
    keywords: ['ابن زيدون', 'ibn zaydun'],
    nameAr: 'ابْنُ زَيْدُونَ',
    nameEn: 'Ibn Zaydun',
    slug: 'ibn-zaydun'
  },
  {
    keywords: ['ابن حزم', 'طوق الحمامة', 'ibn hazm'],
    nameAr: 'ابْنُ حَزْمٍ الْأَنْدَلُسِيُّ',
    nameEn: 'Ibn Hazm al-Andalusi',
    slug: 'ibn-hazm'
  },
  {
    keywords: ['ابن خفاجة', 'ibn khafajah'],
    nameAr: 'ابْنُ خَفَاجَةَ',
    nameEn: 'Ibn Khafajah',
    slug: 'ibn-khafajah'
  },
  {
    keywords: ['لسان الدين بن الخطيب', 'lisan al-din'],
    nameAr: 'لِسَانُ الدِّينِ بْنُ الْخَطِيبِ',
    nameEn: 'Lisan al-Din ibn al-Khatib',
    slug: 'lisan-al-din'
  },
  {
    keywords: ['ابن عبد ربه', 'العقد الفريد', 'ibn abd rabbih'],
    nameAr: 'ابْنُ عَبْدِ رَبِّهِ',
    nameEn: 'Ibn Abd Rabbih',
    slug: 'ibn-abd-rabbih'
  },
  {
    keywords: ['جبران خليل جبران', 'gibran'],
    nameAr: 'جُبْرَان خَلِيل جُبْرَان',
    nameEn: 'Kahlil Gibran',
    slug: 'kahlil-gibran'
  },
  {
    keywords: ['إيليا أبو ماضي', 'elia abu madi', 'abu madhi'],
    nameAr: 'إِيلِيَّا أَبُو مَاضِي',
    nameEn: 'Elia Abu Madi',
    slug: 'elia-abu-madi'
  },
  {
    keywords: ['ميخائيل نعيمة', 'mikhail naimy'],
    nameAr: 'مِيخَائِيل نُعَيْمَة',
    nameEn: 'Mikhail Naimy',
    slug: 'mikhail-naimy'
  },
  {
    keywords: ['فوزي المعلوف', 'fawzi al-maluf'],
    nameAr: 'فَوْزِي الْمَعْلُوف',
    nameEn: 'Fawzi al-Ma\'luf',
    slug: 'fawzi-al-maluf'
  },
  {
    keywords: ['رشيد سليم الخوري', 'الشاعر القروي', 'al-sha\'ir al-qarawi'],
    nameAr: 'رَشِيد سَلِيم الْخُورِي (الشَّاعِرُ الْقَرَوِيُّ)',
    nameEn: 'Rashid Salim al-Khouri',
    slug: 'rashid-salim-al-khouri'
  },

  // === UNIT 4: LITERARY CRITICISM ===
  {
    keywords: ['ابن سلام الجمحي', 'طبقات فحول الشعراء', 'ibn sallam'],
    nameAr: 'ابْنُ سَلَّامٍ الْجُمَحِيُّ',
    nameEn: 'Ibn Sallam al-Jumahi',
    slug: 'ibn-sallam-al-jumahi'
  },
  {
    keywords: ['ابن قتيبة', 'الشعر والشعراء', 'ibn qutaybah'],
    nameAr: 'ابْنُ قُتَيْبَةَ الدِّينَوَرِيُّ',
    nameEn: 'Ibn Qutaybah',
    slug: 'ibn-qutaybah'
  },
  {
    keywords: ['قدامة بن جعفر', 'نقد الشعر', 'qudama'],
    nameAr: 'قُدَامَةُ بْنُ جَعْفَرٍ',
    nameEn: 'Qudama ibn Ja\'far',
    slug: 'qudama-ibn-jafar'
  },
  {
    keywords: ['الآمدي', 'الموازنة', 'al-amidi'],
    nameAr: 'الْآمِدِيُّ (صَاحِبُ الْمُوَازَنَةِ)',
    nameEn: 'Al-Amidi',
    slug: 'al-amidi'
  },
  {
    keywords: ['عبد القاهر الجرجاني', 'أسرار البلاغة', 'دلائل الإعجاز', 'al-jurjani'],
    nameAr: 'عَبْدُ الْقَاهِرِ الْجُرْجَانِيُّ',
    nameEn: 'Abd al-Qahir al-Jurjani',
    slug: 'abd-al-qahir-al-jurjani'
  },
  {
    keywords: ['ابن رشيق القيرواني', 'العمدة', 'ibn rashiq'],
    nameAr: 'ابْنُ رَشِيقٍ الْقَيْرَوَانِيُّ',
    nameEn: 'Ibn Rashiq al-Qayrawani',
    slug: 'ibn-rashiq'
  },
  {
    keywords: ['طه حسين', 'في الشعر الجاهلي', 'taha hussein'],
    nameAr: 'طَهَ حُسَيْن',
    nameEn: 'Taha Hussein',
    slug: 'taha-hussein'
  },
  {
    keywords: ['محمد مندور', 'mandur'],
    nameAr: 'مُحَمَّد مَنْدُور',
    nameEn: 'Muhammad Mandur',
    slug: 'muhammad-mandur'
  },

  // === UNIT 5: RHETORIC & PROSODY ===
  {
    keywords: ['الخليل بن أحمد', 'الفراهيدي', 'al-farahidi'],
    nameAr: 'الْخَلِيلُ بْنُ أَحْمَدَ الْفَرَاهِيدِيُّ',
    nameEn: 'Al-Khalil ibn Ahmad al-Farahidi',
    slug: 'al-khalil-ibn-ahmad'
  },
  {
    keywords: ['علم البيان', 'التشبيه', 'الاستعارة', 'المجاز', 'الكناية', 'bayan'],
    nameAr: 'عِلْمُ الْبَيَانِ (التَّشْبِيهُ وَالِاسْتِعَارَةُ وَالْكِنَايَةُ)',
    nameEn: 'Ilm al-Bayan (Figurative Language)',
    slug: 'ilm-al-bayan'
  },
  {
    keywords: ['علم المعاني', 'الخبر والإنشاء', 'الإيجاز والإطناب', 'القصر', 'maani'],
    nameAr: 'عِلْمُ الْمَعَانِي (الْخَبَرُ وَالْإِنْشَاءُ وَالْقَصْرُ)',
    nameEn: 'Ilm al-Ma\'ani (Semantics)',
    slug: 'ilm-al-maani'
  },
  {
    keywords: ['علم البديع', 'الجناس', 'الطباق', 'المقابلة', 'السجع', 'التورية', 'badi'],
    nameAr: 'عِلْمُ الْبَدِيعِ (الْمُحَسِّنَاتُ اللَّفْظِيَّةُ وَالْمَعْنَوِيَّةُ)',
    nameEn: 'Ilm al-Badi (Rhetorical Devices)',
    slug: 'ilm-al-badi'
  },
  {
    keywords: ['علم العروض', 'البحور الشعرية', 'الوزن', 'القافية', 'arud'],
    nameAr: 'عِلْمُ الْعَرُوضِ وَالْقَافِيَةِ',
    nameEn: 'Arabic Prosody & Metres (Arud)',
    slug: 'arud-prosody'
  },

  // === UNIT 7: MODERN LITERATURE ===
  {
    keywords: ['محمود سامي البارودي', 'al-barudi', 'baroudi'],
    nameAr: 'مَحْمُود سَامِي الْبَارُودِيّ',
    nameEn: 'Mahmoud Sami al-Baroudi',
    slug: 'mahmoud-sami-al-baroudi'
  },
  {
    keywords: ['أحمد شوقي', 'shawqi', 'shawki'],
    nameAr: 'أَحْمَد شَوْقِي (أَمِيرُ الشُّعَرَاءِ)',
    nameEn: 'Ahmad Shawqi',
    slug: 'ahmad-shawqi'
  },
  {
    keywords: ['حافظ إبراهيم', 'hafiz ibrahim'],
    nameAr: 'حَافِظ إِبْرَاهِيم (شَاعِرُ النِّيلِ)',
    nameEn: 'Hafiz Ibrahim',
    slug: 'hafiz-ibrahim'
  },
  {
    keywords: ['خليل مطران', 'mutran'],
    nameAr: 'خَلِيل مُطْرَان (شَاعِرُ الْقُطْرَيْنِ)',
    nameEn: 'Khalil Mutran',
    slug: 'khalil-mutran'
  },
  {
    keywords: ['أبو القاسم الشابي', 'al-shabbi', 'chabbi'],
    nameAr: 'أَبُو الْقَاسِمِ الشَّابِّي',
    nameEn: 'Aboul-Qacem Echebbi',
    slug: 'aboul-qacem-echebbi'
  },
  {
    keywords: ['بدر شاكر السياب', 'al-sayyab'],
    nameAr: 'بَدْر شَاكِر السَّيَّاب',
    nameEn: 'Badr Shakir al-Sayyab',
    slug: 'badr-shakir-al-sayyab'
  },
  {
    keywords: ['نازك الملائكة', 'nazik'],
    nameAr: 'نَازِك الْمَلَائِكَة',
    nameEn: 'Nazik al-Malaika',
    slug: 'nazik-al-malaika'
  },
  {
    keywords: ['محمود درويش', 'mahmoud darwish'],
    nameAr: 'مَحْمُود دَرْوِيش',
    nameEn: 'Mahmoud Darwish',
    slug: 'mahmoud-darwish'
  },
  {
    keywords: ['نزار قباني', 'nizar qabbani'],
    nameAr: 'نِزَار قَبَّانِي',
    nameEn: 'Nizar Qabbani',
    slug: 'nizar-qabbani'
  },
  {
    keywords: ['نجيب محفوظ', 'naguib mahfouz'],
    nameAr: 'نَجِيب مَحْفُوظ',
    nameEn: 'Naguib Mahfouz',
    slug: 'naguib-mahfouz'
  },
  {
    keywords: ['توفيق الحكيم', 'tawfiq al-hakim'],
    nameAr: 'تَوْفِيق الْحَكِيم',
    nameEn: 'Tawfiq al-Hakim',
    slug: 'tawfiq-al-hakim'
  },
  {
    keywords: ['يوسف إدريس', 'yusuf idris'],
    nameAr: 'يُوسُف إِدْرِيس',
    nameEn: 'Yusuf Idris',
    slug: 'yusuf-idris'
  },
  {
    keywords: ['محمود تيمور', 'mahmud taymur'],
    nameAr: 'مَحْمُود تَيْمُور',
    nameEn: 'Mahmud Taymur',
    slug: 'mahmud-taymur'
  },
  {
    keywords: ['يحيى حقي', 'yahya haqqi'],
    nameAr: 'يَحْيَى حَقِّي',
    nameEn: 'Yahya Haqqi',
    slug: 'yahya-haqqi'
  },

  // === UNIT 8: TRENDS & SCHOOLS ===
  {
    keywords: ['مدرسة الديوان', 'العقاد', 'المازني', 'شكري', 'diwan school'],
    nameAr: 'مَدْرَسَةُ الدِّيوَانِ (الْعَقَّادُ، الْمَازِنِيُّ، شُكْرِي)',
    nameEn: 'Diwan School (al-Aqqad, al-Mazini, Shukri)',
    slug: 'diwan-school'
  },
  {
    keywords: ['مدرسة أبولو', 'أحمد زكي أبو شادي', 'إبراهيم ناجي', 'apollo'],
    nameAr: 'مَدْرَسَةُ أَبُولُّو (أَبُو شَادِي، نَاجِي)',
    nameEn: 'Apollo School (Abu Shadi, Naji)',
    slug: 'apollo-school'
  },
  {
    keywords: ['مدرسة الإحياء', 'البعث', 'neoclassicism'],
    nameAr: 'مَدْرَسَةُ الْإِحْيَاءِ وَالْبَعْثِ (الْكِلَاسِيكِيَّةُ الْجَدِيدَةُ)',
    nameEn: 'Revival & Neoclassical School',
    slug: 'revival-school'
  },
  {
    keywords: ['الرابطة القلمية', 'العصبة الأندلسية', 'mahjar school'],
    nameAr: 'مَدْرَسَةُ الْمَهْجَرِ (الرَّابِطَةُ الْقَلَمِيَّةُ وَالْعُصْبَةُ الْأَنْدَلُسِيَّةُ)',
    nameEn: 'Mahjar Literary Leagues',
    slug: 'mahjar-leagues'
  },
  {
    keywords: ['شعر التفعيلة', 'الشعر الحر', 'free verse'],
    nameAr: 'شِعْرُ التَّفْعِيلَةِ (الشِّعْرُ الْحُرُّ)',
    nameEn: 'Free Verse Movement',
    slug: 'free-verse-movement'
  },

  // === UNIT 9: INDO-ARABIC ===
  {
    keywords: ['الشاه ولي الله', 'حجة الله البالغة', 'shah waliullah'],
    nameAr: 'الشَّاهُ وَلِيُّ اللَّهِ الدِّهْلَوِيُّ',
    nameEn: 'Shah Waliullah al-Dihlawi',
    slug: 'shah-waliullah'
  },
  {
    keywords: ['علي الحسني الندوي', 'ماذا خسر العالم', 'ali hasani nadwi'],
    nameAr: 'أَبُو الْحَسَنِ عَلِيٌّ الْحَسَنِيُّ النَّدْوِيُّ',
    nameEn: 'Abul Hasan Ali Nadwi',
    slug: 'abul-hasan-ali-nadwi'
  },
  {
    keywords: ['عبد الحي الحسني', 'نزهة الخواطر', 'abd al-hayy'],
    nameAr: 'عَبْدُ الْحَيِّ الْحَسَنِيُّ (صَاحِبُ نُزْهَةِ الْخَوَاطِرِ)',
    nameEn: 'Abd al-Hayy al-Hasani',
    slug: 'abd-al-hayy-al-hasani'
  },
  {
    keywords: ['صديق حسن خان', 'القنوجي', 'siddiq hasan khan'],
    nameAr: 'نَوَّاب صِدِّيق حَسَن خَان الْقِنَّوْجِيُّ',
    nameEn: 'Nawab Siddiq Hasan Khan',
    slug: 'siddiq-hasan-khan'
  },
  {
    keywords: ['عبد الحق الدهلوي', 'المحدث', 'abd al-haqq'],
    nameAr: 'عَبْدُ الْحَقِّ الْمُحَدِّثُ الدِّهْلَوِيُّ',
    nameEn: 'Abd al-Haqq al-Muhaddith al-Dehlawi',
    slug: 'abd-al-haqq-al-dehlawi'
  },
  {
    keywords: ['فضل حق الخير آبادي', 'fazl-e-haqq', 'khairabadi'],
    nameAr: 'فَضْلُ الْحَقِّ الْخَيْرُ آبَادِيُّ',
    nameEn: 'Fazl-e-Haqq Khairabadi',
    slug: 'fazl-e-haqq-khairabadi'
  },
  {
    keywords: ['غلام علي آزاد البلجرامي', 'سبحة المرجان', 'azad bilgrami'],
    nameAr: 'غُلَام عَلِيّ آزَاد الْبِلْجِرَامِيّ',
    nameEn: 'Ghulam Ali Azad Bilgrami',
    slug: 'azad-bilgrami'
  },
  {
    keywords: ['شبلي النعماني', 'shibli nomani'],
    nameAr: 'شِبْلِي النُّعْمَانِيُّ',
    nameEn: 'Shibli Nomani',
    slug: 'shibli-nomani'
  },

  // === UNIT 10: TRANSLATION & GENERAL ===
  {
    keywords: ['النحو', 'الإعراب', 'المبتدأ', 'الخبر', 'الفاعل', 'المفعول', 'العدد', 'التطبيقات اللغوية', 'grammar'],
    nameAr: 'قَوَاعِدُ النَّحْوِ وَالتَّطْبِيقَاتُ اللُّغَوِيَّةُ',
    nameEn: 'Arabic Syntax & Grammar Applications',
    slug: 'arabic-grammar-syntax'
  },
  {
    keywords: ['الصرف', 'الميزان الصرفي', 'المشتقات', 'sarf', 'morphology'],
    nameAr: 'عِلْمُ الصَّرْفِ وَالِاشْتِقَاقِ',
    nameEn: 'Morphology & Word Derivation',
    slug: 'arabic-morphology'
  },
  {
    keywords: ['الترجمة', 'تعريب', 'نظريات الترجمة', 'translation'],
    nameAr: 'حَرَكَةُ وَتَارِيخُ التَّرْجَمَةِ',
    nameEn: 'Translation Theory & History',
    slug: 'translation-history'
  },
  {
    keywords: ['العالم العربي', 'الجامعة العربية', 'العواصم', 'المنظمات', 'general knowledge'],
    nameAr: 'مَعْلُومَاتٌ عَامَّةٌ عَنِ الْعَالَمِ الْعَرَبِيِّ وَالْمُنَظَّمَاتِ',
    nameEn: 'General Knowledge & Arab World Affairs',
    slug: 'arab-world-affairs'
  }
];

export function resolveCanonicalEntity(q: {
  specific_entity_name_arabic?: string | null;
  specific_entity_name_english?: string | null;
  question_micro_focus_arabic?: string | null;
  question_micro_focus_english?: string | null;
  question_arabic: string;
}): CanonicalSubtopic {
  const combined = `${q.specific_entity_name_arabic || ''} ${q.specific_entity_name_english || ''} ${q.question_micro_focus_arabic || ''} ${q.question_micro_focus_english || ''} ${q.question_arabic}`.toLowerCase();

  for (const pattern of CANONICAL_PATTERNS) {
    for (const kw of pattern.keywords) {
      if (combined.includes(kw.toLowerCase())) {
        return {
          nameAr: pattern.nameAr,
          nameEn: pattern.nameEn,
          slug: pattern.slug,
        };
      }
    }
  }

  // Fallback to explicit entity name if available
  if (
    q.specific_entity_name_arabic &&
    q.specific_entity_name_arabic !== 'عام' &&
    q.specific_entity_name_arabic !== 'General'
  ) {
    return {
      nameAr: q.specific_entity_name_arabic,
      nameEn: q.specific_entity_name_english || q.specific_entity_name_arabic,
      slug: slugify(q.specific_entity_name_english || q.specific_entity_name_arabic),
    };
  }

  return {
    nameAr: 'الْمَفَاهِيمُ وَالْقَضَايَا الْعَامَّةُ',
    nameEn: 'General Concepts & Overview',
    slug: 'general-overview',
  };
}
