import React from 'react';


const Home = () => {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center text-black">
      <div className="text-center p-6 max-w-2xl w-full rounded-lg shadow-lg bg-white bg-opacity-60">
        <h1 className="text-5xl font-bold md-2 text-green-900">Welcome to a statistically proven betting strategy</h1>
        <p className="mt-6 text-xl text-black font-bold"> We have created an AI model that predicts match results and bets on results.
        </p>
  
      </div>
      <div className="text-center p-6 max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">  
      <h1 className="text-4xl font-bold mb-4 text-green-900">This is how it has performed!</h1>
        <div className='my-[50px]'>
        </div>
    </div>
  </div>
  );
};

export default Home;