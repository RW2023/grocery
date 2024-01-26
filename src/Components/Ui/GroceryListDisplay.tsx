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
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('grocery_inventory')
        .select('*');

      if (error) throw error;
      setGroceryItems(data as GroceryItem[]);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching grocery items:', err.message);
      } else {
        console.error('An unexpected error occurred:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceryItems();
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
                   {item.name}
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