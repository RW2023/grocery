//src/Components/Ui/DetailedGroceryList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';
import { Database } from '@/lib/database.types';
import Loading from './Loading';

const DetailedGroceryListDisplay = () => {
  type GroceryItem = Database['public']['Tables']['grocery_inventory']['Row'];

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [healthFilter, setHealthFilter] = useState<
    'all' | 'healthy' | 'unhealthy'
  >('all');
  const [loading, setLoading] = useState(true);

  const fetchGroceryItems = async () => {
    const { data, error } = await supabase
      .from('grocery_inventory')
      .select('*');
    if (error) {
      console.error('Error fetching grocery items:', error.message);
    } else {
      setGroceryItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroceryItems();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleHealthFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setHealthFilter(e.target.value as 'all' | 'healthy' | 'unhealthy');
  };

const filteredGroceryItems = groceryItems.filter(
  (item) =>
    item.name.toLowerCase().includes(searchQuery) &&
    (healthFilter === 'all' ||
      (healthFilter === 'healthy' && item.Health === true) ||
      (healthFilter === 'unhealthy' && item.Health === false)),
);

  if (loading) return <Loading />;

  return (
    <div className="border-border border-2 rounded p-3 bg-base-300 m-3">
      <SubHeading title="Detailed Inventory" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search items..."
          className="input input-bordered border-border w-full mb-2 md:mb-0 md:w-1/3"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          title="Health Filter"
          className="select select-bordered w-full md:w-1/3"
          value={healthFilter}
          onChange={handleHealthFilterChange}
        >
          <option value="all">All Items</option>
          <option value="healthy">Healthy</option>
          <option value="unhealthy">Unhealthy</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroceryItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Food Group: {item.Food_Group || 'N/A'}</p>
              <p>Health: {item.Health ? 'Healthy' : 'Unhealthy'}</p>
              <p className='badge badge-success'>id: {item.id}</p>
            </div>
          </div>
        ))}
      </div>
      {filteredGroceryItems.length === 0 && <p>No matching items found.</p>}
    </div>
  );
};

export default DetailedGroceryListDisplay;
