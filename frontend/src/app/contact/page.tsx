import React from 'react';


const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center p-6 max-w-lg w-full rounded-lg shadow-lg bg-white bg-opacity-60">
        <h1 className="text-6xl font-bold mb-4 text-blue-900">Hej till vår kontaktsida!</h1>
        <p className="mt-4 text-lg text-gray-700">Här är innehållet på startsidan.</p>
        <a
          href="#"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Läs mer
        </a>
      </div>
      <div className="text-center p-6 max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">  
      <h1 className="text-4xl font-bold mb-4 text-green-900">Här kan du se lite statistik från olika matcher!</h1>
        <div className='my-[50px]'>
        </div>
    </div>
  </div>
  );
};

export default Home;