//src/app/page.tsx

export default function Home(){
  return (
    <>
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl m-1 p-1">Grocery App</h1>
    </div>
    <div className="container min-h-screen bg-background rounded border border-1 mx-auto grid md:grid-cols-3 grid-cols-1 gap-4">
      <div className="col-span-3 md:col-span-1">
        <div className="border border-1">box 1</div>
      </div>
      <div className="col-span-3 md:col-span-1">
        <div className="border border-1">box 2</div>
      </div>
      <div className="col-span-3 md:col-span-1">
        <div className="border border-1">box 3</div>
      </div>
    </div>
    </>
  );
}