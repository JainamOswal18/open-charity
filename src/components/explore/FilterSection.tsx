import { Button } from '@/components/ui/button';

interface FilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function FilterSection({ selectedCategory, setSelectedCategory }: FilterSectionProps) {
  const categories = ['All', 'Children', 'Disaster Relief', 'Healthcare', 'Environment'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>
      <div className="flex flex-col space-y-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="justify-start"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}