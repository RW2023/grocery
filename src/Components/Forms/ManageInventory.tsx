'use client';
//src/Components/Forms/AddShoppingList.tsx
import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';

const ManageGroceryItemForm = () => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [itemId, setItemId] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    if (isUpdateMode) {
      // Update existing item logic
      if (itemId && (itemName || quantity > 0)) {
        const updates = {
          ...(itemName && { name: itemName }),
          ...(quantity > 0 && { quantity: quantity }),
        };

        const { data, error } = await supabase
          .from('grocery_inventory')
          .update(updates)
          .match({ id: itemId });

        handleResponse(error, 'updated');
      } else {
        setIsError(true);
        setMessage(
          'Please enter a valid item ID, name, and quantity for update.',
        );
      }
    } else {
      // Add new item logic
      if (itemName && quantity > 0) {
        const { data, error } = await supabase
          .from('grocery_inventory')
          .insert([{ name: itemName, quantity }])
          .select();

        handleResponse(error, 'added');
      } else {
        setIsError(true);
        setMessage('Please enter a valid item name and quantity for addition.');
      }
    }
  };

  const handleResponse = (error: any, action: string) => {
    if (error) {
      setIsError(true);
      setMessage(`Error ${action} item: ${error.message}`);
    } else {
      setMessage(`Item ${action} successfully!`);
      resetForm();
    }
  };


  const resetForm = () => {
    setItemName('');
    setQuantity(0);
    setItemId('');
  };

  return (
    <>
      <div className="border-border border-1 rounded p-3 bg-base-200 m-3">
        <SubHeading
          title={isUpdateMode ? 'Update Grocery Item' : 'Add Grocery Item'}
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
        {isUpdateMode && (
          <div className="form-group mb-4">
            <label htmlFor="itemId" className="label">
              <span className="label-text">Item ID (for update):</span>
            </label>
            <input
              type="text"
              id="itemId"
              className="input input-bordered w-full"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
            />
          </div>
        )}
        <div className="form-group mb-4">
          <label htmlFor="itemName" className="label">
            <span className="label-text">
              {isUpdateMode ? 'New Name:' : 'Item Name:'}
            </span>
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
            <span className="label-text">
              {isUpdateMode ? 'New Quantity:' : 'Quantity:'}
            </span>
          </label>
          <input
            type="number"
            id="quantity"
            className="input input-bordered w-full"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          {isUpdateMode ? 'Update Item' : 'Add Item'}
        </button>
        <button
          type="button"
          className="btn btn-secondary w-full mt-4"
          onClick={() => setIsUpdateMode(!isUpdateMode)}
        >
          {isUpdateMode ? 'Switch to Add Mode' : 'Switch to Update Mode'}
        </button>
      </form>
    </>
  );
};

export default ManageGroceryItemForm;
