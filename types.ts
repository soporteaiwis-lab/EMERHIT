// --- USER ENTITIES ---

export interface SocialLinks {
  instagram?: string;
  tiktok?: string; // New requirement
  website?: string;
  spotify?: string;
  twitter?: string;
}

export type UserRole = 'artist' | 'radio';

export interface UserBase {
  id: string;
  role: UserRole;
  email: string;
  name: string;
  avatarUrl: string;
  location: {
    city: string;
    country: string;
    display: string; // "Santiago, Chile"
  };
}

export interface Artist extends UserBase {
  role: 'artist';
  bio: string;
  genre: string;
  coverImageUrl: string;
  paymentStatus: 'free' | 'premium'; // New requirement
  socials: SocialLinks;
  tracks: Track[]; // UI convenience, referenced by ID in DB
  events: Event[]; // UI convenience
}

export interface RadioStation extends UserBase {
  role: 'radio';
  frequency: string; // e.g. "98.5 FM" - New requirement
  licenseType: 'community' | 'commercial' | 'online'; // New requirement
  genreFocus: string[];
}

// --- CONTENT ENTITIES ---

export interface Track { // Renamed from Song to match 'tracks' collection
  id: string;
  artistId: string;
  artistName: string; // Denormalized
  title: string;
  duration: string;
  coverUrl: string; // cover_image
  mp3Url: string;   // New requirement: actual audio source
  genre: string;
}

export interface Event {
  id: string;
  artistId: string;
  title: string; // titulo_evento
  date: string;
  location: { // ubicacion
    city: string;
    country: string;
    venue: string;
  };
  description: string;
  ticketLink?: string; // link_tickets
  flyerUrl?: string;   // flyer_img - New requirement
}

export interface Message {
  id: string;
  senderId: string; // Artist ID or Radio ID
  receiverId: string;
  subject: string;
  body: string;
  timestamp: string;
  readStatus: boolean;
}

export type ViewState = 'discovery' | 'artist_profile' | 'messages' | 'events';