import { Artist, RadioStation, Track, Message, Event, Producer } from './types';
import { DEFAULT_AVATAR } from './assets';

// --- TRACKS ---
export const MOCK_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Be Live (feat. Leo Novoa)',
    artistId: 'a_nico',
    artistName: 'Nicolas Venegas',
    duration: '3:45',
    coverUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3720?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Simulation
    genre: 'Electronic',
    plays: 15420,
    likes: 342,
    externalUrl: 'https://www.youtube.com/watch?v=fMTuccnaWPk' // Requested Link
  },
  {
    id: 't2',
    title: 'Noches de Santiago',
    artistId: 'a1',
    artistName: 'Luna Creciente',
    duration: '3:20',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Indie Pop',
    plays: 8500,
    likes: 120
  },
  {
    id: 't3',
    title: 'Fuego en los Andes',
    artistId: 'a2',
    artistName: 'Los Ecos',
    duration: '2:55',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Rock Alternativo',
    plays: 4200,
    likes: 85
  },
  {
    id: 't4',
    title: 'Ciberpunk Latino',
    artistId: 'a3',
    artistName: 'Neon City',
    duration: '3:40',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Synthwave',
    plays: 1200,
    likes: 45
  }
];

// --- EVENTS ---
const ALL_EVENTS: Event[] = [
    {
      id: 'e1',
      artistId: 'a1',
      title: 'Lanzamiento EP "Ciclos"',
      date: '2023-11-15T21:00:00',
      location: { city: 'Santiago', country: 'Chile', venue: 'Bar Loreto' },
      description: 'Presentación exclusiva de nuestro nuevo material con invitados sorpresa.',
      flyerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      ticketLink: 'https://passline.com'
    }
];

// --- ARTISTS ---
export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a_nico',
    role: 'artist',
    status: 'active',
    name: 'Nicolas Venegas y Leo Novoa',
    email: 'nico.venegas@emerhit.cl',
    paymentStatus: 'premium',
    bio: 'Dúo de música electrónica y experimental. Fusionando ritmos modernos con la esencia clásica.',
    genre: 'Electronic',
    location: { city: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
    avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    tracks: [MOCK_TRACKS[0]],
    events: [],
    rating: 4.8,
    votes: 156,
    socials: {
      youtube: 'https://www.youtube.com/watch?v=fMTuccnaWPk',
      facebook: 'https://web.facebook.com/nico.venegasthayer',
      instagram: '@nicolasvenegas_music'
    }
  },
  {
    id: 'a1',
    role: 'artist',
    status: 'active',
    name: 'Luna Creciente',
    email: 'contacto@lunacreciente.cl',
    paymentStatus: 'premium',
    bio: 'Banda de indie pop nacida en los suburbios de Santiago.',
    genre: 'Indie Pop',
    location: { city: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
    avatarUrl: 'https://images.unsplash.com/photo-1520699918507-4c30c8dc2367?q=80&w=400&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3720?q=80&w=1200&auto=format&fit=crop',
    tracks: [MOCK_TRACKS[1]],
    events: [ALL_EVENTS[0]],
    rating: 4.5,
    votes: 89,
    socials: {
      instagram: '@lunacreciente_banda',
      spotify: 'Luna Creciente'
    }
  },
  {
      id: 'a5',
      role: 'artist',
      status: 'pending', // Pending evaluation
      name: 'Solaris',
      email: 'hola@solaris.mx',
      paymentStatus: 'free',
      bio: 'Mezclando el bolero tradicional con bases de trap y R&B.',
      genre: 'Bolero Trap',
      location: { city: 'CDMX', country: 'México', display: 'Ciudad de México' },
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      coverImageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
      tracks: [MOCK_TRACKS[3]],
      events: [],
      rating: 0,
      votes: 0,
      socials: {
          tiktok: '@solaris_mx'
      }
  }
];

// --- PRODUCERS ---
export const MOCK_PRODUCERS: Producer[] = [
    {
        id: 'p1',
        role: 'producer',
        status: 'active',
        name: 'Nico Venegas Thayer',
        email: 'nico@studio.com',
        bio: 'Productor musical e ingeniero de sonido. Especialista en mezcla y mastering.',
        specialties: ['Mixing', 'Mastering', 'Beatmaking'],
        location: { city: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
        avatarUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop',
        rating: 5.0,
        votes: 42,
        socials: {
            facebook: 'https://web.facebook.com/nico.venegasthayer',
            instagram: '@nicovenegas_prod'
        }
    }
];

// --- RADIOS ---
export const MOCK_RADIOS: RadioStation[] = [
  {
    id: 'r_fmdos',
    role: 'radio',
    status: 'active',
    name: 'FMDOS',
    email: 'contacto@fmdos.cl',
    location: { city: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
    frequency: '98.5 FM',
    licenseType: 'commercial',
    genreFocus: ['Pop', 'Romántico', 'Latino'],
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/FMDOS_logo.svg/1200px-FMDOS_logo.svg.png',
    rating: 4.9,
    votes: 1205,
    socials: {
        website: 'https://www.fmdos.cl',
        instagram: '@fmdos'
    }
  },
  {
    id: 'r_portal',
    role: 'radio',
    status: 'active',
    name: 'Portal Radio',
    email: 'contacto@portalradio.cl',
    location: { city: 'Chile', country: 'Chile', display: 'Online' },
    frequency: 'Online',
    licenseType: 'online',
    genreFocus: ['Indie', 'Rock'],
    avatarUrl: DEFAULT_AVATAR,
    rating: 4.2,
    votes: 310,
    socials: {
        website: 'https://www.portalradio.cl'
    }
  },
  {
    id: 'r1',
    role: 'radio',
    status: 'active',
    name: 'Radio Valparaíso Indie',
    email: 'programacion@valpaindie.cl',
    location: { city: 'Valparaíso', country: 'Chile', display: 'Valparaíso, Chile' },
    frequency: '102.5 FM',
    licenseType: 'community',
    genreFocus: ['Indie', 'Rock', 'Pop'],
    avatarUrl: DEFAULT_AVATAR,
    rating: 4.6,
    votes: 75,
    socials: { instagram: '@valpaindie' }
  }
];

// --- MESSAGES ---
export const MOCK_MESSAGES: Message[] = [
    {
        id: 'm1',
        senderId: 'r1',
        receiverId: 'a1',
        subject: 'Interés en "Noches de Santiago"',
        body: 'Hola Luna Creciente, somos de Radio Valparaíso. Escuchamos su single y nos gustaría programarlo para la próxima semana.',
        timestamp: '2023-10-25T10:30:00',
        readStatus: false
    }
];

export { ALL_EVENTS };