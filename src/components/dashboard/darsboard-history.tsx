  "use client";

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  // import { Button } from "@/components/ui/button";
  // import { ExternalLink } from "lucide-react";

  export function DonationHistory() {
    return (
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Charity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No donations found. Start making a difference today!
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
