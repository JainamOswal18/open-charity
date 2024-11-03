import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CharityCardProps {
  name: string;
  address: string;
  amountRaised: number;
  amountNeeded: number;
}

const CharityCard: React.FC<CharityCardProps> = ({ name, address, amountRaised, amountNeeded }) => {
  const progress = (amountRaised / amountNeeded) * 100;

  return (
    <Card className="p-6 mb-4">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-2">Address: {address}</p>
      <div className="mb-2">
        <Progress value={progress} className="w-full" />
      </div>
      <p className="text-sm">
        {amountRaised.toFixed(2)} ETH raised of {amountNeeded.toFixed(2)} ETH goal
      </p>
    </Card>
  );
};

export default CharityCard;