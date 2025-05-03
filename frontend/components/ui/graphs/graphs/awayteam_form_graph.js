"use client";

import React from "react";
import useTeamsStore from "../../../store_data/teams_store";

const HeadToHeadFormChart = () => {
  const { matchupData, selectedHomeTeam, selectedAwayTeam } = useTeamsStore();

  const matchupKey = `${selectedHomeTeam}_vs_${selectedAwayTeam}`;
  const history = matchupData?.head_to_head_all_data?.[matchupKey]?.results || [];

  const summary = {
    [selectedHomeTeam]: {
      W: 0,
      D: 0,
      L: 0,
    },
    [selectedAwayTeam]: {
      W: 0,
      D: 0,
      L: 0,
    },
  };

  // Result används här som "H", "A", "D" (home win, away win, draw)
  const resultSquares = history.map((match, index) => {
    let winner = "";
    let color = "";

    if (match.result === "H") {
      winner = selectedHomeTeam;
      summary[selectedHomeTeam].W++;
      summary[selectedAwayTeam].L++;
      color = "bg-green-500";
    } else if (match.result === "A") {
      winner = selectedAwayTeam;
      summary[selectedAwayTeam].W++;
      summary[selectedHomeTeam].L++;
      color = "bg-red-500";
    } else {
      winner = "D";
      summary[selectedHomeTeam].D++;
      summary[selectedAwayTeam].D++;
      color = "bg-gray-400";
    }

    return (
      <div
        key={index}
        className={`w-8 h-8 rounded ${color} flex items-center justify-center text-white font-bold`}
        title={`Resultat: ${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`}
      >
        {winner === "D" ? "D" : winner === selectedHomeTeam ? "H" : "B"}
      </div>
    );
  });

  if (!selectedHomeTeam || !selectedAwayTeam || history.length === 0) {
    return (
      <div className="w-full mt-6 bg-white p-4 rounded shadow-md text-center text-gray-500">
        Ingen formhistorik mellan {selectedHomeTeam} och {selectedAwayTeam}.
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Formkurva i tidigare möten mellan {selectedHomeTeam} och {selectedAwayTeam}
      </h2>

      <div className="flex justify-center gap-2 mb-4">{resultSquares}</div>

      <div className="text-center text-sm text-gray-700 font-bold space-y-1">
        <div>{selectedHomeTeam}: {summary[selectedHomeTeam].W} Vinster, {summary[selectedHomeTeam].D} Oavgjorda, {summary[selectedHomeTeam].L} Förluster</div>
        <div>{selectedAwayTeam}: {summary[selectedAwayTeam].W} Vinster, {summary[selectedAwayTeam].D} Oavgjorda, {summary[selectedAwayTeam].L} Förluster</div>
      </div>
    </div>
  );
};

export default HeadToHeadFormChart;