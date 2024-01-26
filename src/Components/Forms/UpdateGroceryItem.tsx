'use client';
//src/Components/Ui/SubHeading.tsx
import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const UpdateGroceryItemForm = () => {
  const [itemId, setItemId] = useState('');
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const { data, error } = await supabase
    .from('grocery_inventory')
    .update({ name: newName, quantity: newQuantity })
    .match({ id: itemId });

  if (error) {
    console.error('Error updating item:', error);
  } else {
    console.log('Item updated:', data);
    // Optionally, refresh the items list
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Quantity"
        value={newQuantity}
        onChange={(e) => setNewQuantity(parseInt(e.target.value))}
      />
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateGroceryItemForm;
