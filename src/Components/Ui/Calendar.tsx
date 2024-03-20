//src/Components/Ui/Calendar.tsx
'use client';
import { FC, useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient'; // Make sure to provide the correct path
import SubHeading from '@/Components/Ui/SubHeading'; // Make sure to provide the correct path
import MealsList from './MealsList';

interface Props {}

interface Meal {
  id: number;
  date: string;
  meal_type: string;
  recipe_id?: number;
}

const Calendar: FC<Props> = (): JSX.Element => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMealsForMonth = async (year: number, month: number) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const { data, error } = await supabase
        .from('meal_planning')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0]);

    if (error) {
        console.error('Error fetching meals:', error);
        return;
    }

    setMeals(data || []);
    console.log('Fetched meals:', data);
    };

    fetchMealsForMonth(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

  // Calculate the number of days in the current month and the first day of the month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (prev === 0 ? prev - 1 : prev));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (prev === 11 ? prev + 1 : prev));
  };

  // Generate calendar dates
  const calendarDates = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    // push empty cells at the start of the month
    calendarDates.push(
      <div key={`empty-${i}`} className="day-cell empty bg-transparent"></div>,
    );
  }
  for (let day = 1; day <= daysInMonth; day++) {
    // Find meals for this date
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    const daysMeals = meals.filter((meal) => meal.date === dateStr);
    console.log('Days meals:', daysMeals);


    calendarDates.push(
      <div key={day} className="day-cell">
        <div className="date">{day}</div>
        {daysMeals.map((meal) => (
          <div key={meal.id} className="meal">
            {meal.meal_type}: ID: {meal.recipe_id}
          </div>
        ))}
      </div>,
    );
  }

  return (
    <div className="calendar bg-base-200 p-4 rounded-box min-h-screen">
      <div className="calendar-header flex justify-between items-center mb-4">
        <button className="btn btn-sm btn-ghost" onClick={goToPreviousMonth}>
          Prev
        </button>
        <span className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button className="btn btn-sm btn-ghost" onClick={goToNextMonth}>
          Next
        </button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-4">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="day-of-week text-sm font-bold uppercase "
          >
            {dayName}
          </div>
        ))}
        {calendarDates.map((date, index) => (
          <div
            key={index}
            className={`day-cell ${
              !date ? 'bg-transparent' : 'bg-base-100 hover:bg-base-300'
            } rounded-lg shadow p-2 transition duration-200 ease-in-out`}
            style={{ border: '1px solid #ccc' }} // Add this line to add a border
          >
            {date}
          </div>
        ))}
      </div>
      <div>
       <MealsList meals={meals} />
      </div>
    </div>
  );
};

export default Calendar;
