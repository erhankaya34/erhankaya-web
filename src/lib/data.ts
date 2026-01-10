export const personalInfo = {
  name: "Mustafa Erhan Kaya",
  displayName: "Erhan Kaya",
  title: "Software Engineer",
  tagline: {
    en: "Software Engineer & Community Builder",
    tr: "Yazılım Mühendisi & Topluluk Kurucusu"
  },
  location: "Istanbul, Turkey",
  email: "erhankaya3470@gmail.com",
  github: "erhankaya34",
  linkedin: "erhankaya34",

  bio: {
    en: `I’m a young, passionate software engineer without flashy titles or exaggerated skills, who genuinely enjoys creating things and turning ideas into experiences people can use; I love indie games and hope to step into that world one day with my own game, I get a lot of joy from building communities, bringing people together, and creating a sense of culture, just as much as I do from cooking, and for the record, I’m a huge fan of J.R.R. Tolkien and dragons.`,
    tr: `Abartılı yetenekleri ya da havalı title'ları olmayan tutkulu ve genç bir yazılım mühendisiyim. Tasarladığım deneyimleri insanlara sunmaktan ve bir şeyler üretmekten çok keyif alıyorum. Bağımsız oyunlara bayılıyorum ve bir gün ben de kendi oyunumla bu dünyaya dahil olmayı çok istiyorum. Topluluklar kurmak, insanları bir araya getirmek ve bir kültür yaratmak çok keyif aldığım konulardan biri. Bir diğeri de yemek yapmak. Unutmadan J.R.R Tolkien’i ve ejderhaları (farkettiğiniz üzere) çok severim.`
  },

  shortBio: {
    en: "Bugs? On purpose.",
    tr: "Bugs? On purpose."
  },

  highlights: {
    en: [
      "Developer of Pyralis",
      "Co-founder of IGDA Istanbul",
      "Led Turkey's largest game dev community ÜNOG",
      "Built communities of 1000+ members"
    ],
    tr: [
      "Pyralis'in geliştiricisi",
      "IGDA İstanbul kurucu ortağı",
      "Türkiye'nin en büyük oyun geliştirici topluluğu ÜNOG'u yönettim",
      "1000+ üyeli topluluklar kurdu"
    ]
  },

  currentRole: {
    en: "Junior IT Specialist at Halkbank",
    tr: "Halkbank'ta Junior IT Uzmanı"
  }
};

export interface Project {
  id: string;
  name: string;
  description: {
    en: string;
    tr: string;
  };
  role: {
    en: string;
    tr: string;
  };
  url: string;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'pyralis',
    name: 'Pyralis',
    description: {
      en: 'A mobile app that unifies your gaming profile across Steam, PlayStation, and other platforms. Track your lifetime stats, discover games through friends, and build your gaming identity.',
      tr: 'Steam, PlayStation ve diğer platformlardaki oyun profillerinizi birleştiren bir mobil uygulama. Tüm istatistiklerinizi takip edin, arkadaşlarınız aracılığıyla oyunlar keşfedin.'
    },
    role: {
      en: 'Creator & Developer',
      tr: 'Yaratıcı & Geliştirici'
    },
    url: 'https://pyralis.app',
    tags: ['Flutter', 'Mobile', 'Gaming'],
    featured: true
  },
  {
    id: 'igda-istanbul',
    name: 'IGDA Istanbul',
    description: {
      en: 'The official Istanbul chapter of the International Game Developers Association. Building bridges between local developers and the global gaming community.',
      tr: 'Uluslararası Oyun Geliştiricileri Derneği\'nin resmi İstanbul şubesi. Yerel geliştiriciler ile global oyun topluluğu arasında köprü kuruyoruz.'
    },
    role: {
      en: 'Co-founder & Co-Chair',
      tr: 'Kurucu Ortak & Eş Başkan'
    },
    url: 'https://igdaistanbul.org',
    tags: ['Community', 'Game Dev', 'Networking'],
    featured: true
  },
  {
    id: 'pelinakin',
    name: 'pelinakin.art',
    description: {
      en: 'Portfolio website for Pelin Akın, a photographer and illustrator based in Istanbul. Showcasing extraordinary perspectives and bold colors.',
      tr: 'İstanbul\'da yaşayan fotoğrafçı ve illüstratör Pelin Akın için portfolio sitesi. Sıra dışı bakış açıları ve cesur renkler.'
    },
    role: {
      en: 'Web Developer',
      tr: 'Web Geliştirici'
    },
    url: 'https://pelinakin.art',
    tags: ['Next.js', 'Portfolio', 'Photography'],
    featured: true
  },
  {
    id: 'volkankilinc',
    name: 'volkankilinc.works',
    description: {
      en: 'Portfolio for Volkan Kılınç, a narrative designer and researcher. Exploring the intersection of stories, identities, and imagination in games.',
      tr: 'Anlatı tasarımcısı ve araştırmacı Volkan Kılınç için portfolio. Oyunlarda hikayeler, kimlikler ve hayal gücünün kesişimi.'
    },
    role: {
      en: 'Web Developer',
      tr: 'Web Geliştirici'
    },
    url: 'https://volkankilinc.works',
    tags: ['Next.js', 'Portfolio', 'Game Design'],
    featured: true
  }
];

