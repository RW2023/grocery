//src/app/recipes/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Loading from '@/Components/Ui/Loading';
import Heading from '@/Components/Ui/Heading';
import SubHeading from '@/Components/Ui/SubHeading';

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
    <div className="container mx-auto p-4">
      <Heading title="Recipes" iconClass="fas fa-utensils" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card bg-base-200 shadow-xl rounded-lg overflow-hidden"
          >
            <div className="card-body">
              <SubHeading title={recipe.name} iconClass="fas fa-recipe" />
              <p>{recipe.description || 'No description available'}</p>
              {/* Add more details if needed */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Recipe</button>
                {/* Additional actions can be added here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
