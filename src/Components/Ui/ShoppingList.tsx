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
  const [searchTerm, setSearchTerm] = useState('');

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
    const { error } = await supabase
      .from('shopping_list')
      .update({ isbought: !item.isbought })
      .eq('id', item.id);

    if (error) {
      console.error('Error updating item:', error);
    } else {
      fetchShoppingItems(); // Refresh the list to show the updated status
    }
  };

  const deleteItem = async (itemId: number) => {
    const { error } = await supabase
      .from('shopping_list')
      .delete()
      .match({ id: itemId });
    if (error) {
      console.error('Error deleting item:', error);
    } else {
      fetchShoppingItems(); // Refresh the list
    }
  };

  const clearList = async () => {
    if (window.confirm('Are you sure you want to clear the entire list?')) {
      try {
        // Loop through each item and delete it
        for (const item of shoppingItems) {
          const { error } = await supabase
            .from('shopping_list')
            .delete()
            .match({ id: item.id });
          if (error) throw error;
        }
        fetchShoppingItems(); // Refresh the list after clearing
      } catch (error) {
        console.error('Error clearing the list:', error);
      }
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

  const filteredItems = shoppingItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <Loading />;

  return (
    <div className="border-border border-2 rounded p-3 bg-base-200 m-3">
      <SubHeading title="Shopping List" />
      <div className="m-3 flex justify-center items-center">
        <input
          type="text"
          className="input input-bordered border-border w-full sm:w-2/3 md:w-2/3 lg:w-2/3"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl p-3">
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <div className="card-actions justify-end">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    checked={item.isbought || false}
                    onChange={() => toggleItemBought(item)}
                  />
                  <div className="swap-on">✓ Bought</div>
                  <div className="swap-off">Pending</div>
                </label>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-warning mt-4"
        onClick={clearList}
      >
        Clear List
      </button>
    </div>
  );
};

export default ShoppingListDisplay;
