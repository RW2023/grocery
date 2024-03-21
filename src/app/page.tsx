'use client';
import SectionCard from '@/Components/SectionCard';
import SubHeading from '@/Components/Ui/SubHeading';
import Heading from '@/Components/Ui/Heading';

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-3">
        <Heading title="grocery & wine" />
      </div>
      <div className="container bg-background rounded-lg border border-border mx-auto grid md:grid-cols-3 grid-cols-1 gap-4 p-5">
        {/* Section 1 */}
        <SectionCard
          headingTitle="Shopping List"
          content={
            <ul className="list-disc list-inside">
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
            <ul className="list-disc list-inside">
              <li>Keep track of what you have</li>
              <li>Analyze and visualize</li>
              <li>Discover over and under stock</li>
            </ul>
          }
          href={'/inventory'}
          buttonText="Grocery Inventory"
        />

        {/* Section 3 */}
        <SectionCard
          headingTitle="Meal Planner"
          content={
            <ul className="list-disc list-inside">
              <li>Organize Weekly Meals</li>
              <li>Calendar view to see 30 days in advance</li>
              <li>Collect family meal data for analysis</li>
            </ul>
          }
          href={'/mealplanner'}
          buttonText="Meal Planner"
        />
      </div>
      <div className="container flex flex-col justify-center items-center p-4 my-6 mx-auto bg-background rounded-lg border border-border list-none">
        <div className="card card-compact bg-base-100 shadow-xl w-full p-4 list-disc list-inside">
          <SubHeading title="Inventory Dashboard" />
          <ul className=" list-disc list-inside">
            <li>Crud operations for inventory</li>
            <li>Search inventory items by name or category</li>
            <li>More features will be addded</li>
          </ul>
          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-primary w-32 "
              onClick={() => {
                window.location.href = '/devdash';
              }}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
