
export type Language = 'en' | 'fr' | 'ar';

export interface Campaign {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: 'Social' | 'Eco' | 'Education' | 'Emergency' | 'Health';
  goal: number;
  raised: number;
  imageUrl: string;
  donorsCount: number;
}

// Fix: Changed 'interface' to 'type' as a union of string literals cannot be declared as an interface.
export type View = 'home' | 'campaigns' | 'success';
