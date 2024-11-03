"use client";

import { useState, useEffect } from 'react';
import { ExploreHeader } from './ExploreHeader';
import { FilterSection } from './FilterSection';
import { CampaignGrid } from './CampaignGrid';
import { getCharityInfo } from '@/contexts/donationUtils';

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
          const amountRaised = await getCharityInfo(charity.address);
          return {
            ...charity,
            amountRaised: parseFloat(amountRaised),
          };
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
      <ExploreHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <FilterSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="lg:col-span-3">
          <CampaignGrid campaigns={filteredData} />
        </div>
      </div>
    </main>
  );
}