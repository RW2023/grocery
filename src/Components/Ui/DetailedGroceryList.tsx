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

  if (loading) return <Loading />;

  return (
    <div className="border-border border-2 rounded p-3 bg-base-300 m-3">
      <SubHeading title="Detailed Inventory" />
      <ul>
        {groceryItems.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b border-border bg-base-100 rounded"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold bg-base-300 p-2 rounded border-border border drop-shadow-lg">
                  <span className="mr-1">{item.id}</span> {item.name}
                </div>
                {/* Displaying additional information */}
                <div className="mt-2 text-sm">
                  <strong>Quantity:</strong> {item.quantity}
                </div>
                <div className="text-sm">
                  <strong>Food Group:</strong> {item.Food_Group || 'N/A'}
                </div>
                <div className="text-sm">
                  <strong>Health:</strong>{' '}
                  {item.Health ? 'Healthy' : 'Unhealthy'}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {groceryItems.length === 0 && <p>No matching items found.</p>}
    </div>
  );
};

export default DetailedGroceryListDisplay;
