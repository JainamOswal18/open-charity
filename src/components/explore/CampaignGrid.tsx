import CharityCard from '@/components/CharityCard';

interface CampaignGridProps {
  campaigns: any[];
}

export function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campaigns.map((campaign, index) => (
        <CharityCard
          key={index}
          name={campaign.name}
          address={campaign.address}
          amountRaised={campaign.amountRaised}
          amountNeeded={campaign.goal}
          category={campaign.category}
        />
      ))}
    </div>
  );
}