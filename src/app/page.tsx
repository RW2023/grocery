'use client';
import SectionCard from '@/Components/SectionCard';
import SubHeading from '@/Components/Ui/SubHeading';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-3">
        <h1 className="text-5xl  p-1 font-bold text-primary">Grocery App</h1>
      </div>
      <div className="container bg-background rounded-lg border border-border mx-auto grid md:grid-cols-3 grid-cols-1 gap-4 p-5">
        {/* Section 1 */}
       <SectionCard
          headingTitle="Shopping List"
          content={
            <ul>
              <li>Organize your grocery list</li>
              <li>Sort by aisle or category</li>
              <li>Check off items as you shop</li>
            </ul>
          }
          href={'/list'}
          buttonText="Shopping List"
        />

        {/* Section 2 */}
        <SectionCard
          headingTitle="Grocery Inventory"
          content={
            <ul>
              <li>Keep track of what you have</li>
              <li>Set expiration dates</li>
              <li>Get notified when items are expiring</li>
            </ul>
          }
          href={'/inventory'}
          buttonText="Grocery Inventory"
        />

        {/* Section 3 */}
        <SectionCard
          headingTitle="Meal Planning"
          content={
            <ul>
              <li>Plan your meals for the week</li>
              <li>Generate a shopping list from your meal plan</li>
              <li>Save your favorite recipes</li>
            </ul>
          }
          href={'/mealplanner'}
          buttonText="Meal Planning"
          />
      </div>
      <div className="container flex flex-col justify-center items-center p-4 my-6 mx-auto bg-background rounded-lg border border-border">
      <div className='card card-compact bg-base-100 shadow-xl w-full p-4'>
        <SubHeading title="Detailed Inventory" />
          <p className="py-2 text-primary">
            Enhanced search
          </p>
          <button
            type="button"
            className="btn btn-primary w-32"
            onClick={() => {
              window.location.href = '/devdash';
            }}
          >
            Dashboard
          </button>
      </div>
      </div>
    </>
  );
          }
