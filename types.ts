
export interface DonationPreset {
  id: string;
  amount: number;
  label: string;
  description: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Service' | 'Conference' | 'Retreat' | 'Community';
  location: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserStep {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  progress: number;
  nextTask: string;
}

export interface UserProfile {
  name: string;
  email: string;
  photoUrl?: string;
  memberSince: string;
  groups: string[];
  steps: UserStep[];
  preferences: {
    notifications: boolean;
    language: string;
    newsletter: boolean;
    fontSize: 'normal' | 'large' | 'extra';
    highContrast: boolean;
  };
}

export interface SystemStatus {
  aiConnected: boolean;
  networkLatency: number;
  pwaInstalled: boolean;
  storageUsed: string;
}

export interface DonationHistoryItem {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'Completed' | 'Pending';
}

export interface PhotoItem {
  id: string;
  url: string;
  event: string;
  description: string;
  aiCaption?: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  author: string;
  description: string;
  date: string;
  img: string;
  audioUrl: string;
  duration: string;
  type: 'audio' | 'video' | 'text';
}

export enum PaymentMethod {
  WAVE = 'Wave',
  ORANGE_MONEY = 'Orange Money',
  MTN_MONEY = 'MTN Money',
  MOOV = 'Moov Money',
  STRIPE = 'Card / Stripe',
  PAYPAL = 'PayPal'
}
