import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-5 bottom-0 right-0 left-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-sm">&copy; {new Date().getFullYear()} E-Commerce Shop. AMAN SINGH.</p>
            </div>
            <div className="mt-[0.5rem] md:mt-0">
              <ul className="flex space-x-6 justify-center md:justify-end">
                <li>
                  <Link href="/" className="hover:text-yellow-300">About Us</Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-yellow-300">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  