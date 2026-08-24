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
    heroImage: "/ismail_hero.jpg",
    avatar: "/ismail_hero.jpg",
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

  // Real Service Categories & Galleries
  categories: [
    {
      key: "branding-identity",
      title: "Branding & Identity",
      titleAr: "تصميم وبناء الهويات البصرية والشعارات",
      tagline: "High-impact visual identity systems, vector marks, and brand guidelines.",
      desc: "هويات بصرية كاملة، تصميم شعارات دقيقة هندسياً، أدلة استخدام العلامة التجارية، وتطبيقات المطبوعات والتغليف الفاخرة.",
      message: "مرحباً إسماعيل، أنا مهتم بخدمة تصميم الهوية البصرية والشعارات (Branding & Identity) وأود مناقشة تفاصيل مشروع معكم.",
      icon: "Layers",
      pdfAttachment: "/branding-identity/Logo Design Process.pdf",
      images: [
        "/branding-identity/cover.jpg",
        "/branding-identity/identity-showcase.jpg",
        "/branding-identity/8.jpg",
        "/branding-identity/456.jpg",
        "/branding-identity/54615.jpg",
        "/branding-identity/556.jpg",
        "/branding-identity/profile-identity.jpg",
        "/branding-identity/brand-concept.png"
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
      images: [
        "/social-media-designs/social-01.jpg",
        "/social-media-designs/social-02.jpg",
        "/social-media-designs/social-03.jpg",
        "/social-media-designs/social-04.jpg",
        "/social-media-designs/social-05.jpg",
        "/social-media-designs/social-06.jpg",
        "/social-media-designs/social-07.jpg",
        "/social-media-designs/social-08.jpg",
        "/social-media-designs/social-09.jpg",
        "/social-media-designs/social-10.jpg",
        "/social-media-designs/social-11.jpg",
        "/social-media-designs/social-12.jpg",
        "/social-media-designs/social-13.jpg",
        "/social-media-designs/social-14.jpg",
        "/social-media-designs/social-15.jpg",
        "/social-media-designs/social-16.jpg",
        "/social-media-designs/social-17.jpg",
        "/social-media-designs/social-18.jpg",
        "/social-media-designs/social-19.jpg",
        "/social-media-designs/social-20.jpg",
        "/social-media-designs/social-21.jpg",
        "/social-media-designs/social-22.jpg",
        "/social-media-designs/social-23.jpg"
      ]
    },
    {
      key: "packaging-print",
      title: "Packaging & Print",
      titleAr: "تصميم المطبوعات والتغليف",
      tagline: "Tactile product packaging, luxury boxes, brochures, and print-ready editorial files.",
      desc: "تصاميم علب المنتجات، التغليف الفاخر، البروشورات، الفلايرات، والملصقات المجهزة بالكامل للمطابع بأعلى معايير الدقة والـ CMYK.",
      message: "مرحباً إسماعيل، أنا مهتم بخدمة تصميم المطبوعات والتغليف (Packaging & Print) وأود مناقشة تفاصيل مشروع معكم.",
      icon: "Package",
      images: [
        "/packaging-print/print-01.jpg",
        "/packaging-print/print-02.jpg",
        "/packaging-print/print-03.jpg",
        "/packaging-print/print-04.jpg",
        "/packaging-print/print-05.jpg",
        "/packaging-print/print-06.jpg",
        "/packaging-print/print-07.jpg",
        "/packaging-print/print-08.jpg",
        "/packaging-print/print-09.jpg",
        "/packaging-print/print-10.jpg",
        "/packaging-print/print-11.jpg",
        "/packaging-print/print-12.jpg",
        "/packaging-print/print-13.jpg",
        "/packaging-print/print-14.jpg",
        "/packaging-print/print-15.jpg",
        "/packaging-print/print-16.jpg",
        "/packaging-print/print-17.jpg",
        "/packaging-print/print-18.jpg",
        "/packaging-print/print-19.jpg",
        "/packaging-print/print-20.jpg",
        "/packaging-print/print-21.jpg",
        "/packaging-print/print-22.jpg",
        "/packaging-print/print-23.jpg",
        "/packaging-print/print-24.jpg",
        "/packaging-print/print-25.jpg",
        "/packaging-print/print-26.jpg",
        "/packaging-print/print-27.jpg",
        "/packaging-print/print-28.jpg",
        "/packaging-print/print-29.jpg",
        "/packaging-print/print-30.jpg",
        "/packaging-print/print-31.jpg",
        "/packaging-print/print-32.jpg",
        "/packaging-print/print-33.jpg",
        "/packaging-print/print-34.jpg",
        "/packaging-print/print-35.jpg",
        "/packaging-print/print-36.jpg",
        "/packaging-print/print-37.jpg",
        "/packaging-print/print-38.jpg",
        "/packaging-print/print-39.jpg",
        "/packaging-print/print-40.jpg",
        "/packaging-print/print-41.jpg"
      ]
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
