"use client";

import React from "react";
import MarqueeBanner from "../../../components/fixt/banner";

const Contact = () => {
  return (
    <div className="bg-gray-300 min-h-screen text-black">
      <MarqueeBanner />

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center justify-center p-6 max-w-full md:max-w-3xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 mx-4">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-blue-900">Kontakta mig</h1>
          <p className="text-lg text-gray-700 mb-6">
            Har du frågor, feedback eller vill komma i kontakt? Fyll i formuläret nedan!
          </p>

          <form className="flex flex-col gap-4 text-left">
            <label className="flex flex-col">
              <span className="text-sm font-semibold">Namn</span>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded"
                placeholder="Ditt namn"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-semibold">E-post</span>
              <input
                type="email"
                className="mt-1 p-2 border border-gray-300 rounded"
                placeholder="din@email.com"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-semibold">Meddelande</span>
              <textarea
                rows={5}
                className="mt-1 p-2 border border-gray-300 rounded"
                placeholder="Skriv ditt meddelande här..."
                required
              ></textarea>
            </label>

            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Skicka
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;