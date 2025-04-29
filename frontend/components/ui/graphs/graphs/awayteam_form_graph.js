"use client";

import useTeamsStore from "../../../store_data/teams_store";

const AwayTeamFormChart = () => {
  const selectedAwayTeam = useTeamsStore(state => state.selectedAwayTeam);
  const awayTeamForm = useTeamsStore(state => state.awayTeamForm); // <-- Läser rätt

  const summary = {
    W: awayTeamForm.filter(result => result === "W").length,
    D: awayTeamForm.filter(result => result === "D").length,
    L: awayTeamForm.filter(result => result === "L").length,
  };

  if (!awayTeamForm.length) {
    return (
      <div className="w-full mt-6 bg-white p-4 rounded shadow-md text-center text-gray-500">
        Ingen formdata tillgänglig för {selectedAwayTeam}.
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Formkurva: {selectedAwayTeam}</h2>
      <div className="flex justify-center gap-2 mb-4">
        {awayTeamForm.map((result, index) => {
          let color = '';
          if (result === "W") color = "bg-green-400";
          if (result === "D") color = "bg-gray-400";
          if (result === "L") color = "bg-red-400";

          return (
            <div 
              key={index}
              className={`w-8 h-8 rounded ${color} flex items-center justify-center text-white font-bold`}
            >
              {result}
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-gray-700">
        {summary.W} Vinster, {summary.D} Oavgjorda, {summary.L} Förluster
      </div>
    </div>
  );
};

export default AwayTeamFormChart;