export default function LoadingDetails() {
  return (
    <div className="flex flex-col lg:flex-row justify-around w-[80%] mx-auto px-[1rem] py-[1rem] my-5">
      <div className="bg-gray-100 h-56 w-30 md:w-1/2 md:mx-auto lg:w-80 lg:h-80 mb-8 lg:mb-0 shadow-md"></div>

      <div className="flex flex-col justify-evenly h-full md:w-1/2 md:mx-auto lg:w-2/5 w-full lg:h-[40rem] bg-gray-100 shadow-md">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="bg-white h-10 w-[85%] mx-auto my-2"></div>
        ))}
      </div>
    </div>
  );
}
