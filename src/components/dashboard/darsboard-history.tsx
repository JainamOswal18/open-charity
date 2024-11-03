"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWallet } from "@/contexts/WalletContext";
import { useState, useEffect } from "react";
import { getDonationHistory } from "@/contexts/donationUtils";
import { ethers } from "ethers";

export function DonationHistory() {
  const { account } = useWallet();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonationHistory = async () => {
      if (account) {
        try {
          const history = await getDonationHistory(account);
          setDonations(history);
        } catch (error) {
          console.error("Error fetching donation history:", error);
        }
      }
    };

    fetchDonationHistory();
  }, [account]);

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Charity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.length > 0 ? (
            donations.map((donation: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{new Date(Number(donation.timestamp) * 1000).toLocaleString()}</TableCell>
                <TableCell>{donation.charity}</TableCell>
                <TableCell>{ethers.formatEther(BigInt(donation.amount.toString()))} ETH</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No donations found. Start making a difference today!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}