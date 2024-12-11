import { atom } from 'jotai';

export interface User {
  id: number;
  nickname: string;
  email: string;
  token: string;
}

export const currentUserAtom = atom<{
  id: number;
  nickname: string;
  isAdmin: boolean;
} | null>(null);