export interface Experience {
  id: string;
  company: string;
  role: {
    en: string;
    tr: string;
  };
  type: 'work' | 'community' | 'education';
  period: {
    start: string;
    end: string | null;
  };
  location?: string;
  description: {
    en: string;
    tr: string;
  };
  skills?: string[];
  current: boolean;
}

export const experiences: Experience[] = [
  {
    id: 'halkbank',
    company: 'Halkbank',
    role: {
      en: 'Junior IT Specialist',
      tr: 'Junior IT Uzmanı'
    },
    type: 'work',
    period: { start: 'Aug 2024', end: null },
    location: 'Istanbul, Turkey',
    description: {
      en: 'Ruby automation development, CI/CD pipeline design, Azure DevOps integrations. Previously served as Junior IT Associate and Intern.',
      tr: 'Ruby otomasyon geliştirme, CI/CD pipeline tasarımı, Azure DevOps entegrasyonları. Daha önce Junior IT Associate ve Stajyer olarak görev yaptım.'
    },
    skills: ['Ruby', 'CI/CD', 'Azure DevOps'],
    current: true
  },
  {
    id: 'igda',
    company: 'IGDA Istanbul',
    role: {
      en: 'Co-Founder & Co-Chair',
      tr: 'Kurucu Ortak & Eş Başkan'
    },
    type: 'community',
    period: { start: 'Jul 2025', end: null },
    location: 'Istanbul, Turkey',
    description: {
      en: 'Establishing the Istanbul chapter of the International Game Developers Association, connecting local developers to the global network.',
      tr: 'Uluslararası Oyun Geliştiricileri Derneği İstanbul şubesini kuruyorum, yerel geliştiricileri global ağa bağlıyorum.'
    },
    current: true
  },
  {
    id: 'unog',
    company: 'ÜNOG',
    role: {
      en: 'Director',
      tr: 'Direktör'
    },
    type: 'community',
    period: { start: 'May 2023', end: 'Aug 2025' },
    location: 'Turkey',
    description: {
      en: "Led Turkey's largest game developer community. Organized Global Game Jam 2024 Istanbul, coordinated sponsors, venues, and staff.",
      tr: "Türkiye'nin en büyük oyun geliştirici topluluğunu yönettim. Global Game Jam 2024 İstanbul'u organize ettim."
    },
    current: false
  },
  {
    id: 'graylake',
    company: 'Gray Lake Studios',
    role: {
      en: 'Game Developer Intern',
      tr: 'Oyun Geliştirici Stajyer'
    },
    type: 'work',
    period: { start: 'Apr 2024', end: 'Jun 2024' },
    location: 'Utrecht, Netherlands (Remote)',
    description: {
      en: 'International game development experience with a Dutch studio. Unity development and remote collaboration.',
      tr: 'Hollandalı bir stüdyo ile uluslararası oyun geliştirme deneyimi. Unity geliştirme ve uzaktan işbirliği.'
    },
    skills: ['Unity', 'C#'],
    current: false
  },
  {
    id: 'bugzone',
    company: 'BUG Zone',
    role: {
      en: 'Founding Board Member & VP',
      tr: 'Kurucu Yönetim Kurulu Üyesi & Başkan Yrd.'
    },
    type: 'community',
    period: { start: 'Jul 2023', end: 'May 2024' },
    location: 'Istanbul, Turkey',
    description: {
      en: "Founded BAU's first game development club. Grew the community to 1000+ members.",
      tr: "BAU'nun ilk oyun geliştirme kulübünü kurdum. Topluluğu 1000+ üyeye ulaştırdım."
    },
    current: false
  },
  ];

export const navItems = [
  { id: 'hero', label: { en: 'Home', tr: 'Ana Sayfa' } },
  { id: 'about', label: { en: 'About', tr: 'Hakkımda' } },
  { id: 'projects', label: { en: 'Projects', tr: 'Projeler' } },
  { id: 'experience', label: { en: 'Experience', tr: 'Deneyim' } },
  { id: 'contact', label: { en: 'Contact', tr: 'İletişim' } },
];

export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/erhankaya34',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/erhankaya34',
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:erhankaya3470@gmail.com',
  },
];
