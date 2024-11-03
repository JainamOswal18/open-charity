"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoDonationForm } from "@/components/donate/crypto-donation-form";
import { NFTDonationForm } from "@/components/donate/nft-donation-form";
import ConnectWallet from "@/components/connect-wallet";
import { useWallet } from "@/contexts/WalletContext";
// import { useAccount } from "wagmi";

export default function DonatePage() {
  const { account } = useWallet();
  const isConnected = !!account;

  if (!isConnected) {
    return <ConnectWallet />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-8">Make a Donation</h1>

      <Card className="max-w-2xl mx-auto">
        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="crypto" className="flex-1">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="nft" className="flex-1">NFT</TabsTrigger>
          </TabsList>
          <TabsContent value="crypto">
            <CryptoDonationForm />
          </TabsContent>
          <TabsContent value="nft">
            <NFTDonationForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
