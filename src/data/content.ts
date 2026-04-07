// ============================================================
// Kuba & Kubová Architekti — Content Data
// ============================================================
// To add real photos:
//   1. Place images in /public/img/ (e.g. /public/img/projekty/vila-cerenec.jpg)
//   2. Update the `photo` field in the projects array below
//   3. Next.js Image component will handle optimization automatically
// ============================================================

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  year: number;
  area: number; // m²
  photo: string | null; // path relative to /public, or null for placeholder
  description?: string;
}

export type ProjectCategory =
  | 'vila'
  | 'komercni'
  | 'rezidencni'
  | 'interior'
  | 'rekonstrukce';

export interface Founder {
  name: string;
  firstName: string;
  email: string;
  role: string;
  bio: string;
  specialties: string[];
  theme: 'light' | 'dark';
  longBio: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface ContactInfo {
  studioEmail: string;
  phone: string;
  address: string;
  addressShort: string;
  city: string;
  ic: string;
}

// ------------------------------------------------------------------
// Contact
// ------------------------------------------------------------------

export const contact: ContactInfo = {
  studioEmail: 'studio@kubakubova.cz',
  phone: '+420 777 000 000',
  address: 'Bohumínská 442/51, 702 00 Ostrava',
  addressShort: 'Bohumínská 442/51',
  city: '702 00 Ostrava',
  ic: '07490992',
};

// ------------------------------------------------------------------
// Founders
// ------------------------------------------------------------------

export const founders: { michal: Founder; katerina: Founder } = {
  michal: {
    name: 'Michal Kuba',
    firstName: 'Michal',
    email: 'm.kuba@kubakubova.cz',
    role: 'Hlavní architekt & spoluzakladatel',
    bio: 'Michal projektuje stavby, které vydrží dekády — funkčně i esteticky. Jeho přístup spojuje konstrukční preciznost s respektem k prostředí.',
    longBio: 'Michal založil studio v roce 2007 s vizí tvořit architekturu, která slouží lidem a respektuje místo. Specializuje se na komplexní projekty od rodinných domů po komerční objekty. Jeho práce se vyznačuje čistými liniemi, promyšlenými dispozicemi a důrazem na kvalitní materiály. Za 18 let praxe vedl přes 60 projektů v Moravskoslezském kraji a širším okolí.',
    specialties: ['Koncepční návrh', 'Urbanismus', 'Komerční stavby', 'Projekční vedení'],
    theme: 'light',
  },
  katerina: {
    name: 'Kateřina Kubová',
    firstName: 'Kateřina',
    email: 'k.kubova@kubakubova.cz',
    role: 'Interiérová architektka & spoluzakladatelka',
    bio: 'Kateřina dotváří každý prostor do posledního detailu. Její interiéry jsou nadčasové, funkční a přesně na míru klientovi.',
    longBio: 'Kateřina se ke studiu připojila při jeho založení a přinesla zaměření na interiérový design a detail. Každý projekt vnímá jako celek — od fasády po kliku dveří. Její práce se opírá o hluboké porozumění materiálům, světlu a proporci. Spolupracuje s řemeslníky a dodavateli na míru, aby každý interiér dosáhl maximální kvality.',
    specialties: ['Interiérový design', 'Materiálový výběr', 'Detailní projektování', 'Autorský dozor'],
    theme: 'dark',
  },
};

// ------------------------------------------------------------------
// Projects
// ------------------------------------------------------------------

export const projectCategories: { value: ProjectCategory | 'vse'; label: string }[] = [
  { value: 'vse', label: 'Vše' },
  { value: 'vila', label: 'Rodinné domy & vily' },
  { value: 'komercni', label: 'Komerční stavby' },
  { value: 'rezidencni', label: 'Rezidenční' },
  { value: 'interior', label: 'Interiér' },
  { value: 'rekonstrukce', label: 'Rekonstrukce' },
];

export const projects: Project[] = [
  {
    id: 'vila-cerenec',
    name: 'Vila Čerenec',
    category: 'vila',
    categoryLabel: 'Rodinný dům',
    location: 'Ostrava',
    year: 2023,
    area: 380,
    photo: '/img/projekty/vila-cerenec.jpg',
  },
  {
    id: 'centrum-zelena',
    name: 'Centrum Zelená',
    category: 'komercni',
    categoryLabel: 'Komerční stavba',
    location: 'Opava',
    year: 2022,
    area: 2400,
    photo: '/img/projekty/centrum-zelena.jpg',
  },
  {
    id: 'bytovy-dum-pod-lipou',
    name: 'Bytový dům Pod Lípou',
    category: 'rezidencni',
    categoryLabel: 'Rezidenční',
    location: 'Frýdek-Místek',
    year: 2021,
    area: 1800,
    photo: '/img/projekty/bytovy-dum-pod-lipou.jpg',
  },
  {
    id: 'detsky-pokoj',
    name: 'Dětský pokoj',
    category: 'interior',
    categoryLabel: 'Interiér',
    location: 'Ostrava',
    year: 2023,
    area: 22,
    photo: '/img/projekty/detsky-pokoj-vizualizace.png',
  },
  {
    id: 'dum-v-beskydach',
    name: 'Dům v Beskydách',
    category: 'vila',
    categoryLabel: 'Rodinný dům',
    location: 'Trojanovice',
    year: 2020,
    area: 260,
    photo: '/img/projekty/dum-v-beskydach.jpg',
  },
  {
    id: 'historicka-vila-privoz',
    name: 'Historická vila Přívoz',
    category: 'rekonstrukce',
    categoryLabel: 'Rekonstrukce',
    location: 'Ostrava-Přívoz',
    year: 2019,
    area: 480,
    photo: '/img/projekty/historicka-vila-privoz.jpg',
  },
];

// ------------------------------------------------------------------
// Timeline
// ------------------------------------------------------------------

export const timeline: TimelineItem[] = [
  {
    year: '2007',
    title: 'Založení studia',
    description: 'Michal a Kateřina zakládají ateliér v centru Ostravy s vizí tvořit architekturu s přesahem.',
  },
  {
    year: '2012',
    title: 'Ocenění Grand Prix',
    description: 'Vila Čeladná získává cenu Grand Prix architektů za nejlepší rodinný dům roku.',
  },
  {
    year: '2018',
    title: '50. realizovaný projekt',
    description: 'Studio překonává milník padesáti dokončených realizací po celém Moravskoslezském kraji.',
  },
  {
    year: 'Dnes',
    title: '18 let zkušeností',
    description: 'Tým šesti architektů pokračuje v tvorbě staveb, které obstojí v čase.',
  },
];

// ------------------------------------------------------------------
// Values
// ------------------------------------------------------------------

export const values: Value[] = [
  {
    title: 'Funkce i forma',
    description: 'Krásná stavba, která nefunguje, není dobrá architektura. Hledáme rovnováhu.',
  },
  {
    title: 'Trvanlivost materiálu',
    description: 'Vybíráme materiály, které stárnou důstojně — kámen, dřevo, kov, beton.',
  },
  {
    title: 'Transparentní proces',
    description: 'Klient vidí každý krok od studie po realizaci. Žádná překvapení.',
  },
  {
    title: 'Respekt k místu',
    description: 'Každý pozemek má svůj charakter. Nasloucháme mu dříve, než začneme kreslit.',
  },
];

// ------------------------------------------------------------------
// Marquee items
// ------------------------------------------------------------------

export const marqueeItems: string[] = [
  'Rodinné domy',
  'Komerční stavby',
  'Interiérový design',
  'Rekonstrukce',
  'Projekční dokumentace',
  'Územní plánování',
];
