import { Artist, RadioStation, Producer, UserRole, UserStatus, UserBase } from '../types';
import { MOCK_ARTISTS, MOCK_RADIOS, MOCK_PRODUCERS } from '../constants';

// Changed version to v2 to force refresh with new data structure
const DB_KEY = 'emerhit_db_users_v2';

// Seed data with "Demo" users ready for testing
const SEED_USERS = [
    ...MOCK_ARTISTS,
    ...MOCK_RADIOS,
    ...MOCK_PRODUCERS,
    // Add specific test user from request "Vandik"
    {
        id: 'demo_vandik',
        role: 'artist',
        status: 'pending', // Starts pending to test approval flow
        name: 'Vandik',
        email: 'vandik@gmail.com',
        paymentStatus: 'free',
        bio: 'Artista urbano experimental buscando nuevas fronteras sonoras.',
        genre: 'Urbano Experimental',
        location: { city: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=400&auto=format&fit=crop',
        coverImageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1200&auto=format&fit=crop',
        tracks: [],
        events: [],
        rating: 0,
        votes: 0,
        socials: { website: 'https://www.vandik.cl' }
    } as Artist
];

export const mockDB = {
    // Initialize DB if empty
    initialize: () => {
        // If key doesn't exist or is old version, reset
        if (!localStorage.getItem(DB_KEY)) {
            localStorage.setItem(DB_KEY, JSON.stringify(SEED_USERS));
            console.log('Database initialized with seed data (v2).');
        }
    },

    // Get all users
    getUsers: (): UserBase[] => {
        const data = localStorage.getItem(DB_KEY);
        return data ? JSON.parse(data) : [];
    },

    // Add a new user (Registration)
    addUser: (user: any) => {
        const users = mockDB.getUsers();
        // Generate a random ID
        const newUser = { ...user, id: `new_${Date.now()}`, rating: 0, votes: 0 };
        users.push(newUser);
        localStorage.setItem(DB_KEY, JSON.stringify(users));
        return newUser;
    },

    // Update user status (Admin Action)
    updateUserStatus: (id: string, status: UserStatus) => {
        const users = mockDB.getUsers();
        const updatedUsers = users.map(u => 
            u.id === id ? { ...u, status } : u
        );
        localStorage.setItem(DB_KEY, JSON.stringify(updatedUsers));
    },

    // Login simulation
    login: (email: string): UserBase | undefined => {
        const users = mockDB.getUsers();
        // Simple mock login finding by email (case insensitive)
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },
    
    // Login by ID (for quick access buttons)
    loginById: (id: string): UserBase | undefined => {
        const users = mockDB.getUsers();
        return users.find(u => u.id === id);
    }
};