export default function Loading() {
  const placeholders = Array.from({ length: 8 }, (_, index) => index);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4 place-items-center max-h-[85vh] overflow-hidden">
      {placeholders.map((item) => (
        <div
          key={item}
          className="h-72 md:h-72 lg:h-60 w-60 xl:h-72 border rounded-md shadow-lg mx-[2rem] my-[1rem] bg-gray-100"
        ></div>
      ))}
    </div>
  );
}
