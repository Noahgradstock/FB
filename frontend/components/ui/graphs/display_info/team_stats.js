"use client";

import useTeamsStore from "../../../store_data/teams_store";

const AvgGoalsDisplay = () => {
  const { avgHomeGoals = 0, avgAwayGoals = 0, selectedHomeTeam, selectedAwayTeam } = useTeamsStore();

  // Kontrollera om de genomsnittliga målen är definierade
  if (avgHomeGoals === undefined || avgAwayGoals === undefined) {
    return (
      <div className="w-full mt-6 bg-white p-4 rounded shadow-md text-center text-gray-500">
        Laddar genomsnittliga mål för {selectedHomeTeam} och {selectedAwayTeam}...
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Genomsnittliga mål för: {selectedHomeTeam} & {selectedAwayTeam}
      </h2>
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">Hemmalag ({selectedHomeTeam})</h3>
          <div className="text-3xl font-bold">{avgHomeGoals.toFixed(2)} mål/match</div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">Bortalag ({selectedAwayTeam})</h3>
          <div className="text-3xl font-bold">{avgAwayGoals.toFixed(2)} mål/match</div>
        </div>
      </div>
    </div>
  );
};

export default AvgGoalsDisplay;