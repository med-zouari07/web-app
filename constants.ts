
import { Campaign } from './types';

export const LOGO_URL = "https://i.ibb.co/C3X9f3t/logo-abvos.png"; // Placeholder for the provided logo image

export const CONTACT_INFO = {
  address: {
    en: "Ouled Berhil – Grand Mosque Street, Ouled Abbou, Taroudant Province",
    fr: "Ouled Berhil – Rue de la Grande Mosquée, Ouled Abbou, Province de Taroudant",
    ar: "أولاد برحيل – شارع المسجد الكبير، أولاد عبو، إقليم تارودانت"
  },
  phone: "0546051494",
  mobile: "0666932107",
  email: "associationbonvoisinage@gmail.com"
};

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'abvos1',
    title: {
      en: 'Ramadan Solidarity Baskets',
      fr: 'Paniers de Solidarité Ramadan',
      ar: 'قفة التضامن لرمضان'
    },
    description: {
      en: 'Distribution of essential food items to vulnerable families in Ouled Berhil.',
      fr: 'Distribution de denrées alimentaires de base aux familles vulnérables d\'Ouled Berhil.',
      ar: 'توزيع المواد الغذائية الأساسية على الأسر المعوزة في أولاد برحيل.'
    },
    category: 'Social',
    goal: 50000,
    raised: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    donorsCount: 84
  },
  {
    id: 'abvos2',
    title: {
      en: 'Education Support: School Kits',
      fr: 'Soutien Scolaire : Cartables et Fournitures',
      ar: 'دعم التمدرس: محافظ وأدوات مدرسية'
    },
    description: {
      en: 'Providing school supplies and bags for orphans and needy students in the Taroudant region.',
      fr: 'Fourniture de cartables et d\'outils scolaires pour les orphelins et élèves nécessiteux de la région de Taroudant.',
      ar: 'توفير الأدوات المدرسية والمحافظ للأيتام والتلاميذ المحتاجين في منطقة تارودانت.'
    },
    category: 'Education',
    goal: 30000,
    raised: 28000,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    donorsCount: 156
  },
  {
    id: 'abvos3',
    title: {
      en: 'Water Access: Well Drilling',
      fr: 'Accès à l\'Eau : Forage de Puits',
      ar: 'توفير الماء: حفر الآبار'
    },
    description: {
      en: 'Improving access to drinking water in remote rural villages of Taroudant.',
      fr: 'Améliorer l\'accès à l\'eau potable dans les douars reculés du milieu rural de Taroudant.',
      ar: 'تحسين الولوج للماء الصالح للشرب في الدواوير النائية بإقليم تارودانت.'
    },
    category: 'Eco',
    goal: 100000,
    raised: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    donorsCount: 210
  }
];

export const TRANSLATIONS = {
  en: {
    orgName: "A.B.V.O.S.",
    orgFullName: "Association Bon Voisinage des Oeuvres Sociales",
    heroTitle: "Build a Better Future Through Solidarity.",
    heroSub: "A.B.V.O.S. in Ouled Berhil promotes cooperation, charity, and social excellence to serve the community in Taroudant.",
    aboutText: "The Association Bon Voisinage des Oeuvres Sociales (A.B.V.O.S.) in Ouled Berhil, Taroudant province, is a civil framework that draws from values of charity, credibility, initiative, and excellence, and seeks to stimulate the spirit of cooperation and solidarity between various components of society in order to build a better tomorrow.",
    navDiscover: "Home",
    navWork: "Our Missions",
    navJoin: "Contact",
    btnDonate: "Donate Now",
    btnExplore: "Discover Projects",
    categoryAll: "All Causes",
    searchPlaceholder: "Search for a mission...",
    thankYou: "May God reward your generosity!",
    impactTitle: "Your Local Impact",
    processing: "Connecting to CMI Gateway...",
    formName: "Full Name",
    formEmail: "Email Address",
    secure: "CMI / Attijariwafa bank Secure Gateway",
    addressTitle: "Address",
    contactTitle: "Contact Us",
    followUs: "Follow Our Missions"
  },
  fr: {
    orgName: "A.B.V.O.S.",
    orgFullName: "Association Bon Voisinage des Oeuvres Sociales",
    heroTitle: "Bâtir un avenir meilleur par la solidarité.",
    heroSub: "L'A.B.V.O.S. à Ouled Berhil promeut la coopération, l'entraide et l'excellence sociale au service de Taroudant.",
    aboutText: "L'Association Bon Voisinage des Oeuvres Sociales (A.B.V.O.S.) à Ouled Berhil, province de Taroudant, est un cadre civil qui puise dans les valeurs de bienfaisance, de crédibilité et d'initiative, et cherche à stimuler l'esprit de coopération et de solidarité entre les différentes composantes de la société.",
    navDiscover: "Accueil",
    navWork: "Nos Missions",
    navJoin: "Contact",
    btnDonate: "Faire un Don",
    btnExplore: "Découvrir les Missions",
    categoryAll: "Toutes les Causes",
    searchPlaceholder: "Chercher une mission...",
    thankYou: "Que Dieu récompense votre générosité !",
    impactTitle: "Votre Impact Local",
    processing: "Connexion au portail CMI...",
    formName: "Nom Complet",
    formEmail: "Adresse Email",
    secure: "Portail Sécurisé CMI / Attijariwafa bank",
    addressTitle: "Adresse",
    contactTitle: "Contactez-nous",
    followUs: "Suivez nos Actions"
  },
  ar: {
    orgName: "جمعية حسن الجوار",
    orgFullName: "جمعية حسن الجوار للأعمال الاجتماعية",
    heroTitle: "بناء غد أفضل بروح التضامن.",
    heroSub: "جمعية حسن الجوار للأعمال الاجتماعية بأولاد برحيل تهدف لإذكاء روح التعاون والتميز لخدمة المجتمع.",
    aboutText: "جمعية حسن الجوار للأعمال الاجتماعية بأولاد برحيل، إقليم تارودانت، هي إطار مدني ينهل من قيم الإحسان والمصداقية وروح المبادرة والتميز، ويسعى إلى إذكاء روح التعاون والتضامن بين مختلف مكونات المجتمع من أجل بناء غد أفضل.",
    navDiscover: "الرئيسية",
    navWork: "مهامنا",
    navJoin: "اتصل بنا",
    btnDonate: "تبرع الآن",
    btnExplore: "استكشف المشاريع",
    categoryAll: "كل القضايا",
    searchPlaceholder: "ابحث عن مهمة...",
    thankYou: "جزاكم الله خيراً على كرمكم!",
    impactTitle: "تأثيرك المحلي",
    processing: "جاري الاتصال ببوابة CMI...",
    formName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    secure: "بوابة آمنة - CMI / التجاري وفا بنك",
    addressTitle: "العنوان",
    contactTitle: "اتصل بنا",
    followUs: "تابع مهامنا"
  }
};
