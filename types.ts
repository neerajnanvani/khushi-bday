
export interface WishVibe {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
}

export interface GeneratedWish {
  text: string;
  vibe: string;
}

export enum CakeState {
  LIT = 'LIT',
  BLOWN = 'BLOWN'
}

export interface MediaItem {
  url: string;
  type: 'image' | 'video';
}
