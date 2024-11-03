"use client";

import { Card } from "@/components/ui/card";
import { Heart, Gem, DollarSign } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useState, useEffect } from "react";
import { getDonationHistory } from "@/contexts/donationUtils";
import { ethers } from "ethers";

export function DashboardStats() {
  const { account } = useWallet();
  const [totalDonated, setTotalDonated] = useState("0.00");
  const [causesSupported, setCausesSupported] = useState(0);

  useEffect(() => {
    const fetchDonationStats = async () => {
      if (account) {
        try {
          const donations = await getDonationHistory(account);
          let total = 0n; // Initialize as BigInt
          const charities = new Set();
          
          donations.forEach((donation: any) => {
            // Ensure donation.amount is treated as a BigInt
            total += BigInt(donation.amount.toString());
            charities.add(donation.charity);
          });
          
          setTotalDonated(ethers.formatEther(total));
          setCausesSupported(charities.size);
        } catch (error) {
          console.error("Error fetching donation stats:", error);
        }
      }
    };

    fetchDonationStats();
  }, [account]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Donated</p>
            <h3 className="text-2xl font-bold">{totalDonated} ETH</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Causes Supported</p>
            <h3 className="text-2xl font-bold">{causesSupported}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Gem className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">NFTs Donated</p>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}