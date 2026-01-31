// --- USER ENTITIES ---

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  website?: string;
  spotify?: string;
  twitter?: string;
}

export type UserRole = 'artist' | 'radio' | 'admin';

export interface UserBase {
  id: string;
  role: UserRole;
  email: string;
  name: string;
  avatarUrl: string;
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
}

export interface RadioStation extends UserBase {
  role: 'radio';
  frequency: string;
  licenseType: 'community' | 'commercial' | 'online';
  genreFocus: string[];
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

export type ViewState = 'discovery' | 'artist_profile' | 'messages' | 'events' | 'my_tracks' | 'admin_dashboard' | 'radio_downloads';