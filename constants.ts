import { Artist, RadioStation, Track, Message, Event } from './types';
import { DEFAULT_AVATAR } from './assets';

// --- TRACKS ---
export const MOCK_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Noches de Santiago',
    artistId: 'a1',
    artistName: 'Luna Creciente',
    duration: '3:20',
    coverUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3720?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Indie Pop'
  },
  {
    id: 't2',
    title: 'Desierto Florido',
    artistId: 'a1',
    artistName: 'Luna Creciente',
    duration: '4:05',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Indie Pop'
  },
  {
    id: 't3',
    title: 'Fuego en los Andes',
    artistId: 'a2',
    artistName: 'Los Ecos',
    duration: '2:55',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Rock Alternativo'
  },
  {
    id: 't4',
    title: 'Ciberpunk Latino',
    artistId: 'a3',
    artistName: 'Neon City',
    duration: '3:40',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Synthwave'
  },
  {
    id: 't5',
    title: 'Ritmo de la Selva',
    artistId: 'a4',
    artistName: 'La Marea',
    duration: '3:15',
    coverUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    genre: 'Cumbia Psicodélica'
  },
  {
    id: 't6',
    title: 'Bajo el Sol de México',
    artistId: 'a5',
    artistName: 'Solaris',
    duration: '4:10',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Bolero Trap'
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
    },
    {
      id: 'e2',
      artistId: 'a1',
      title: 'Festival Emergente 2024',
      date: '2024-03-05T14:00:00',
      location: { city: 'Valparaíso', country: 'Chile', venue: 'Parque Cultural' },
      description: 'Tocando junto a otras 20 bandas locales en el escenario principal.',
      flyerUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'e3',
      artistId: 'a3',
      title: 'Night Drive Live',
      date: '2023-11-20T23:00:00',
      location: { city: 'Bogotá', country: 'Colombia', venue: 'Club 88' },
      description: 'Noche de sintetizadores y luces neón.',
      ticketLink: 'https://tickets.com/neoncity',
      flyerUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'e4',
        artistId: 'a4',
        title: 'Fiesta de la Cumbia',
        date: '2024-01-15T22:00:00',
        location: { city: 'Lima', country: 'Perú', venue: 'Centro de Convenciones' },
        description: 'Bailando hasta el amanecer con los clásicos y lo nuevo.',
        flyerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop'
    }
];

// --- ARTISTS ---
export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a1',
    role: 'artist',
    name: 'Luna Creciente',
    email: 'contacto@lunacreciente.cl',
    paymentStatus: 'premium',
    bio: 'Banda de indie pop nacida en los suburbios de Santiago. Buscamos conectar emociones a través de melodías suaves y letras introspectivas que hablan de la vida urbana y la naturaleza.',
    genre: 'Indie Pop',
    location: { city: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
    avatarUrl: 'https://images.unsplash.com/photo-1520699918507-4c30c8dc2367?q=80&w=400&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3720?q=80&w=1200&auto=format&fit=crop',
    tracks: [MOCK_TRACKS[0], MOCK_TRACKS[1]],
    events: [ALL_EVENTS[0], ALL_EVENTS[1]],
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
    bio: 'Rock crudo y directo desde Mendoza. Guitarras fuertes y energía para escenarios pequeños y grandes. Influenciados por el rock de los 90s.',
    genre: 'Rock Alternativo',
    location: { city: 'Mendoza', country: 'Argentina', display: 'Mendoza, Argentina' },
    avatarUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=400&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop',
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
    bio: 'Synthwave futurista inspirado en la estética cyberpunk de los 80s y el cine de ciencia ficción.',
    genre: 'Synthwave',
    location: { city: 'Bogotá', country: 'Colombia', display: 'Bogotá, Colombia' },
    avatarUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    tracks: [MOCK_TRACKS[3]],
    events: [ALL_EVENTS[2]],
    socials: {
      instagram: '@neoncity_music',
      website: 'www.neoncity.co'
    }
  },
  {
    id: 'a4',
    role: 'artist',
    name: 'La Marea',
    email: 'contacto@lamarea.pe',
    paymentStatus: 'premium',
    bio: 'Fusión de cumbia peruana con sonidos psicodélicos modernos. Hacemos bailar hasta a las piedras.',
    genre: 'Cumbia Psicodélica',
    location: { city: 'Lima', country: 'Perú', display: 'Lima, Perú' },
    avatarUrl: 'https://images.unsplash.com/photo-1529359744902-86b2ab9bedd1?q=80&w=400&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=1200&auto=format&fit=crop',
    tracks: [MOCK_TRACKS[4]],
    events: [ALL_EVENTS[3]],
    socials: {
        instagram: '@lamarea_oficial'
    }
  },
  {
      id: 'a5',
      role: 'artist',
      name: 'Solaris',
      email: 'hola@solaris.mx',
      paymentStatus: 'free',
      bio: 'Mezclando el bolero tradicional con bases de trap y R&B. Un sonido nostálgico para la generación Z.',
      genre: 'Bolero Trap',
      location: { city: 'CDMX', country: 'México', display: 'Ciudad de México' },
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      coverImageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
      tracks: [MOCK_TRACKS[5]],
      events: [],
      socials: {
          tiktok: '@solaris_mx'
      }
  }
];

// --- RADIOS ---
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
  },
  {
    id: 'r3',
    role: 'radio',
    name: 'Selva Stereo',
    email: 'hola@selvastereo.pe',
    location: { city: 'Iquitos', country: 'Perú', display: 'Iquitos, Perú' },
    frequency: '98.1 FM',
    licenseType: 'commercial',
    genreFocus: ['Cumbia', 'Tropical', 'Fusión'],
    avatarUrl: DEFAULT_AVATAR
  }
];

// --- MESSAGES ---
export const MOCK_MESSAGES: Message[] = [
    {
        id: 'm1',
        senderId: 'r1',
        receiverId: 'a1',
        subject: 'Interés en "Noches de Santiago"',
        body: 'Hola Luna Creciente, somos de Radio Valparaíso. Escuchamos su single y nos gustaría programarlo para la próxima semana en el bloque "Emergentes de la Costa". ¿Nos podrían enviar el press kit?',
        timestamp: '2023-10-25T10:30:00',
        readStatus: false
    },
    {
        id: 'm2',
        senderId: 'r2',
        receiverId: 'a3',
        subject: 'Entrevista para Neon City',
        body: '¡Hola! Nos encanta su estética Synthwave. Queremos invitarlos a una entrevista vía Zoom para nuestro podcast semanal.',
        timestamp: '2023-10-24T15:45:00',
        readStatus: true
    },
    {
        id: 'm3',
        senderId: 'r3',
        receiverId: 'a4',
        subject: 'Rotación en Selva Stereo',
        body: 'Saludos amigos de La Marea. Su tema "Ritmo de la Selva" está sonando fuerte aquí. Queremos coordinar un saludo grabado para la radio.',
        timestamp: '2023-10-23T09:15:00',
        readStatus: true
    }
];

export { ALL_EVENTS }; // Exporting events for global usage if needed