// src/data/chalets.ts

import { ChaletImage } from "./chaletImages";
import { palmOasisImages } from "./palmOasisImages";
import { sunsetRetreatImages } from "./sunsetRetreatImages";
import { gardenViewImages } from "./gardenViewImages";
import { luxuryPoolsideImages } from "./luxuryPoolsideImages";
import { familyParadiseImages } from "./familyParadiseImages";
import { modernEscapeImages } from "./modernEscapeImages";

export interface Chalet {
  id: string;
  name: string;
  location: string;
  price: number;
  images: ChaletImage[];
  rating: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  description: string;
}

export const chalets: Chalet[] = [
  {
    id: "1",
    name: "Palm Oasis Chalet",
    location: "Riyadh, North District",
    price: 1200,
    images: palmOasisImages,
    rating: 4.7,
    bedrooms: 2,
    bathrooms: 2,
    guests: 6,
    description: "A beautiful oasis in Riyadh with palm trees and a private pool."
  },
  {
    id: "2",
    name: "Sunset Retreat",
    location: "Jeddah, Beachfront",
    price: 1500,
    images: sunsetRetreatImages,
    rating: 4.8,
    bedrooms: 3,
    bathrooms: 2,
    guests: 8,
    description: "Enjoy stunning sunsets and direct beach access at this luxury retreat."
  },
  {
    id: "3",
    name: "Garden View Chalet",
    location: "Abha, Green Hills",
    price: 1000,
    images: gardenViewImages,
    rating: 4.5,
    bedrooms: 2,
    bathrooms: 1,
    guests: 5,
    description: "A cozy chalet surrounded by lush gardens and green hills."
  },
  {
    id: "4",
    name: "Luxury Poolside",
    location: "Dammam, Corniche",
    price: 1800,
    images: luxuryPoolsideImages,
    rating: 4.9,
    bedrooms: 4,
    bathrooms: 3,
    guests: 10,
    description: "Spacious luxury chalet with a private pool and modern amenities."
  },
  {
    id: "5",
    name: "Family Paradise",
    location: "Taif, Mountain Area",
    price: 1100,
    images: familyParadiseImages,
    rating: 4.6,
    bedrooms: 3,
    bathrooms: 2,
    guests: 7,
    description: "Perfect for families, with plenty of space and activities for kids."
  },
  {
    id: "6",
    name: "Modern Escape",
    location: "Al Khobar, City Center",
    price: 1300,
    images: modernEscapeImages,
    rating: 4.7,
    bedrooms: 2,
    bathrooms: 2,
    guests: 6,
    description: "A modern chalet in the heart of the city, close to all attractions."
  }
];