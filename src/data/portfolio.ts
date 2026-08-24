export const SUPABASE_STORAGE_BASE =
  "https://hfsjztcdyxmnuuufsdzi.supabase.co/storage/v1/object/public/ismail-portfolio";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryAr: string;
  description: string;
  client: string;
  year: string;
  image: string;
  tags: string[];
}

export interface CategoryPortfolio {
  key: string;
  title: string;
  titleAr: string;
  tagline: string;
  desc: string;
  message: string;
  icon: string;
  pdfAttachment?: string;
  images: string[];
}

export const ISMAIL_DATA = {
  personal: {
    name: "Ismail Mohamed",
    shortName: "Ismail Mohamed",
    nameAr: "إسماعيل محمد",
    cvFullName: "Esmail Mohammed Abdeldaim",
    heroImage: `${SUPABASE_STORAGE_BASE}/ismail_hero.jpg`,
    avatar: `${SUPABASE_STORAGE_BASE}/ismail_hero.jpg`,
    cvUrl: `${SUPABASE_STORAGE_BASE}/cv.pdf`,
    jobTitle: "Senior Graphic Designer | Multimedia & Creative Designer | Video Editor",
    secondaryTitle: "Digital Marketing Specialist • Founder & Creative Director",
    agency: "Retina Creative Agency",
    agencyRole: "Founder & Creative Director",
    teamSize: "20-Member Team",
    experienceYears: "8+",
    completedProjects: "800+ Clients",
    happyClients: "800+",
    location: "Gharbia, Egypt",
    locationAr: "الغربية، مصر",
    phone: "01009341107",
    intlPhone: "+201009341107",
    whatsapp: "https://wa.me/201009341107",
    email: "esmailepoo1236@gmail.com",
    behance: "https://www.behance.net/esmailmohamed2",
    linkedin: "https://www.linkedin.com/in/esmail-mohammed-a9486942b",
    dribbble: "https://dribbble.com/EsmailMohammed46",
    instagram: "https://www.instagram.com/esmailmohammed_x/",
    rotatingMotto: "LET'S CREATE SOMETHING GREAT • LET'S CREATE SOMETHING GREAT •",
    shortMotto: "LET'S CREATE SOMETHING GREAT",
    
    // Profile from CV
    bio: "Multidisciplinary creative professional with 8+ years of experience across graphic design, branding, visual identity, motion graphics, video editing, audio production, and digital marketing. Worked with approximately 800+ clients and progressed from independent freelance work to founding Retina Creative Agency in 2026, where he currently leads a 20-member creative team.",
    medicalBio: "Fourth-year medical student at Tanta University — Faculty of Medicine (M.B.B.Ch. Candidate, Expected 2029), bringing a distinctive blend of scientific thinking, anatomical precision, creativity, and visual communication.",
    education: {
      university: "Tanta University — Faculty of Medicine",
      universityAr: "جامعة طنطا — كلية الطب البشري",
      degree: "Bachelor of Medicine and Surgery (M.B.B.Ch.) Candidate",
      degreeAr: "بكالوريوس الطب والجراحة",
      year: "Fourth Year | 2023 – Expected 2029",
      notes: "Current medical education alongside a professional creative career, combining scientific reasoning with visual communication and creative problem-solving."
    }
  },

  // Experience from CV
  experience: [
    {
      period: "2026 – Present",
      role: "Founder & Creative Director",
      company: "Retina Creative Agency",
      description: "Founded and currently lead a multidisciplinary creative agency with a 20-member team. Direct creative strategy, branding, visual identity, multimedia production, and digital content projects. Oversee client relationships, project planning, creative workflows, quality control, and final delivery."
    },
    {
      period: "2023 – 2026",
      role: "Graphic Designer / Creative Designer",
      company: "Art Work",
      description: "Created branding, social media content, advertising materials, digital campaigns, and marketing visuals. Developed creative concepts and production-ready assets for digital and print applications using advanced typography and photo manipulation."
    },
    {
      period: "2018 – 2023",
      role: "Freelance Graphic Designer & Multimedia Creator",
      company: "Self-Employed",
      description: "Delivered graphic design, branding, social media design, video editing, motion graphics, audio, and digital marketing services directly to clients. Built 800+ client relationships from briefing to final production."
    }
  ],

  // Real Service Categories & Galleries from Supabase Storage CDN
  categories: [
    {
      key: "branding-identity",
      title: "Branding & Identity",
      titleAr: "تصميم وبناء الهويات البصرية والشعارات",
      tagline: "High-impact visual identity systems, vector marks, and brand guidelines.",
      desc: "هويات بصرية كاملة، تصميم شعارات دقيقة هندسياً، أدلة استخدام العلامة التجارية، وتطبيقات المطبوعات والتغليف الفاخرة.",
      message: "مرحباً إسماعيل، أنا مهتم بخدمة تصميم الهوية البصرية والشعارات (Branding & Identity) وأود مناقشة تفاصيل مشروع معكم.",
      icon: "Layers",
      pdfAttachment: `${SUPABASE_STORAGE_BASE}/branding-identity/Logo%20Design%20Process.pdf`,
      images: [
        `${SUPABASE_STORAGE_BASE}/branding-identity/cover.jpg`,
        `${SUPABASE_STORAGE_BASE}/branding-identity/identity-showcase.jpg`,
        `${SUPABASE_STORAGE_BASE}/branding-identity/8.jpg`,
        `${SUPABASE_STORAGE_BASE}/branding-identity/456.jpg`,
        `${SUPABASE_STORAGE_BASE}/branding-identity/54615.jpg`,
        `${SUPABASE_STORAGE_BASE}/branding-identity/556.jpg`,
        `${SUPABASE_STORAGE_BASE}/branding-identity/profile-identity.jpg`,
        `${SUPABASE_STORAGE_BASE}/branding-identity/brand-concept.png`
      ]
    },
    {
      key: "social-media-designs",
      title: "Social Media Designs",
      titleAr: "بوستات وإعلانات السوشيال ميديا",
      tagline: "High-converting creative posters, promotional visuals, and viral social campaigns.",
      desc: "تصاميم سوشيال ميديا وبوسترات إعلانية مبتكرة تجبر العميل على التوقف والتفاعل، صُممت بحسابات بصرية دقيقة وإضاءة احترافية.",
      message: "مرحباً إسماعيل، أنا مهتم بخدمة تصاميم وبوستات السوشيال ميديا (Social Media Designs) وأود مناقشة تفاصيل حملة إعلانية معكم.",
      icon: "TrendingUp",
      images: Array.from({ length: 23 }, (_, i) => {
        const num = (i + 1).toString().padStart(2, "0");
        return `${SUPABASE_STORAGE_BASE}/social-media-designs/social-${num}.jpg`;
      })
    },
    {
      key: "packaging-print",
      title: "Packaging & Print",
      titleAr: "تصميم المطبوعات والتغليف",
      tagline: "Tactile product packaging, luxury boxes, brochures, and print-ready editorial files.",
      desc: "تصاميم علب المنتجات، التغليف الفاخر، البروشورات، الفلايرات، والملصقات المجهزة بالكامل للمطابع بأعلى معايير الدقة والـ CMYK.",
      message: "مرحباً إسماعيل، أنا مهتم بخدمة تصميم المطبوعات والتغليف (Packaging & Print) وأود مناقشة تفاصيل مشروع معكم.",
      icon: "Package",
      images: Array.from({ length: 41 }, (_, i) => {
        const num = (i + 1).toString().padStart(2, "0");
        return `${SUPABASE_STORAGE_BASE}/packaging-print/print-${num}.jpg`;
      })
    }
  ] as CategoryPortfolio[],

  // Software from CV
  tools: [
    { name: "Adobe Photoshop", category: "Graphic & Retouching", level: 99, icon: "Image" },
    { name: "Adobe Illustrator", category: "Vector & Branding", level: 98, icon: "PenTool" },
    { name: "Adobe After Effects", category: "Motion Graphics & VFX", level: 95, icon: "Sparkles" },
    { name: "Adobe Premiere Pro", category: "Video Editing & Color", level: 96, icon: "Video" },
    { name: "Adobe Audition", category: "Audio Mixing & Voice", level: 92, icon: "Mic" },
    { name: "Adobe InDesign", category: "Editorial & Print", level: 90, icon: "BookOpen" },
    { name: "Adobe Animate", category: "2D Animation", level: 88, icon: "Activity" },
    { name: "Adobe Lightroom", category: "Color Grading & Photo", level: 94, icon: "Camera" },
    { name: "DaVinci Resolve", category: "Color & Video Post", level: 90, icon: "Film" },
    { name: "FL Studio", category: "Music & Beat Making", level: 88, icon: "Volume2" }
  ],

  training: [
    { name: "Graphic Town", area: "Graphic Design & Creative Skills" },
    { name: "Yanfaa Platform", area: "Professional & Creative Training" },
    { name: "Coursera", area: "Online Professional Courses" },
    { name: "Tahalip Academy", area: "Creative & Design Training" },
    { name: "Self-Directed Development", area: "Advanced hands-on development across design, motion & audio" }
  ],

  languages: [
    { name: "Arabic", nameAr: "العربية", level: "Native (اللغة الأم)" },
    { name: "English", nameAr: "الإنجليزية", level: "Fluent (طلاقة تامة)" },
    { name: "French", nameAr: "الفرنسية", level: "Basic / Conversational" }
  ],

  creativeProcess: [
    {
      step: "01",
      title: "Discovery & Anatomical Briefing",
      description: "Deep dive into your brand DNA, target audience psychology, and competitor gaps with scientific precision."
    },
    {
      step: "02",
      title: "Concept Development & Visual Strategy",
      description: "Developing moodboards, art direction guidelines, conceptual vector sketches, and core narrative pillars."
    },
    {
      step: "03",
      title: "Production, Motion & Audio Mastering",
      description: "Crafting polished vector assets, dynamic motion sequences, balanced color grades, and studio-grade sound."
    },
    {
      step: "04",
      title: "Quality Control, Delivery & Launch",
      description: "Delivering export-ready assets, comprehensive brand manuals, and digital marketing launch strategies."
    }
  ]
};
