'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';
import { Database } from '@/lib/database.types';
import Loading from './Loading';

const GroceryListDisplay = () => {
  type GroceryItem = Database['public']['Tables']['grocery_inventory']['Row'];

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
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
          fetchGroceryItems(); // Refresh items on change
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

  if (loading) return <Loading />;

  return (
    <div className="border-border border-2 rounded p-3 bg-base-200 m-3">
      <SubHeading title="Grocery List" />
      <ul>
        {groceryItems.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b border-border bg-base-100 rounded"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold bg-base-300 p-2 rounded">
                 <span className='mr-1'>{item.id}</span> {item.name}
                </div>
              </div>
              <span className="badge badge-primary badge-outline">
                Q: {item.quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {groceryItems.length === 0 && <p>No items in the grocery list.</p>}
    </div>
  );
};

export default GroceryListDisplay;
