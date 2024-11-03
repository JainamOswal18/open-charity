"use client";

import { useState, useEffect } from 'react';
import { ExploreHeader } from './ExploreHeader';
import { FilterSection } from './FilterSection';
import { CampaignGrid } from './CampaignGrid';
import { getCharityInfo } from '@/contexts/donationUtils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Define charity data
const CHARITIES = [
  { name: "Save the Children", address: "0x74898bAFa92362d15F95Cb24ba2A50A16d3C7312", goal: 500, category: "Children" },
  { name: "Red Cross", address: "0x3906d2c479a5903D61e9C9B882Ec78c66a4FfaE9", goal: 500, category: "Disaster Relief" },
  { name: "UNICEF", address: "0x33E07F41CC11920A9eE00f434B7e14df1eB5cBce", goal: 500, category: "Children" },
];

export default function ExploreView() {
  const [charityData, setCharityData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchCharityData = async () => {
      const data = await Promise.all(
        CHARITIES.map(async (charity) => {
          try {
            const amountRaised = await getCharityInfo(charity.address);
            return {
              ...charity,
              amountRaised: amountRaised !== undefined ? parseFloat(amountRaised) : undefined,
            };
          } catch (error) {
            console.error(`Error fetching data for ${charity.name}:`, error);
            return {
              ...charity,
              amountRaised: undefined,
            };
          }
        })
      );
      setCharityData(data);
      setFilteredData(data);
    };

    fetchCharityData();
  }, []);

  useEffect(() => {
    const filtered = charityData.filter(charity => 
      charity.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || charity.category === selectedCategory)
    );
    setFilteredData(filtered);
  }, [searchTerm, selectedCategory, charityData]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <ExploreHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Link href="/donate" passHref>
          <Button size="lg">Donate Now</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <FilterSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="lg:col-span-3">
          <CampaignGrid campaigns={filteredData} />
        </div>
      </div>
    </main>
  );
}