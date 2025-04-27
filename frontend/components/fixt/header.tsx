import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-black-600 text-white py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-4xl font-bold">
          <Link href="/">FotBet</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
        <Link href="/uppcomming_bets" className="bg-green-600 hover:bg-white text-black font-bold px-4 py-2 rounded-full transition">
                Uppcomming Bets
              </Link>
            </li>
            <li>
              <Link href="/about" className="bg-white text-black hover:bg-green-600 hover:text-white px-4 py-2 rounded-full transition">
                Om oss
              </Link>
            </li>
            <li>
            <Link href="/about" className="bg-white text-black hover:bg-green-600 hover:text-white px-4 py-2 rounded-full transition">
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