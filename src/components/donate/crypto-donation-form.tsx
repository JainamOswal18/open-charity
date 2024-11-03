"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { donateCrypto } from "@/contexts/donationUtils";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/components/ui/use-toast";
// import { toast } from "@/components/ui/use-toast";
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
  const { account } = useWallet();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      charity: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submission started", values);
    // if (!account) {
    //   toast({
    //     title: "Wallet not connected",
    //     description: "Please connect your wallet to make a donation.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsLoading(true);
    setTransactionHash(null);

    try {
      console.log("Initiating transaction");
      toast({
        title: "Transaction Initiated",
        description: "Please confirm the transaction in your wallet.",
      });

      const receipt = await donateCrypto(
        CHARITY_ADDRESSES[values.charity as keyof typeof CHARITY_ADDRESSES],
        values.amount
      );

      console.log("Transaction complete", receipt);
      setTransactionHash(receipt.transactionHash);
      toast({
        title: "Donation Successful",
        description: `Transaction complete! Hash: ${receipt.transactionHash}`,
        // action: (
        //   <a
        //     href={`https://testnet.aiascan.com/tx/${receipt.transactionHash}`}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     className="underline hover:text-blue-600"
        //   >
        //     View Transaction
        //   </a>
        // ),
      });
      console.log("Toast called");
    } catch (error: any) {
      console.error("Transaction failed", error);
      toast({
        title: "Donation Failed",
        description: error.message || "An error occurred during the donation process",
        variant: "destructive",
      });
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

      {/* Status Messages */}
      {isLoading && (
        <p className="mt-4 text-yellow-500 text-center">
          Transaction Pending... Please wait.
        </p>
      )}
      {transactionHash && (
        <p className="mt-4 text-green-500 text-center">
          Transaction Complete!{" "}
          <a
            href={`https://testnet.aiascan.com/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-700"
          >
            View Transaction
          </a>
        </p>
      )}
    </div>
  );
}


// export function CryptoDonationForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (!account) {
//       toast({
//         title: "Wallet not connected",
//         description: "Please connect your wallet to make a donation.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const receipt = await donateCrypto(CHARITY_ADDRESSES[values.charity], values.amount);
//       toast({
//         title: "Donation Successful",
//         description: `Transaction hash: ${receipt.transactionHash}`,
//       });
//     } catch (error) {
//       toast({
//         title: "Donation Failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="p-6">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="charity"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Charity</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a charity" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="charity1">Save the Children</SelectItem>
//                     <SelectItem value="charity2">Red Cross</SelectItem>
//                     <SelectItem value="charity3">UNICEF</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="amount"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Amount (ETH)</FormLabel>
//                 <FormControl>
//                   <Input placeholder="0.0" {...field} type="number" step="0.01" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="message"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Message (Optional)</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Add a message to your donation" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full">
//             Donate
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
