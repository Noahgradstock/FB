"use client";

import useTeamsStore from "../../../store_data/teams_store";

const HomeTeamAvgGoalsDisplay = () => {
  const { selectedHomeTeam, homeTeamAverages } = useTeamsStore();

  if (!homeTeamAverages || !selectedHomeTeam) {
    return (
      <div className="w-full mt-6 bg-white p-4 rounded shadow-md text-center text-gray-500">
        Laddar målstatistik för {selectedHomeTeam}...
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Genomsnittliga mål/match för: {selectedHomeTeam}
      </h2>
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">🏠 Hemmaplan</h3>
          <div className="text-3xl font-bold">{homeTeamAverages.home_avg_goals.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">🚌 Bortaplan</h3>
          <div className="text-3xl font-bold">{homeTeamAverages.away_avg_goals.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">📊 Totalt</h3>
          <div className="text-3xl font-bold">{homeTeamAverages.overall_avg_goals.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeTeamAvgGoalsDisplay;