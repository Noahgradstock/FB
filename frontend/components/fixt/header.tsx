import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-black-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">
          <Link href="/">FotBet</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-200 transition">
                Hem
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-200 transition">
                Om oss
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-200 transition">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;