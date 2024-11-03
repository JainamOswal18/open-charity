"use client";

import React from 'react'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useWallet } from '@/contexts/WalletContext'

const Navbar = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <nav className='border-b'>
      <div className='flex h-16 items-center px-4 container mx-auto'>
        <div className='flex items-center space-x-2'>
          <Heart className='h-6 w-6 text-red-500 ' />
          <Link href={'/'} className='text-xl font-bold'>Opencharity</Link>
        </div>
        <div className='flex items-center ml-auto space-x-4'>
          <Link href={"/"}>
            <Button variant="ghost" >Home</Button>
          </Link>
          <Link href={"/explore"}>
            <Button variant="ghost" >Explore</Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Button onClick={account ? disconnectWallet : connectWallet}>
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      </div>
    </nav >
  )
}

export default Navbar