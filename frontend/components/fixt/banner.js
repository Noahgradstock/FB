"use client";

import { ChevronRightIcon } from '@heroicons/react/20/solid'; 

const MarqueeBanner = () => {
  return (
    <div className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <marquee behavior="scroll" direction="left" className="flex items-center space-x-4">
          <ChevronRightIcon className="h-6 w-6 text-green-500" />
          <span className="text-lg">Här är din rullande banner med information!</span>
        </marquee>
      </div>
    </div>
  );
};

export default MarqueeBanner;