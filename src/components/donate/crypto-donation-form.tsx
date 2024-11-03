"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { donateCrypto } from "@/contexts/donationUtils";
import { useWallet } from "@/contexts/WalletContext";
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  charity: z.string().min(1, "Please select a charity"),
  message: z.string().optional(),
});

type CharityAddresses = {
  [key: string]: string;
};

const CHARITY_ADDRESSES: CharityAddresses = {
  charity1: "0x74898bAFa92362d15F95Cb24ba2A50A16d3C7312",
  charity2: "0x3906d2c479a5903D61e9C9B882Ec78c66a4FfaE9",
  charity3: "0x33E07F41CC11920A9eE00f434B7e14df1eB5cBce"
};

export function CryptoDonationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { account } = useWallet();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      charity: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
      setStatusMessage("Wallet not connected. Please connect your wallet to make a donation.");
      return;
    }

    setIsLoading(true);
    setTransactionHash(null);
    setStatusMessage("Transaction Initiated. Please confirm the transaction in your wallet.");

    try {
      const receipt = await donateCrypto(
        CHARITY_ADDRESSES[values.charity as keyof typeof CHARITY_ADDRESSES],
        values.amount
      );

      setTransactionHash(receipt.transactionHash);
      setStatusMessage("Donation Successful! Transaction complete.");
      
      // Refresh the explore page to update charity data
      router.refresh();
    } catch (error: any) {
      setStatusMessage(error.message || "An error occurred during the donation process.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="charity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Charity</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a charity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="charity1">Save the Children</SelectItem>
                    <SelectItem value="charity2">Red Cross</SelectItem>
                    <SelectItem value="charity3">UNICEF</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (ETH)</FormLabel>
                <FormControl>
                  <Input placeholder="0.0" {...field} type="number" step="0.01" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Add a message to your donation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Donate"}
          </Button>
        </form>
      </Form>

      {/* Status Message Display */}
      {statusMessage && (
        <p className="mt-4 text-center">
          {statusMessage}
        </p>
      )}
      
      
    </div>
  );
}
