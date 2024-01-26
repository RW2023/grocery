'use client';
//src/Components/Ui/SubHeading.tsx
import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import SubHeading from '@/Components/Ui/SubHeading';

const UpdateGroceryItemForm = () => {
  const [itemId, setItemId] = useState('');
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    // Assuming 'itemId' is the ID of the item you want to update
    if (itemId && (newName || newQuantity > 0)) {
      const updates = {
        ...(newName && { name: newName }),
        ...(newQuantity > 0 && { quantity: newQuantity }),
      };

      const { data, error } = await supabase
        .from('grocery_inventory')
        .update(updates)
        .match({ id: itemId });

      if (error) {
        setIsError(true);
        setMessage('Error updating item: ' + error.message);
      } else {
        setMessage('Item updated successfully!');
        // Reset form fields
        setItemId('');
        setNewName('');
        setNewQuantity(0);
      }
    } else {
      setIsError(true);
      setMessage('Please enter a valid item ID, name, and quantity.');
    }
  };

  return (
    <>
      <div className="border-border border-1 rounded p-3 bg-base-200 m-3">
        <SubHeading title="Update Grocery Item" />
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
          <label htmlFor="itemId" className="label">
            <span className="label-text">Item ID:</span>
          </label>
          <input
            type="text"
            id="itemId"
            className="input input-bordered border-border w-full"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="newName" className="label">
            <span className="label-text">New Name:</span>
          </label>
          <input
            type="text"
            id="newName"
            className="input input-bordered border-border w-full"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="newQuantity" className="label">
            <span className="label-text">New Quantity:</span>
          </label>
          <input
            type="number"
            id="newQuantity"
            className="input input-bordered border-border w-full"
            value={newQuantity}
            onChange={(e) => setNewQuantity(parseFloat(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Update Item
        </button>
      </form>
    </>
  );
};

export default UpdateGroceryItemForm;
