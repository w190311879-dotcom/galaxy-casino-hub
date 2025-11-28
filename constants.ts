import { Banner, Game, User, Winner, Transaction } from "./types";

export const INITIAL_USER: User = {
  id: 'u_gen_xyz',
  name: 'CryptoKing',
  walletAddress: '0x71...9A23',
  avatar: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=CryptoKing&backgroundColor=b6e3f4',
  balance: 8888888,
  vipLevel: 7,
};

export const BANNERS: Banner[] = [
  { id: 'b1', imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1000&auto=format&fit=crop', title: 'SMASH & WIN', subtitle: 'Guaranteed Prized', link: '#' },
  { id: 'b2', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop', title: 'LUCKY WHEEL', subtitle: 'Spin for BTC', link: '#' },
];

export const RECENT_WINNERS: Winner[] = [
  { id: 'w1', wallet: 'User888', amount: 9999, gameName: 'Golden Egg', txHash: '0x...' },
  { id: 'w2', wallet: 'LuckyGuy', amount: 8888, gameName: 'Golden Egg', txHash: '0x...' },
  { id: 'w3', wallet: 'Winner1', amount: 7777, gameName: 'Golden Egg', txHash: '0x...' },
  { id: 'w4', wallet: 'Dragon', amount: 6666, gameName: 'Golden Egg', txHash: '0x...' },
  { id: 'w5', wallet: 'MoonBoy', amount: 2555, gameName: 'Golden Egg', txHash: '0x...' },
  { id: 'w6', wallet: 'Whale', amount: 333, gameName: 'Golden Egg', txHash: '0x...' },
];

export const GAMES: Game[] = [
  { 
    id: 'g1', 
    title: 'Smash Egg', 
    category: 'hash', 
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/golden-egg-5360049-4491763.png', 
    provider: 'PLAY GAME',
    hashRate: 'HOT'
  },
  { 
    id: 'g2', 
    title: 'Spin Wheel', 
    category: 'live', 
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/fortune-wheel-4993160-4158422.png?f=webp', 
    provider: 'PLAY GAME' 
  },
  { 
    id: 'g3', 
    title: 'Coin Predict', 
    category: 'defi', 
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-4987000-4155998.png?f=webp', 
    provider: 'PLAY GAME' 
  },
  { 
    id: 'g4', 
    title: 'Rocket Crash', 
    category: 'crash', 
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/rocket-3219468-2692254.png?f=webp', 
    provider: 'PLAY GAME' 
  },
  { 
    id: 'g5', 
    title: 'Coming Soon', 
    category: 'hash', 
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/megaphone-4020359-3336766.png?f=webp', 
    provider: 'STAY TUNED' 
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'All Games' },
  { id: 'hash', label: 'Hash' },
  { id: 'live', label: 'Live Casino' },
  { id: 'crash', label: 'Crash' },
  { id: 'defi', label: 'DeFi' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'deposit', amount: 5000, currency: 'USDT', status: 'completed', date: '2023-10-24 14:30' },
  { id: 't2', type: 'win', amount: 1200, currency: 'USDT', status: 'completed', date: '2023-10-24 15:45' },
  { id: 't3', type: 'bet', amount: 500, currency: 'USDT', status: 'completed', date: '2023-10-24 16:00' },
  { id: 't4', type: 'withdraw', amount: 2000, currency: 'USDT', status: 'pending', date: '2023-10-25 09:15' },
];