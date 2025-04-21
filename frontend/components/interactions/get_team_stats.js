"use client";

import { useState } from "react";

export default function DataFetcher() {
  const [team, setTeam] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/team_data/?team=${team}`);
      if (!res.ok) throw new Error("Serverfel");
      const result = await res.json();
      setData(result); 
      setError(null);
    } catch (error) {
      console.error("Fel vid hämtning:", error);
      setError("Det gick inte att hämta data för laget.");
      setData(null);
    }
  };

  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Skriv in lag"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="px-4 py-2 border rounded"
      />
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
      >
        Hämta Data
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {data ? (
        <div className="mt-4">
          <pre className="text-black">{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p className="text-white">Ingen data att visa</p>
      )}
    </div>
  );
}