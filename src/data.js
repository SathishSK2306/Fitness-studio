import {
  Dumbbell, Flame, Zap, Target, TrendingUp, Apple, Users, PersonStanding,
  ClipboardCheck, Weight, Medal, HeartPulse,
} from "lucide-react";

export const BUSINESS = {
  name: "Focus Fitness Studio",
  phoneDisplay: "091764 43433",
  phoneHref: "tel:+919176443433",
  whatsapp: "919176443433",
  instagram: "https://www.instagram.com/focusfitnessstudio/",
  instagramHandle: "@focusfitnessstudio",
  address: "31 A, Dr Seethapathy Nagar, Taramani Link Rd, Baby Nagar, Chennai, Tamil Nadu 600042",
  mapsLink:
    "https://maps.google.com/?q=Focus+Fitness+Studio,+31+A+Dr+Seethapathy+Nagar,+Taramani+Link+Rd,+Baby+Nagar,+Chennai+600042",
  mapsEmbed:
    "https://maps.google.com/maps?q=Focus%20Fitness%20Studio%2C%2031%20A%20Dr%20Seethapathy%20Nagar%2C%20Taramani%20Link%20Rd%2C%20Chennai%20600042&z=16&output=embed",
  rating: 4.7,
  reviews: 253,
  closes: "9:00 PM",
};

export const waLink = (text) =>
  `https://wa.me/${BUSINESS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why Us" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

export const IMAGES = {
  hero: u("1534438327276-14e5300c3a48", 1920),
  aboutMain: u("1540497077202-7c8a3999166f"),
  aboutSmall: u("1583454110551-21f2fa2afe61", 600),
  why: u("1517836357463-d25dfeac3438", 1920),
  gallery: [
    { src: u("1571019614242-c5c5dee9f50b", 800), alt: "Athlete training", cls: "g-tall" },
    { src: u("1581009146145-b5ef050c2e1e", 800), alt: "Dumbbell workout" },
    { src: u("1599058917212-d750089bc07e", 800), alt: "Kettlebell training" },
    { src: u("1534438327276-14e5300c3a48", 1200), alt: "Gym equipment", cls: "g-wide" },
  ],
};

export const SERVICES = [
  { icon: Dumbbell, title: "Strength Training", text: "Build raw power with structured, progressive lifting programs." },
  { icon: Flame, title: "HIIT Classes", text: "High-intensity intervals that torch calories and boost stamina." },
  { icon: Zap, title: "CrossFit", text: "Functional, varied workouts that test everything you've got." },
  { icon: Target, title: "Personal Training", text: "One-on-one coaching with a plan designed only for you." },
  { icon: TrendingUp, title: "Muscle Building", text: "Hypertrophy-focused routines to add lean, quality muscle." },
  { icon: Apple, title: "Nutrition Consulting", text: "Diet plans that match your training and your lifestyle." },
  { icon: Users, title: "Group Training", text: "Train together, push harder, and have more fun doing it." },
  { icon: PersonStanding, title: "Flexibility Sessions", text: "Improve mobility, posture and recovery with guided stretching." },
  { icon: ClipboardCheck, title: "Fitness Assessment", text: "Know where you stand and track your progress over time." },
  { icon: Weight, title: "Weight Training", text: "Free weights and machines for every level, beginner to advanced." },
  { icon: Medal, title: "Sport-Specific Training", text: "Targeted conditioning to sharpen your game performance." },
  { icon: HeartPulse, title: "Senior Citizen Fitness", text: "Safe, supervised training to stay strong and active at any age." },
];

export const WHY = [
  { title: "Superior Equipment", text: "A wide variety of well-maintained machines and free weights." },
  { title: "Motivating Trainers", text: "Professional, friendly coaches who keep you consistent." },
  { title: "Training + Diet Plans", text: "Workouts and nutrition planned around your goals." },
  { title: "Clean & Hygienic", text: "A well-kept space with showers and restrooms." },
];

export const REVIEWS = [
  { text: "Amazing facility, superior equipment, and a pleasant atmosphere.", by: "Google Review" },
  { text: "Hygienic and well maintained place with very professional and friendly trainers.", by: "Google Review" },
  {
    text: "Wide variety of well-maintained equipment and a good environment. The trainers, Krishna and Shyam, are enthusiastic and motivating.",
    by: "What members highlight on Google",
  },
];

export const MARQUEE = ["HIIT", "CROSSFIT", "STRENGTH", "PERSONAL TRAINING", "MUSCLE BUILDING", "NUTRITION", "FLEXIBILITY"];

export const GOALS = ["Weight loss", "Muscle building", "Strength training", "Personal training", "HIIT / CrossFit", "General fitness"];
