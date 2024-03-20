import React, { useState } from 'react';
import SubHeading from '@/Components/Ui/SubHeading'; // Make sure this path is correct
import LoadingInline from '@/Components/Ui/LoadingInline'; // Make sure this path is correct

interface Meal {
  id: number;
  date: string;
  meal_type: string;
  recipe_id?: number;
}

interface MealsListProps {
  meals: Meal[];
  isLoading: boolean; // Pass isLoading as a prop if it's managed by a parent component
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
              <li key={meal.id} className="mb-2 bg-base-300">
                <span className="font-semibold">{meal.date}</span> -{' '}
                {meal.meal_type} - Recipe ID:{' '}
                <span className="badge badge-outline">{meal.recipe_id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MealsList;
