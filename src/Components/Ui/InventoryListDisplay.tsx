//src/Components/Ui/InventoryListDisplay.tsx
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
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Search items..."
          className="input input-bordered border-border w-full sm:w-2/3 md:w-2/3 lg:w-2/3 mb-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {filteredGroceryItems.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b border-border bg-base-100 rounded"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold bg-base-300 p-2 rounded border-border border drop-shadow-lg">
                  <span className="mr-1">{item.id}</span> {item.name}
                </div>
              </div>
              <span className="badge badge-primary badge-outline">
                Q: {item.quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {filteredGroceryItems.length === 0 && <p>No matching items found.</p>}
    </div>
  );
};

export default GroceryListDisplay;
