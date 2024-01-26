'use client';
import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';


const AddGroceryItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    if (itemName && quantity > 0) {
      const { data, error } = await supabase
        .from('grocery_inventory')
        .insert([{ name: itemName, quantity }])
        .select();

      if (error) {
        setIsError(true);
        setMessage('Error adding item: ' + error.message);
      } else {
        setMessage('Item added successfully!');
        setItemName('');
        setQuantity(0);
      }
    } else {
      setIsError(true);
      setMessage('Please enter a valid item name and quantity.');
    }
  };

  return (
<>
<div className='border border-1 rounded p-3 bg-base-200 m-3'>
    <SubHeading title="Add Grocery Item"  />
</div>
    <form
      onSubmit={handleSubmit}
      className="form-control w-full max-w-xs mx-auto border border-1 rounded p-3 bg-base-300 m-3"
    >
      {message && (
        <div
          className={`alert ${isError ? 'alert-error' : 'alert-success'} mb-4`}
        >
          {message}
        </div>
      )}
      <div className="form-group mb-4">
        <label htmlFor="itemName" className="label">
          <span className="label-text">Item Name:</span>
        </label>
        <input
          type="text"
          id="itemName"
          className="input input-bordered w-full"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="quantity" className="label">
          <span className="label-text">Quantity:</span>
        </label>
        <input
          type="number"
          id="quantity"
          className="input input-bordered w-full"
          value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Add Item
      </button>
    </form>
</>
  );
};

export default AddGroceryItemForm;
