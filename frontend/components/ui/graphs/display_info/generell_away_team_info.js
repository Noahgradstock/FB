"use client";

import useTeamsStore from "../../../store_data/teams_store";

const AwayTeamAvgGoalsDisplay = () => {
  const { selectedAwayTeam: selectedAwayTeam, awayTeamAverages: awayTeamAverages } = useTeamsStore();

  if (!awayTeamAverages || !selectedAwayTeam) {
    return (
      <div className="w-full mt-6 bg-white p-4 rounded shadow-md text-center text-gray-500">
        Laddar målstatistik för {selectedAwayTeam}...
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Genomsnittliga mål/match för: {selectedAwayTeam}
      </h2>
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">🏠 Hemmaplan</h3>
          <div className="text-3xl font-bold">{awayTeamAverages.home_avg_goals.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">🚌 Bortaplan</h3>
          <div className="text-3xl font-bold">{awayTeamAverages.away_avg_goals.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">📊 Totalt</h3>
          <div className="text-3xl font-bold">{awayTeamAverages.overall_avg_goals.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default AwayTeamAvgGoalsDisplay;