import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const yogaSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Yoga (Code 100) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const yogaSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit I: Foundations of Yoga (योग के आधारभूत तत्त्व)',
    topics: [
      {
        name: 'योग का इतिहास, उद्भव एवं विकास',
        subtopics: [
          { name: 'योग की व्युत्पत्ति: युज् समाधौ, युजिर् योगे, युज् संयमने (पाणिनि धातुपाठ)' },
          { name: 'योग की परिभाषाएँ: पातञ्जलयोगसूत्र (योगश्चित्तवृत्तिनिरोधः), श्रीमद्भगवद्गीता (योगः कर्मसु कौशलम्, समत्वं योग उच्यते), योगवासिष्ठ (मनः प्रशमनोपायः योग इत्यभिधीयते)' },
          { name: 'योग के विकास के ऐतिहासिक सोपान: वैदिक काल, उपनिषद् काल, महाकाव्य/स्मृति काल, सूत्र काल, मध्य काल (हठयोग), आधुनिक काल (स्वामी विवेकानन्द, स्वामी शिवानन्द, टी. कृष्णमाचार्य, महर्षि महेश योगी, स्वामी राम, बी.के.एस. अय्यंगार)' },
        ],
      },
      {
        name: 'योग के विविध सम्प्रदाय एवं साधना मार्ग',
        subtopics: [
          { name: 'ज्ञान योग: साधन-चतुष्टय (विवेक, वैराग्य, षट्सम्पत्ति - शम, दम, उपरति, तितिक्षा, श्रद्धा, समाधान, मुमुक्षुत्व), श्रवण, मनन, निदिध्यासन' },
          { name: 'भक्ति योग: नवधा भक्ति (श्रवण, कीर्तन, स्मरण, पादसेवन, अर्चन, वन्दन, दास्य, सख्य, आत्मनिवेदन - श्रीमद्भागवत), परा एवं अपरा भक्ति' },
          { name: 'कर्म योग: निष्काम कर्मयोग, कर्मबन्धन-मुक्ति, यज्ञ-चक्र' },
          { name: 'राज योग एवं हठ योग: बहिरङ्ग एवं अन्तरङ्ग साधना का समन्वय' },
          { name: 'मन्त्र योग, लय योग, कुण्डलिनी योग: नाद, बिन्दु, कला, षट्चक्र' },
        ],
      },
      {
        name: 'योग दर्शन की मूलभूत अवधारणाएँ',
        subtopics: [
          { name: 'पञ्चकोश सिद्धान्त (तैत्तिरीयोपनिषद्): अन्नमय, प्राणमय, मनोमय, विज्ञानमय, आनन्दमय कोश' },
          { name: 'त्रिगुण सिद्धान्त: सत्त्व, रजस्, तमस् का स्वरूप एवं चित्त पर उनका प्रभाव' },
          { name: 'पञ्च प्राण (प्राण, अपान, समान, उदान, व्यान) एवं पञ्च उपप्राण (नाग, कूर्म, कृकल, देवदत्त, धनञ्जय)' },
          { name: 'षट्कर्म, नाड़ी (इड़ा, पिङ्गला, सुषुम्णा), चक्र, ग्रन्थि (ब्रह्म, विष्णु, रुद्र ग्रन्थि) एवं कुण्डलिनी शक्ति' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit II: Principal Upanishads, Bhagavad Gita & Yoga Vasishtha',
    topics: [
      {
        name: 'प्रमुख उपनिषदों में योग सिद्धान्त',
        subtopics: [
          { name: 'ईशावास्योपनिषद्: विद्या-अविद्या, सम्भूति-असम्भूति, तेन त्यक्तेन भुञ्जीथाः' },
          { name: 'कठोपनिषद्: नचिकेता-यम संवाद, श्रेयस् एवं प्रेयस् मार्ग, रथ-रूपक (आत्मानं रथिनं विद्धि)' },
          { name: 'प्रश्नोपनिषद्: षट् ऋषियों के प्रश्न, प्राण एवं रयि, प्राण का उद्भव एवं अधिष्ठान' },
          { name: 'मुण्डकोपनिषद् एवं माण्डूक्योपनिषद्: परा-अपरा विद्या, ओंकार (अ, उ, म, मात्रातीत) एवं चतुरवस्था (जाग्रत्, स्वप्न, सुषुप्ति, तुरीय)' },
          { name: 'तैत्तिरीयोपनिषद् (पञ्चकोश) एवं श्वेताश्वतरोपनिषद् (योगाभ्यास-विधि, स्थान, योगाग्निमय शरीर)' },
        ],
      },
      {
        name: 'श्रीमद्भगवद्गीता में योग दर्शन',
        subtopics: [
          { name: 'गीता का सार एवं प्रमुख योग मार्ग: द्वितीय अध्याय (सांख्य योग, स्थितप्रज्ञ लक्षण), तृतीय अध्याय (कर्म योग, लोकसंग्रह), चतुर्थ अध्याय (ज्ञान-कर्म-संन्यास योग)' },
          { name: 'षष्ठ अध्याय (आत्मसंयम / ध्यान योग: आसन, आहार-विहार, अभ्यास व वैराग्य, युक्ताहारविहारस्य)' },
          { name: 'द्वादश अध्याय (भक्ति योग: भक्त के लक्षण), पञ्चदश अध्याय (पुरुषोत्तम योग: क्षर, अक्षर, पुरुषोत्तम), सप्तदश अध्याय (श्रद्धात्रयविभाग योग: सात्त्विक, राजसिक, तामसिक आहार)' },
        ],
      },
      {
        name: 'योगवासिष्ठ में योग एवं मनःप्रशमन',
        subtopics: [
          { name: 'योगवासिष्ठ की पृष्ठभूमि: वसिष्ठ-राम संवाद, वैराग्य प्रकरण' },
          { name: 'मन का स्वरूप, चित्त-चिकित्सा एवं आधि-व्याधि अवधारणा (आधि = मानसिक कष्ट -> आधिजा व्याधि = मनोदैहिक रोग)' },
          { name: 'मोक्ष के चार द्वारपाल (शम, विचार, सन्तोष, साधुसङ्गम), ज्ञान की सप्त भूमिकाएँ (शुभेच्छा, सुविचारणा, तनुमानसा, सत्त्वापत्ति, असंसक्ति, पदार्थाभावनी, तुर्यगा)' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit III: Patanjala Yoga Sutra (पातञ्जलयोगसूत्र)',
    topics: [
      {
        name: 'समाधि पाद (प्रथम पाद - ५१ सूत्र)',
        subtopics: [
          { name: 'योग-लक्षण: योगश्चित्तवृत्तिनिरोधः, द्रष्टा का स्वरूप (तदा द्रष्टुः स्वरूपेऽवस्थानम्)' },
          { name: 'चित्त की पाँच भूमियाँ: क्षिप्त, मूढ़, विक्षिप्त, एकाग्र, निरुद्ध (व्यास भाष्य)' },
          { name: 'चित्तवृत्तियाँ (क्लिष्ट व अक्लिष्ट): प्रमाण (प्रत्यक्ष, अनुमान, आगम), विपर्यय, विकल्प, निद्रा, स्मृति' },
          { name: 'चित्तवृत्तिनिरोध के उपाय: अभ्यास एवं वैराग्य (अपर वैराग्य vs पर वैराग्य / गुणवैतृष्ण्यम्)' },
          { name: 'सम्प्रज्ञात समाधि (वितर्क, विचार, आनन्द, अस्मितानुगत) एवं असम्प्रज्ञात समाधि (भवप्रत्यय, उपायप्रत्यय - श्रद्धा, वीर्य, स्मृति, समाधि, प्रज्ञा)' },
          { name: 'ईश्वर-प्रणिधान: क्लेशकर्मविपाकाशयैरपरामृष्टः पुरुषविशेष ईश्वरः, तस्य वाचकः प्रणवः' },
          { name: 'चित्त-विक्षेप (९ अन्तराय: व्याधि, स्त्यान, संशय, प्रमाद, आलस्य, अविरति, भ्रान्तिदर्शन, अलब्धभूमिकत्व, अनवस्थितत्व) एवं ५ सहभुवः (दुःख, दौर्मनस्य, अङ्गमेजयत्व, श्वास, प्रश्वास)' },
          { name: 'चित्त-प्रसादन के उपाय: मैत्री-करुणा-मुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम्, प्राणायाम, ज्योतिष्मती प्रवृत्ति' },
          { name: 'समापत्ति के भेद: सवितर्का, निर्वितर्का, सविचारा, निर्विचारा, सास्मिता, सानन्दा, निर्बीज समाधि, ऋतम्भरा तत्र प्रज्ञा' },
        ],
      },
      {
        name: 'साधन पाद (द्वितीय पाद - ५५ सूत्र)',
        subtopics: [
          { name: 'क्रियायोग: तपः स्वाध्यायेश्वरप्रणिधानानि क्रियायोगः (क्लेश-तनुकरण एवं समाधि-भावनार्थ)' },
          { name: 'पञ्च क्लेश: अविद्या (क्षेत्रमुत्तरेषाम् - अनित्याशुचिदुःखानात्मसु नित्यशुचिसुखात्मख्यातिरविद्या), अस्मिता, राग, द्वेष, अभिनिवेश' },
          { name: 'कर्मविपाक: कर्माशय, दृष्टादृष्टजन्मवेदनीयः, क्लेशमूलक जात्यायुर्भोगाः' },
          { name: 'चतुर्व्यूहवाद: हेय (दुःखमनागतम्), हेतु (द्रष्टा-दृश्ययोः संयोगः), हान (विवेकख्याति), हानोपाय (अष्टाङ्गयोग)' },
          { name: 'अष्टाङ्गयोग (बहिरङ्ग साधना): यम (अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य, अपरिग्रह - सार्वभौम महाव्रत), नियम (शौच, सन्तोष, तप, स्वाध्याय, ईश्वरप्रणिधान)' },
          { name: 'आसन (स्थिरसुखमासनम्, प्रयत्नशैथिल्यानन्तसमापत्तिभ्याम्, ततो द्वन्द्वानभिघातः), प्राणायाम (तस्मिन् सति श्वासप्रश्वासयोर्गतिविच्छेदः प्राणायामः - बाह्य, आभ्यन्तर, स्तम्भवृत्ति, चतुर्थ), प्रत्याहार' },
        ],
      },
      {
        name: 'विभूति पाद एवं कैवल्य पाद (तृतीय व चतुर्थ पाद)',
        subtopics: [
          { name: 'अन्तरङ्ग साधना: धारणा (देशबन्धश्चित्तस्य धारणा), ध्यान (तत्र प्रत्ययैकतानता ध्यानम्), समाधि (तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः)' },
          { name: 'संयम: त्रयमेकत्र संयमः, संयम के परिणाम (धर्म, लक्षण, अवस्था परिणाम)' },
          { name: 'विभूतियाँ (सिद्धियाँ) एवं उनका प्रतिषेध (ते समाधावुपसर्गा व्युत्थाने सिद्धयः)' },
          { name: 'कैवल्य पाद: पञ्चविध सिद्धियाँ (जन्मौषधिमन्त्रतपःसमाधिजाः सिद्धयः), निर्माण चित्त, चतुर्विध कर्म (शुक्ल, कृष्ण, शुक्ल-कृष्ण, अशुक्लाकृष्ण)' },
          { name: 'धर्ममेघ समाधि एवं कैवल्य-स्वरूप (पुरुषार्थशून्यानां गुणानां प्रतिप्रसवः कैवल्यम् स्वरूपप्रतिष्ठा वा चितिशक्तिरिति)' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit IV: Hatha Yoga Texts (हठयोग के प्रमुख ग्रन्थ)',
    topics: [
      {
        name: 'हठयोगप्रदीपिका (स्वात्माराम विरचित)',
        subtopics: [
          { name: 'हठयोग का प्रयोजन: केवलं राजयोगाय हठविद्योपदिश्यते, हठप्रदीपिका की परम्परा (आदिनाथ से स्वात्माराम)' },
          { name: 'साधक एवं बाधक तत्त्व: बाधक (अत्याहारः प्रयासश्च प्रजल्पो नियमाग्रहः जनसङ्गश्च लौल्यं च), साधक (उत्साहात् साहसाद् धैर्यात् तत्त्वज्ञानाच्च निश्चयात् जनसङ्गपरित्यागात्)' },
          { name: 'प्रथम उपदेश (आसन): १५ आसनों का वर्णन (स्वस्तिक, गोमुख, वीर, कूर्म, कुक्कुट, उत्तानकूर्म, धनुर्, मत्स्य, पश्चिमोत्तान, मयूर, शव, सिद्धासन, पद्मासन, सिंहासन, भद्रासन - चार प्रमुख आसन), मिताहार (सुस्निग्धमधुराहारः)' },
          { name: 'द्वितीय उपदेश (षट्कर्म एवं प्राणायाम): षट्कर्म (धौति - वस्त्रधौति, बस्ति - जल/शुष्क, नेति - सूत्र/जल, त्राटक, नौलि - मध्य/वाम/दक्षिण, कपालभाति - वातक्रम/व्युत्क्रम/शीत्क्रम)' },
          { name: 'अष्टकुम्भक: सूर्यभेदन, उज्जायी, सीत्कारी, शीतली, भस्त्रिका, भ्रामरी, मूर्च्छा, प्लाविनी (सहित व केवल कुम्भक)' },
          { name: 'तृतीय उपदेश (मुद्रा एवं बन्ध): १० मुद्राएँ (महामुद्रा, महाबन्ध, महावेध, खेचरी, उड्डीयान, मूलबन्ध, जालन्धरबन्ध, विपरीतकरणी, वज्रोली, शक्तिचालिनी)' },
          { name: 'चतुर्थ उपदेश (नादानुसन्धान एवं समाधि): नादानुसन्धान की चार अवस्थाएँ (आरम्भावस्था - ब्रह्मग्रन्थिभेद, घटावस्था - विष्णुग्रन्थिभेद, परिचयावस्था, निष्पत्यवस्था - रुद्रग्रन्थिभेद)' },
        ],
      },
      {
        name: 'घेरण्डसंहिता (महर्षि घेरण्ड - चण्डकापालि संवाद)',
        subtopics: [
          { name: 'सप्ताङ्ग योग: शोधनं षट्कर्मभिः, दृढता आसनेन, स्थैर्यं मुद्रया, धैर्यं प्रत्याहारेण, लाघवं प्राणायामेन, प्रत्यक्षं ध्यानेन, निर्लिप्तं समाधिना' },
          { name: 'षट्कर्म विवरण: धौति (अन्तर्धौति, दन्तधौति, हृद्धौति, मूलशोधन), बस्ति, नेति, लाउलिकी (नौलि), त्राटक, भालभाति' },
          { name: '३२ आसन, २५ मुद्राएँ (पञ्च धारणा: पार्थिवी, आम्भसी, आग्नेयी, वायवी, आकाशी धारणा)' },
          { name: 'प्रत्याहार, प्राणायाम (सहित, सूर्यभेद, उज्जायी, शीतली, भस्त्रिका, भ्रामरी, मूर्च्छा, केवली), त्रिविध ध्यान (स्थूल, ज्योतिर्मय, सूक्ष्म ध्यान), षड्विध समाधि' },
        ],
      },
      {
        name: 'शिवसंहिता, सिद्धसिद्धान्तपद्धति एवं हठरत्नावली',
        subtopics: [
          { name: 'शिवसंहिता: पञ्च पटल (सृष्टि-क्रम, नाड़ी-ज्ञान - ३,५०,००० नाड़ियाँ, १४ मुख्य, ३ प्रधान, प्राणायाम, चार साधक, ४ आसन, ११ मुद्राएँ, राजयोग साधना)' },
          { name: 'सिद्धसिद्धान्तपद्धति (गोरखनाथ): पिण्डोत्पत्ति, पिण्डविचार, पिण्डसंवित्ति, पिण्डपदसमरस, अवधूत योगी लक्षण' },
          { name: 'हठरत्नावली (श्रीनिवास भट्ट): अष्टकर्म (षट्कर्म + चक्री, गजकरणी), ८४ आसन' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit V: Allied Sciences (Anatomy, Physiology & Psychology)',
    topics: [
      {
        name: 'Human Anatomy and Musculo-Skeletal / Respiratory Systems',
        subtopics: [
          { name: 'Cell, Tissue, Organ systems overview, Homeostasis' },
          { name: 'Skeletal & Muscular System: Bones, Joints (Synovial joints), Types of Muscle Contraction (Isometric, Isotonic, Eccentric), Yogic Asanas and Joint biomechanics' },
          { name: 'Respiratory System: Upper & Lower Respiratory Tract, Mechanics of Breathing (Diaphragmatic vs Thoracic breathing), Lung Volumes and Capacities (Tidal Volume, Vital Capacity, Residual Volume), Physiological effects of Pranayama (Hyperventilation, Hypoventilation, CO2 tolerance)' },
        ],
      },
      {
        name: 'Cardiovascular, Nervous and Endocrine Systems in Yoga',
        subtopics: [
          { name: 'Cardiovascular System: Heart anatomy, Cardiac Cycle, Blood Pressure regulation, Heart Rate Variability (HRV), Hemodynamic changes during Asana and Inversions' },
          { name: 'Nervous System: Brain lobes, Autonomic Nervous System (Sympathetic vs Parasympathetic balance), Vagus Nerve stimulation, Alpha/Theta Brainwaves during Meditation and Yoga Nidra' },
          { name: 'Endocrine System: Hypothalamic-Pituitary-Adrenal (HPA) Axis, Pineal Gland (Melatonin), Thyroid, Adrenal glands (Cortisol, Epinephrine regulation through Yoga)' },
        ],
      },
      {
        name: 'Digestive, Excretory and Immune Systems',
        subtopics: [
          { name: 'Digestive System (GI Tract): Digestion and Absorption, Gut Microbiome, Agni in Ayurveda vs Gastric enzymes, Impact of Shatkarmas (Kunjal, Nauli) and Asanas on digestion' },
          { name: 'Excretory System: Kidneys, Nephron physiology, Skin, Elimination of metabolic wastes' },
          { name: 'Immune System: Innate vs Adaptive Immunity, Lymphatic system, Psychoneuroimmunology and Yoga' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit VI: Yoga and Health (Diet, Lifestyle & Ayurveda)',
    topics: [
      {
        name: 'Concepts of Health, Wellness and Yogic Diet (Mitahara)',
        subtopics: [
          { name: 'Definition of Health (WHO vs Yogic concept: Swastha - स्वस्मिन् तिष्ठतीति स्वस्थः)' },
          { name: 'Concept of Mitahara (हठयोगप्रदीपिका एवं भगवद्गीता): सुस्निग्ध, मधुर, १/२ भाग अन्न, १/४ भाग जल, १/४ भाग वायु हेतु रिक्त' },
          { name: 'Classification of Foods: सात्त्विक, राजसिक, तामसिक आहार (भगवद्गीता १७.८-१०) एवं आधुनिक पोषण (Macronutrients & Micronutrients)' },
        ],
      },
      {
        name: 'Ayurvedic Principles and Lifestyle Integration',
        subtopics: [
          { name: 'Fundamental Concepts: पञ्चमहाभूत (आकाश, वायु, अग्नि, जल, पृथ्वी), त्रिदोष (वात, पित्त, कफ - प्रकृति निर्धारण)' },
          { name: 'सप्त धातु (रस, रक्त, मांस, मेद, अस्थि, मज्जा, शुक्र), त्रिमल (पुरीष, मूत्र, स्वेद), त्रयोदश अग्नि (जाठराग्नि, भूताग्नि, धात्वाग्नि)' },
          { name: 'दिनचर्या, रात्रिचर्या, ऋतुचर्या (षड् ऋतुएँ), सद्वृत्त (सदाचार) एवं स्वास्थ्य संरक्षण' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit VII: Therapeutic Yoga & Clinical Applications',
    topics: [
      {
        name: 'Yogic Management of Non-Communicable & Metabolic Disorders',
        subtopics: [
          { name: 'Yogic Concept of Disease: आधिजा व्याधि (Samanya vs Sarada) and अनाधिजा व्याधि (Infections/Injuries)' },
          { name: 'Metabolic & Endocrine Disorders: Diabetes Mellitus (Type 2 - Pancreatic stimulation, Asanas like Mandukasana, Ardhamatsyendrasana), Obesity (Metabolic syndrome), Thyroid dysfunctions (Sarvangasana, Ujjayi, Matsyasana)' },
          { name: 'Cardiovascular Disorders: Hypertension (Shavasana, Nadi Shodhana, Sheetali), Coronary Artery Disease (Dean Ornish Lifestyle Heart Trial)' },
        ],
      },
      {
        name: 'Yogic Management of Respiratory, Musculoskeletal & Psychological Disorders',
        subtopics: [
          { name: 'Respiratory Disorders: Bronchial Asthma, Allergic Rhinitis, Chronic Sinusitis, COPD (Jala Neti, Kunjal Kriya, Bhastrika, Kapalabhati protocols)' },
          { name: 'Musculoskeletal Disorders: Chronic Low Back Pain (Lumbar Spondylosis, Sciatica), Cervical Spondylosis, Osteoarthritis, Rheumatoid Arthritis' },
          { name: 'Psychological & Psychosomatic Disorders: Anxiety Disorders, Depression, Insomnia, Migraine (Yoga Nidra, Cyclic Meditation, Trataka, Om Chanting, MSRT)' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit VIII: Applications of Yoga in Various Fields',
    topics: [
      {
        name: 'Yoga in Education, Sports, Stress Management and Geriatrics',
        subtopics: [
          { name: 'Yoga for Children & School Education: Enhancing Memory, Concentration, Physical Fitness, Value Education' },
          { name: 'Yoga in Sports: Flexibility, Core Strength, Injury Prevention, Mental Endurance, Eye-Hand Coordination' },
          { name: 'Yoga for Stress Management & Corporate Wellness: Desk Yoga, Burnout Prevention, Work-Life Balance' },
          { name: 'Yoga for Special Populations: Geriatric Care (Chair Yoga, Joint mobility, Fall prevention), Women’s Health (Prenatal and Postnatal Yoga, Menstrual health, Menopause)' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit IX: Practical Yoga: Asana, Pranayama, Kriya & Meditation',
    topics: [
      {
        name: 'Shatkarmas and Sukshma / Sthula Vyayama',
        subtopics: [
          { name: 'Sukshma Vyayama (Swami Dhirendra Brahmachari - 48 exercises from Prarthana to Padanguli Shakti Vikasaka) and Sthula Vyayama (Hrid Gati, Sarvanga Pushti)' },
          { name: 'Suryanamaskara: 12 Postures with 12 Sun Mantras and Bija Mantras' },
          { name: 'Shatkarmas: Neti (Jala, Sutra), Dhauti (Vamana/Kunjal, Vastra), Nauli (Madhyama, Vama, Dakshina), Basti, Trataka, Kapalabhati (Vatakrama)' },
        ],
      },
      {
        name: 'Asanas: Standing, Sitting, Prone and Supine',
        subtopics: [
          { name: 'Standing Asanas: Tadasana, Vrikshasana, Trikonasana, Parshvakonasana, Padahastasana, Garudasana' },
          { name: 'Sitting Asanas: Siddhasana, Padmasana, Vajrasana, Paschimottanasana, Gomukhasana, Ardhamatsyendrasana, Baddhakonasana' },
          { name: 'Prone Asanas: Bhujangasana, Shalabhasana, Dhanurasana, Makarasana' },
          { name: 'Supine & Inverted Asanas: Sarvangasana, Halasana, Matsyasana, Chakrasana, Sirshasana, Shavasana' },
        ],
      },
      {
        name: 'Pranayamas, Bandhas, Mudras and Meditation Practices',
        subtopics: [
          { name: 'Pranayama Practices: Nadi Shodhana (Anuloma-Viloma with Kumbhaka and Bandhas), Suryabhedana, Ujjayi, Bhastrika, Bhramari, Sheetali, Sitkari' },
          { name: 'Bandhas: Jalandhara Bandha, Uddiyana Bandha, Mula Bandha, Maha Bandha' },
          { name: 'Mudras: Chin, Jnana, Brahma, Viparitakarani, Ashwini, Kaki Mudra' },
          { name: 'Meditation & Relaxation: Yoga Nidra (Swami Satyananda Saraswati), Antar Mouna, Vipassana, Transcendental Meditation, So-Ham Meditation, Omkara Dhyana' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit X: Research Methodology in Yoga',
    topics: [
      {
        name: 'Scientific Research Methodology in Yogic Sciences',
        subtopics: [
          { name: 'Introduction to Scientific Research in Yoga: Evidence-Based Yoga, Integrative Medicine' },
          { name: 'Research Designs: Randomized Controlled Trials (RCT - Gold Standard), Pre-Post Single Group Designs, Waitlist Control, Placebo/Sham Yoga Controls' },
          { name: 'Physiological and Psychophysiological Measurement Tools: Polygraph, ECG/HRV, EEG (Brain mapping), Galvanic Skin Response (GSR), Spirometry (Pulmonary function), Biochemical Markers (Serum Cortisol, BDNF, Inflammatory Cytokines IL-6, TNF-alpha)' },
          { name: 'Standardized Psychological Scales in Yoga Research, Statistical Analysis, and Ethics in Clinical Yoga Trials' },
        ],
      },
    ],
  },
];
