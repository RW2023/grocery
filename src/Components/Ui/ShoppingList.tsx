'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';
import { Database } from '@/lib/database.types';
import Loading from './Loading';

const ShoppingListDisplay = () => {
  type ShoppingItem = Database['public']['Tables']['shopping_list']['Row'];

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShoppingItems = async () => {
    const { data, error } = await supabase.from('shopping_list').select('*');
    if (error) {
      console.error('Error fetching shopping items:', error.message);
    } else {
      setShoppingItems(data || []);
    }
    setLoading(false);
  };

  const toggleItemBought = async (item: ShoppingItem) => {
    const { data, error } = await supabase
      .from('shopping_list')
      .update({ isbought: !item.isbought })
      .eq('id', item.id);

    if (error) {
      console.error('Error updating item:', error);
    } else {
      fetchShoppingItems(); // Refresh the list to show the updated status
    }
  };

  useEffect(() => {
    fetchShoppingItems();

    // Set up real-time subscription
    const channel = supabase
      .channel('custom-shopping-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'shopping_list' },
        (payload) => {
          console.log('Change received!', payload);
          fetchShoppingItems(); // Refresh items on change
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
      <SubHeading title="Shopping List" />
      <ul>
        {shoppingItems.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b border-border bg-base-100 rounded flex justify-between items-center"
          >
            <div className="text-lg font-semibold bg-base-300 p-2 rounded">
              <span className="mr-1">{item.id}</span> {item.name}
            </div>
            <span className="badge badge-primary badge-outline">
              Quantity: {item.quantity}
            </span>
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={item.isbought || false}
                onChange={() => toggleItemBought(item)}
              />

              <div className="swap-on">✓</div>
              <div className="swap-off">✕</div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListDisplay;
