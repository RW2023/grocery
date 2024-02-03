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
  const [searchTerm, setSearchTerm] = useState('');
  const [mainIngredientFilter, setMainIngredientFilter] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let { data, error } = await supabase.from('recipes').select('*');

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

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (mainIngredientFilter
        ? recipe['Main Ingredient']
            ?.toLowerCase()
            .includes(mainIngredientFilter.toLowerCase())
        : true),
  );

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Heading title="Recipes" iconClass="fas fa-utensils" />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full mb-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by main ingredient..."
          className="input input-bordered w-full"
          value={mainIngredientFilter}
          onChange={(e) => setMainIngredientFilter(e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card bg-base-200 shadow-lg border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="card-body">
              <SubHeading title={recipe.name} iconClass="fas fa-recipe" />
              <p>
                Description: {recipe.description || 'No description available'}
              </p>
              <p>Main Ingredient: {recipe['Main Ingredient'] || 'N/A'}</p>
              <p className="badge badge-outline badge-accent">
                ID: {recipe.id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
