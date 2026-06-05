export interface Fragrance {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  mood: string[];
  accent: string;
  accentClass: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  tags: string[];
  price: string;
}

export const fragrances: Fragrance[] = [
  {
    id: "velvet-hour",
    name: "VELVET HOUR",
    slug: "velvet-hour",
    tagline: "For the ones who stay when the lights go out.",
    description:
      "A fragrance that wraps around you like velvet curtains in an empty theater. For the ones who stay when the lights go out.",
    mood: ["Intense", "Sultry", "Nocturnal"],
    accent: "#2B1A2E",
    accentClass: "bg-plum",
    topNotes: ["Black Rose", "Saffron"],
    heartNotes: ["Tobacco Leaf", "Dark Jasmine"],
    baseNotes: ["Leather", "Midnight Musk", "Amber"],
    tags: ["Deep Florals", "Tobacco", "Leather", "Midnight Musk"],
    price: "£95",
  },
  {
    id: "phantom-garden",
    name: "PHANTOM GARDEN",
    slug: "phantom-garden",
    tagline: "The garden no one tends.",
    description:
      "Where wildflowers grow between cracks in forgotten stone. Untamed. Unfiltered. Unforgettable.",
    mood: ["Green", "Wild", "Enigmatic"],
    accent: "#1F2E27",
    accentClass: "bg-forest",
    topNotes: ["Black Pepper", "Green Fig"],
    heartNotes: ["Jasmine Sambac", "Iris"],
    baseNotes: ["Vetiver", "Wet Earth", "Oakmoss"],
    tags: ["Wet Earth", "Jasmine", "Black Pepper", "Vetiver"],
    price: "£95",
  },
  {
    id: "burnt-manuscript",
    name: "BURNT MANUSCRIPT",
    slug: "burnt-manuscript",
    tagline: "The scent of a story half-told.",
    description:
      "Of old paper and smoldering embers. For those who find beauty in what's left behind.",
    mood: ["Smoky", "Warm", "Timeless"],
    accent: "#2A2A2F",
    accentClass: "bg-smoke",
    topNotes: ["Bergamot", "Pink Pepper"],
    heartNotes: ["Oud", "Paper Accord", "Incense"],
    baseNotes: ["Vanilla", "Cedarwood", "Smoky Amber"],
    tags: ["Oud", "Vanilla", "Paper", "Smoke"],
    price: "£95",
  },
];
