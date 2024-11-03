"use client";

import { Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useWallet } from "@/contexts/WalletContext";

const ConnectWallet = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto p-8 text-center">
        <Wallet className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-4">
          {account ? "Wallet Connected" : "Connect Your Wallet"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {account
            ? `Connected address: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Please connect your wallet to access the dashboard and make donations."}
        </p>
        <Button
          size="lg"
          onClick={account ? disconnectWallet : connectWallet}
        >
          {account ? "Disconnect Wallet" : "Connect Wallet"}
        </Button>
      </Card>
    </div>
  );
}

export default ConnectWallet;