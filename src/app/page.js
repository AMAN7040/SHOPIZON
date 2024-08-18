import Link from "next/link";

export default async function Home() {
  return (
    <div className=" space-y-[4rem] mx-[1rem]">
      <div className="bg-gray-100 text-center mx-auto h-[20rem] py-[3rem] my-[5rem] mb-2 shadow-lg w-[85%]">
        <h1 className="text-[1.5rem] md:text-[2.8rem]">Welcome to Our Shop</h1>
        <p className="text-[0.9rem] md:text-[1.7rem] mb-[3rem] items-center">
          
          Discover our exclusive range of products tailored just for you.
        </p>
        <Link
          href="/products"
          className="bg-yellow-300 text-gray-800 px-[1.8rem] py-[1.3rem] rounded-lg text-lg
          font-semibold hover:bg-yellow-600 transition"
        >
          
          Explore Products
        </Link>
      </div>
      <div className="bg-gray-100 text-center mx-auto h-[15rem] my-[2rem] shadow-lg w-[85%]">
        <h2 className="text-[1.3rem] md:text-[2.2rem] mb-[1rem]">About Us</h2>
        <p className="text-[0.8rem] md:text-[1.3rem]">
      
          We are committed to providing you with the best shopping experience.
          Our store offers a wide variety of products to meet all your needs.
          Whether you are looking for the latest trends or timeless classics, we
          have something for everyone.
        </p>
      </div>
    </div>
  );
}
