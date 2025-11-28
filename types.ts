export interface User {
  id: string;
  name: string;
  walletAddress: string;
  avatar: string;
  balance: number;
  vipLevel: number;
}

export interface Game {
  id: string;
  title: string;
  category: 'hash' | 'defi' | 'slots' | 'live' | 'crash';
  image: string;
  provider: string;
  hashRate?: string;
}

export interface Winner {
  id: string;
  wallet: string;
  amount: number;
  gameName: string;
  txHash: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'bet' | 'win';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}