//src/Components/Forms/AddShoppingItem.tsx
'use client';
import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';

const AddShoppingItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [itemId, setItemId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleItemIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemId(value ? Number(value) : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    if (itemName && quantity > 0) {
      let data, error;
      if (isUpdateMode && itemId) {
        // Update existing item
        ({ data, error } = await supabase
          .from('shopping_list')
          .update({ name: itemName, quantity })
          .eq('id', itemId));
      } else {
        // Add new item
        ({ data, error } = await supabase
          .from('shopping_list')
          .insert([{ name: itemName, quantity }])
          .select());
      }

      if (error) {
        setIsError(true);
        setMessage(
          `Error ${isUpdateMode ? 'updating' : 'adding'} item: ${
            error.message
          }`,
        );
      } else {
        setMessage(`Item ${isUpdateMode ? 'updated' : 'added'} successfully!`);
        resetForm();
      }
    } else {
      setIsError(true);
      setMessage('Please enter a valid item name and quantity.');
    }
  };

  const resetForm = () => {
    setItemName('');
    setQuantity(0);
    setIsUpdateMode(false);
    setItemId(null);
  };

  return (
    <>
      <div className="border-border border-1 rounded p-3 bg-base-200 m-3">
        <SubHeading
          title={isUpdateMode ? 'Update Shopping Item' : 'Add Shopping Item'}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="form-control w-full max-w-xs mx-auto border-border border-2 rounded p-3 bg-base-300 m-3"
      >
        {message && (
          <div
            className={`alert ${
              isError ? 'alert-error' : 'alert-success'
            } mb-4`}
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
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
          />
        </div>
        {isUpdateMode && (
          <div className="form-group mb-4">
            <label htmlFor="itemId" className="label">
              <span className="label-text">Item ID (for update):</span>
            </label>
            <input
              type="number"
              id="itemId"
              className="input input-bordered w-full"
              value={itemId ?? ''}
              onChange={handleItemIdChange}
            />
          </div>
        )}
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsUpdateMode(!isUpdateMode)}
          >
            {isUpdateMode ? 'Switch to Add Mode' : 'Switch to Update Mode'}
          </button>
          <button type="submit" className="btn btn-primary">
            {isUpdateMode ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddShoppingItemForm;
