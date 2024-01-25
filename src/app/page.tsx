export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-3">
        <h1 className="text-5xl m-1 p-1 font-bold text-primary">Grocery App</h1>
      </div>
      <div className="container bg-background rounded-lg border border-border mx-auto grid md:grid-cols-3 grid-cols-1 gap-4 p-5">
        {/* Section 1 */}
        <div className="card card-compact bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-secondary">Grocery Inventory</h2>
            <ul>
              <li>Determine stock levels at a glance</li>
              <li>Quickly add new items</li>
              <li>View totals at a glance</li>
            </ul>
            <div className="card-actions justify-end">
              <button type="button" className="btn btn-primary">
                Inventory Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="card card-compact bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-secondary">Meal Planner</h2>
            <ul>
              <li>Plan meals for the entire week</li>
              <li>View recipes for each meal</li>
              <li>Generate a shopping list</li>
            </ul>
            <div className="card-actions justify-end">
              <button type="button" className="btn btn-primary">
                Meal Planner
              </button>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="card card-compact bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-secondary">Recipe Collection</h2>
            <ul>
              <li>Discover new recipes and add your favorites</li>
              <li>Rate and review recipes</li>
              <li>Easily access your recipe collection</li>
            </ul>
            <div className="card-actions justify-end">
              <button type="button" className="btn btn-primary">
                Explore Recipes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col justify-center items-center p-4 my-6 mx-auto bg-background rounded-lg border border-border">
        <h2 className="text-2xl font-semibold text-primary">Special Offers</h2>
        <p className="py-2 text-secondary">
          Check out our latest deals and discounts on select products.
        </p>
      </div>
    </>
  );
}
