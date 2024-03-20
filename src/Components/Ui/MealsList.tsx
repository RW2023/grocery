import React from 'react';
import SubHeading from '@/Components/Ui/SubHeading'; // Adjust the import path as necessary
import LoadingInline from '@/Components/Ui/LoadingInline'; // Adjust the import path as necessary

interface Recipe {
  id: number;
  name: string;
  description: string;
}

interface Meal {
  id: number;
  date: string;
  meal_type: string;
  recipe_id?: number;
  recipe?: Recipe; // Optionally include the recipe object
}

interface MealsListProps {
  meals: Meal[];
  isLoading: boolean;
}

const MealsList: React.FC<MealsListProps> = ({ meals, isLoading }) => {
  return (
    <div className="text-base-content my-8 p-1 bg-base-300 rounded border">
      <SubHeading title="Meals for the Week" />
      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <LoadingInline />
        ) : (
          <ul className="list-none">
            {meals.map((meal) => (
              <li key={meal.id} className="mb-2 bg-base-300 p-2">
                <div className="font-semibold">
                  {meal.date} - {meal.meal_type}
                </div>
                {meal.recipe ? (
                  <>
                    <div className="text-lg">{meal.recipe.name}</div>
                    <p>{meal.recipe.description}</p>
                  </>
                ) : (
                  <div className="text-gray-500">
                    No recipe details available.
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MealsList;
