import { Artist, RadioStation, Track, Message } from './types';
import { DEFAULT_AVATAR, DEFAULT_COVER } from './assets';

export const MOCK_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Noches de Santiago',
    artistId: 'a1',
    artistName: 'Luna Creciente',
    duration: '3:20',
    coverUrl: 'https://picsum.photos/200/200?random=1',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder Audio
    genre: 'Indie Pop'
  },
  {
    id: 't2',
    title: 'Desierto Florido',
    artistId: 'a1',
    artistName: 'Luna Creciente',
    duration: '4:05',
    coverUrl: 'https://picsum.photos/200/200?random=2',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Indie Pop'
  },
  {
    id: 't3',
    title: 'Eco del Valle',
    artistId: 'a2',
    artistName: 'Los Ecos',
    duration: '2:55',
    coverUrl: 'https://picsum.photos/200/200?random=3',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Rock Alternativo'
  },
  {
    id: 't4',
    title: 'Gravedad Cero',
    artistId: 'a3',
    artistName: 'Neon City',
    duration: '3:40',
    coverUrl: 'https://picsum.photos/200/200?random=4',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Synthwave'
  }
];

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a1',
    role: 'artist',
    name: 'Luna Creciente',
    email: 'contacto@lunacreciente.cl',
    paymentStatus: 'premium',
    bio: 'Banda de indie pop nacida en los suburbios de Santiago. Buscamos conectar emociones a través de melodías suaves y letras introspectivas.',
    genre: 'Indie Pop',
    location: { city: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
    avatarUrl: 'https://picsum.photos/400/400?random=10',
    coverImageUrl: 'https://picsum.photos/1200/400?random=11',
    tracks: [MOCK_TRACKS[0], MOCK_TRACKS[1]],
    events: [
      {
        id: 'e1',
        artistId: 'a1',
        title: 'Lanzamiento EP "Ciclos"',
        date: '2023-11-15',
        location: { city: 'Santiago', country: 'Chile', venue: 'Bar Loreto' },
        description: 'Presentación exclusiva de nuestro nuevo material.',
        flyerUrl: 'https://picsum.photos/300/400?random=50'
      },
      {
        id: 'e2',
        artistId: 'a1',
        title: 'Festival Emergente',
        date: '2023-12-05',
        location: { city: 'Santiago', country: 'Chile', venue: 'Parque Forestal' },
        description: 'Tocando junto a otras bandas locales.'
      }
    ],
    socials: {
      instagram: '@lunacreciente_banda',
      spotify: 'Luna Creciente',
      tiktok: '@lunacreciente_oficial'
    }
  },
  {
    id: 'a2',
    role: 'artist',
    name: 'Los Ecos',
    email: 'management@losecos.com',
    paymentStatus: 'free',
    bio: 'Rock crudo y directo desde Mendoza. Guitarras fuertes y energía para escenarios pequeños y grandes.',
    genre: 'Rock Alternativo',
    location: { city: 'Mendoza', country: 'Argentina', display: 'Mendoza, Argentina' },
    avatarUrl: 'https://picsum.photos/400/400?random=12',
    coverImageUrl: 'https://picsum.photos/1200/400?random=13',
    tracks: [MOCK_TRACKS[2]],
    events: [],
    socials: {
      instagram: '@losecos_rock',
      twitter: '@losecos'
    }
  },
  {
    id: 'a3',
    role: 'artist',
    name: 'Neon City',
    email: 'booking@neoncity.co',
    paymentStatus: 'premium',
    bio: 'Synthwave futurista inspirado en la estética cyberpunk de los 80s.',
    genre: 'Synthwave',
    location: { city: 'Bogotá', country: 'Colombia', display: 'Bogotá, Colombia' },
    avatarUrl: 'https://picsum.photos/400/400?random=14',
    coverImageUrl: 'https://picsum.photos/1200/400?random=15',
    tracks: [MOCK_TRACKS[3]],
    events: [
      {
        id: 'e3',
        artistId: 'a3',
        title: 'Night Drive Live',
        date: '2023-11-20',
        location: { city: 'Bogotá', country: 'Colombia', venue: 'Club 88' },
        description: 'Noche de sintetizadores y luces neón.',
        ticketLink: 'https://tickets.com/neoncity'
      }
    ],
    socials: {
      instagram: '@neoncity_music',
      website: 'www.neoncity.co'
    }
  }
];

export const MOCK_RADIOS: RadioStation[] = [
  {
    id: 'r1',
    role: 'radio',
    name: 'Radio Valparaíso Indie',
    email: 'programacion@valpaindie.cl',
    location: { city: 'Valparaíso', country: 'Chile', display: 'Valparaíso, Chile' },
    frequency: '102.5 FM',
    licenseType: 'community',
    genreFocus: ['Indie', 'Rock', 'Pop'],
    avatarUrl: DEFAULT_AVATAR
  },
  {
    id: 'r2',
    role: 'radio',
    name: 'Estación Futuro',
    email: 'contacto@estacionfuturo.ar',
    location: { city: 'Buenos Aires', country: 'Argentina', display: 'Buenos Aires, Argentina' },
    frequency: 'Online',
    licenseType: 'online',
    genreFocus: ['Electronic', 'Synthwave'],
    avatarUrl: DEFAULT_AVATAR
  }
];

export const MOCK_MESSAGES: Message[] = [
    {
        id: 'm1',
        senderId: 'r1',
        receiverId: 'a1',
        subject: 'Interés en "Noches de Santiago"',
        body: 'Hola Luna Creciente, escuchamos su single y nos gustaría programarlo para la próxima semana.',
        timestamp: new Date().toISOString(),
        readStatus: false
    }
];