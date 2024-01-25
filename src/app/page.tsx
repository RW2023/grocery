//src/app/page.tsx

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-3">
        <h1 className="text-5xl m-1 p-1">Grocery App</h1>
      </div>
      <div className="container bg-background rounded border border-1 mx-auto grid md:grid-cols-3 grid-cols-1 gap-4 m-5">
        <div className="col-span-3 md:col-span-1 p-4 card-compact border border-1 rounded-md bg-base-200 m-2 shadow-md">
          <div className="title">
            <div className="p-1">
              <h2>Section 1</h2>
            </div>
          </div>
          <div className="card-body">
            <p>Body Text</p>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1 p-4 card-compact border border-1 rounded-md bg-base-200 m-2 shadow-md">
          <div className="title">
            <div className="p-1">
              <h2>Section 2</h2>
            </div>
          </div>
          <div className="card-body">
            <p>Body Text</p>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1 p-4 card-compact border border-1 rounded-md bg-base-200 m-2 shadow-md">
          <div className="title">
            <div className="p-1">
              <h2>Section 3</h2>
            </div>
          </div>
          <div className="card-body">
            <p>Body Text</p>
          </div>
        </div>
      </div>
      <div className="container flex flex-col justify-between items-center title border border-1 p-1 my-6 mx-auto bg-background">
        <div className="p-1">
          <h2 className="text-2xl">Middle Section</h2>
          <div>
            <p>Body Text</p>
          </div>
        </div>
      </div>
    </>
  );
}