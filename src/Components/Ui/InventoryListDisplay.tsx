// src/Components/Ui/InventoryListDisplay.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';
import { Database } from '@/lib/database.types';
import Loading from './Loading';

const GroceryListDisplay = () => {
  type GroceryItem = Database['public']['Tables']['grocery_inventory']['Row'];

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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

    // Real-time subscription
    const channel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'grocery_inventory' },
        (payload) => {
          console.log('Change received!', payload);
          fetchGroceryItems();
        },
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredGroceryItems = groceryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery),
  );

  if (loading) return <Loading />;

  return (
    <div className="border-border border-2 rounded p-3 bg-base-300 m-3">
      <SubHeading title="Inventory" />
      <div className="flex flex-col justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search items..."
          className="input input-bordered border-border w-full sm:w-2/3 md:w-2/3 lg:w-2/3"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroceryItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                <div className="rounded border-border text-sm">
                  ID:<span className="text-sm"> {item.id}</span>
                </div>
              </h2>
              <p className="badge badge-secondary">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      {filteredGroceryItems.length === 0 && <p>No matching items found.</p>}
    </div>
  );
};

export default GroceryListDisplay;
