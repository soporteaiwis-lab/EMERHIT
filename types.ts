// --- USER ENTITIES ---

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  website?: string;
  spotify?: string;
  twitter?: string;
  facebook?: string; // Added Facebook
  youtube?: string; // Added YouTube
}

export type UserRole = 'artist' | 'radio' | 'admin' | 'producer';
export type UserStatus = 'active' | 'pending' | 'rejected';

export interface UserBase {
  id: string;
  role: UserRole;
  status: UserStatus;
  email: string;
  name: string;
  avatarUrl: string;
  rating: number; // 0 to 5
  votes: number; // Total number of votes
  location: {
    city: string;
    country: string;
    display: string;
  };
}

export interface Artist extends UserBase {
  role: 'artist';
  bio: string;
  genre: string;
  coverImageUrl: string;
  paymentStatus: 'free' | 'premium';
  socials: SocialLinks;
  tracks: Track[];
  events: Event[];
  demoUrl?: string;
}

export interface RadioStation extends UserBase {
  role: 'radio';
  frequency: string;
  licenseType: 'community' | 'commercial' | 'online';
  genreFocus: string[];
  socials?: SocialLinks; // Added socials to Radio
}

export interface Producer extends UserBase {
  role: 'producer';
  bio: string;
  specialties: string[];
  portfolioUrl?: string;
  socials: SocialLinks;
}

export interface AdminUser extends UserBase {
    role: 'admin';
}

// --- CONTENT ENTITIES ---

export interface Track {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  duration: string;
  coverUrl: string;
  mp3Url: string;
  genre: string;
  plays: number; // Added Play Count
  likes: number; // Added Like Count
  externalUrl?: string; // YouTube/Spotify link
}

export interface Event {
  id: string;
  artistId: string;
  title: string;
  date: string;
  location: {
    city: string;
    country: string;
    venue: string;
  };
  description: string;
  ticketLink?: string;
  flyerUrl?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  body: string;
  timestamp: string;
  readStatus: boolean;
}

export type ViewState = 'discovery' | 'artist_profile' | 'messages' | 'events' | 'my_tracks' | 'admin_dashboard' | 'radio_downloads' | 'producer_portfolio';