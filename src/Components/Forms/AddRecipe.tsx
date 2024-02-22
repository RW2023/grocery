
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface Recipe {
  id: number;
  name: string;
  description: string | null;
  'Main Ingredient': string | null;
}

interface AddRecipeProps {
  selectedRecipe?: Recipe;
  onRecipeSubmit: () => void;
}

const AddRecipe: React.FC<AddRecipeProps> = ({
  selectedRecipe,
  onRecipeSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mainIngredient, setMainIngredient] = useState('');

  useEffect(() => {
    if (selectedRecipe) {
      setName(selectedRecipe.name);
      setDescription(selectedRecipe.description || '');
      setMainIngredient(selectedRecipe['Main Ingredient'] || '');
    }
  }, [selectedRecipe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipeData = { name, description, 'Main Ingredient': mainIngredient };

    if (selectedRecipe) {
      // Update existing recipe
      await supabase
        .from('recipes')
        .update(recipeData)
        .eq('id', selectedRecipe.id);
    } else {
      // Add new recipe
      await supabase.from('recipes').insert([recipeData]);
    }
    onRecipeSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedRecipe ? 'Edit Recipe' : 'Add Recipe'}</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={mainIngredient}
        onChange={(e) => setMainIngredient(e.target.value)}
        placeholder="Main Ingredient"
      />
      <button type="submit">
        {selectedRecipe ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
};

export default AddRecipe;
