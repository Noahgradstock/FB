"use client";

import useTeamsStore from "../../../store_data/teams_store";

const TeamAverageComparison = () => {
  const {
    selectedHomeTeam,
    selectedAwayTeam,
    homeTeamAverages,
    awayTeamAverages,
  } = useTeamsStore();

  if (!homeTeamAverages || !awayTeamAverages) {
    return (
      <div className="w-full mt-6 bg-white p-4 rounded shadow-md text-center text-gray-500">
        Laddar jämförelse mellan {selectedHomeTeam} och {selectedAwayTeam}...
      </div>
    );
  }

  const rows = [
    {
      label: "🏠 Hemmaplan",
      home: homeTeamAverages.home_avg_goals.toFixed(2),
      away: awayTeamAverages.home_avg_goals.toFixed(2),
    },
    {
      label: "🚌 Bortaplan",
      home: homeTeamAverages.away_avg_goals.toFixed(2),
      away: awayTeamAverages.away_avg_goals.toFixed(2),
    },
    {
      label: "📊 Totalt",
      home: homeTeamAverages.overall_avg_goals.toFixed(2),
      away: awayTeamAverages.overall_avg_goals.toFixed(2),
    },
  ];

  return (
    <div className="w-full mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Genomsnittliga mål per match – jämförelse
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="text-lg font-semibold">{selectedHomeTeam}</div>
        <div></div>
        <div className="text-lg font-semibold">{selectedAwayTeam}</div>

        {rows.map((row, index) => (
          <div key={index} className="contents">
            <div className="text-2xl font-bold text-green-700">{row.home}</div>
            <div className="text-sm text-gray-500 font-medium">{row.label}</div>
            <div className="text-2xl font-bold text-red-700">{row.away}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamAverageComparison;