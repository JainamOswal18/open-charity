"use client";

import { WalletProvider } from '@/contexts/WalletContext';

export function ClientWalletProvider({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}