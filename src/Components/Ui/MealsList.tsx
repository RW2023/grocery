import React from 'react';
import SubHeading from '@/Components/Ui/SubHeading'; // Adjust the import path if necessary

interface Meal {
  id: number;
  date: string;
  meal_type: string;
  recipe_id?: number;
}

interface MealsListProps {
  meals: Meal[];
}

const MealsList: React.FC<MealsListProps> = ({ meals }) => {
  return (
    <div className="text-base-content my-8">
      <SubHeading title="Meals for the Week" />
      <div className="flex flex-col items-center justify-center">
        <ul className="list-none">
          {meals.map((meal) => (
            <li key={meal.id} className="mb-2 bg-base-300">
              <span className="font-semibold">{meal.date}</span> -{' '}
              {meal.meal_type} - Recipe ID:{' '}
              <span className="badge badge-outline">{meal.recipe_id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealsList;
