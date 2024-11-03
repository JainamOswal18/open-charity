import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CharityCardProps {
  name: string;
  address: string;
  amountRaised: number | undefined;
  amountNeeded: number;
  category: string;
}

const CharityCard: React.FC<CharityCardProps> = ({ name, address, amountRaised, amountNeeded, category }) => {
  const progress = amountRaised !== undefined ? (amountRaised / amountNeeded) * 100 : 0;

  return (
    <Card className="p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <Badge>{category}</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4 truncate" title={address}>Address: {address}</p>
      <div className="mb-2">
        <Progress value={progress} className="w-full" />
      </div>
      <p className="text-sm mb-4">
        {amountRaised !== undefined ? `${amountRaised.toFixed(2)} ETH raised of ` : 'Loading... '}
        {amountNeeded.toFixed(2)} ETH goal
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        {progress.toFixed(1)}% complete
      </p>
    </Card>
  );
};

export default CharityCard;