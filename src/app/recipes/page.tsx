//src/app/recipes/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Loading from '@/Components/Ui/Loading';

type Recipe = {
  id: number;
  name: string;
  description: string | null;
  'Main Ingredient': string | null;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let { data, error } = await supabase
          .from('recipes') // Removed <Recipe> here
          .select('*');

        if (error) throw error;
        setRecipes(data || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          {/* Add more details if needed */}
        </div>
      ))}
    </div>
  );
}
