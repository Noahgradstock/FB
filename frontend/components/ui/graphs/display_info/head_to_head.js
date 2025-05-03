"use client";

import React from "react";
import useTeamsStore from "../../../store_data/teams_store";

const HeadToHeadComponent = () => {
  const matchupData = useTeamsStore((state) => state.matchupData);
  const selectedHomeTeam = useTeamsStore((state) => state.selectedHomeTeam);
  const selectedAwayTeam = useTeamsStore((state) => state.selectedAwayTeam);
  const avgHomeGoals = useTeamsStore((state) => state.avgHomeGoals);
  const avgAwayGoals = useTeamsStore((state) => state.avgAwayGoals);
  const homeTeamAverages = useTeamsStore((state) => state.homeTeamAverages);
  const awayTeamAverages = useTeamsStore((state) => state.awayTeamAverages);
  const headToHeadAllData = useTeamsStore((state) => state.headToHeadAllData);

  if (!selectedHomeTeam || !selectedAwayTeam) {
    return <div className="text-center text-gray-600 p-4">Välj lag för att se statistik.</div>;
  }

  const matchKey = `${selectedHomeTeam}_vs_${selectedAwayTeam}`;
  const allMatches = headToHeadAllData?.[matchKey]?.results || [];
  const recentMatches = allMatches.slice(0, 5);
  const filteredHomeMatches = allMatches.filter(
    (match) => match.homeTeam === selectedHomeTeam && match.awayTeam === selectedAwayTeam
  );

  const rows = [
    { label: "VINSTER", home: matchupData?.head_to_head?.Vinster || 0, away: matchupData?.head_to_head?.Förluster || 0 },
    { label: "OAVGJORDA", home: matchupData?.head_to_head?.Oavgjorda || 0, away: matchupData?.head_to_head?.Oavgjorda || 0 },
    { label: "SNITT MÅL / MATCH", home: avgHomeGoals?.toFixed(2) || 0, away: avgAwayGoals?.toFixed(2) || 0 },
  ];

  const teamAvgRows = homeTeamAverages && awayTeamAverages ? [
    { label: "🏠 Hemmaplan", home: homeTeamAverages.home_avg_goals.toFixed(2), away: awayTeamAverages.home_avg_goals.toFixed(2) },
    { label: "🚌 Bortaplan", home: homeTeamAverages.away_avg_goals.toFixed(2), away: awayTeamAverages.away_avg_goals.toFixed(2) },
    { label: "📊 Totalt", home: homeTeamAverages.overall_avg_goals.toFixed(2), away: awayTeamAverages.overall_avg_goals.toFixed(2) },
  ] : [];

  const buildSummary = (matches) => {
    const summary = {
      [selectedHomeTeam]: { W: 0, D: 0, L: 0 },
      [selectedAwayTeam]: { W: 0, D: 0, L: 0 },
    };

    const squares = matches.map((match, index) => {
      let symbol = "", color = "";

      if (match.result === "H") {
        summary[match.homeTeam].W++;
        summary[match.awayTeam].L++;
        symbol = "H"; color = "bg-green-500";
      } else if (match.result === "A") {
        summary[match.awayTeam].W++;
        summary[match.homeTeam].L++;
        symbol = "B"; color = "bg-red-500";
      } else {
        summary[match.homeTeam].D++;
        summary[match.awayTeam].D++;
        symbol = "D"; color = "bg-gray-400";
      }

      return (
        <div
          key={index}
          className={`w-8 h-8 rounded ${color} flex items-center justify-center text-white font-bold`}
          title={`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`}
        >
          {symbol}
        </div>
      );
    });

    return { squares, summary };
  };

  const { squares: fullSquares } = buildSummary(allMatches);
  const { squares: homeSquares } = buildSummary(filteredHomeMatches);
  const { squares: recentSquares } = buildSummary(recentMatches);

  return (
      <div className="bg-gray-50 rounded-xl shadow-md p-6 max-w-4xl mx-auto w-full my-10">

      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Head to Head</h1>


      {/* Del 1 - Statistik */}
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
      Statistics from games between {selectedHomeTeam} och {selectedAwayTeam}
      </h2>
      <div className="grid grid-cols-3 gap-4 text-center mb-10">
        <div className="text-xl font-semibold text-gray-800">{selectedHomeTeam}</div>
        <div></div>
        <div className="text-xl font-semibold text-gray-800">{selectedAwayTeam}</div>
        {rows.map((row, index) => (
          <React.Fragment key={index}>
            <div className="text-lg font-bold text-green-700">{row.home}</div>
            <div className="text-sm text-gray-500 uppercase font-medium tracking-widest">{row.label}</div>
            <div className="text-lg font-bold text-red-700">{row.away}</div>
          </React.Fragment>
        ))}
      </div>

      {/* Del 2 - Matcher där hemmalag var hemma */}
      {filteredHomeMatches.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Matcher där {selectedHomeTeam} var hemmalag
          </h2>
          <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2 mb-4">
            <div>Datum</div><div>Hemmalag</div><div>Bortalag</div><div>Resultat</div><div>Vinnare</div>
          </div>
          {filteredHomeMatches.map((match, index) => (
            <div key={index} className="grid grid-cols-5 text-sm py-2 border-b">
              <div>{new Date(match.date).toLocaleDateString("sv-SE")}</div>
              <div>{match.homeTeam}</div>
              <div>{match.awayTeam}</div>
              <div>{match.homeGoals} - {match.awayGoals}</div>
              <div>{match.result === "H" ? match.homeTeam : match.result === "A" ? match.awayTeam : "Oavgjort"}</div>
            </div>
          ))}
          <div className="text-center font-bold mt-4 mb-2 text-blue-700">Formkurva (hemmamatcher)</div>
          <div className="flex justify-center gap-2 mb-10">{homeSquares}</div>
        </>
      )}

      {/* Del 3 - Genomsnittliga mål */}
      {teamAvgRows.length > 0 && (
        <>
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">General comparison between the teams</h1>
          <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
          Average goals per game
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center mb-10">
            <div className="text-lg font-semibold">{selectedHomeTeam}</div>
            <div></div>
            <div className="text-lg font-semibold">{selectedAwayTeam}</div>
            {teamAvgRows.map((row, index) => (
              <React.Fragment key={index}>
                <div className="text-xl font-bold text-green-700">{row.home}</div>
                <div className="text-sm text-gray-500 font-medium">{row.label}</div>
                <div className="text-xl font-bold text-red-700">{row.away}</div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {/* Del 4 - Senaste matcher */}
      {recentMatches.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-center text-blue-800 mb-4">
            Last five games between the teams
          </h2>
          <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2 mb-4">
            <div>Datum</div><div>Hemmalag</div><div>Bortalag</div><div>Resultat</div><div>Vinnare</div>
          </div>
          {recentMatches.map((match, index) => (
            <div key={index} className="grid grid-cols-5 text-sm py-2 border-b">
              <div>{new Date(match.date).toLocaleDateString("sv-SE")}</div>
              <div>{match.homeTeam}</div>
              <div>{match.awayTeam}</div>
              <div>{match.homeGoals} - {match.awayGoals}</div>
              <div>{match.result === "H" ? match.homeTeam : match.result === "A" ? match.awayTeam : "Oavgjort"}</div>
            </div>
          ))}
          <div className="text-center font-bold mt-4 mb-2 text-blue-700">Formkurva (senaste matcher)</div>
          <div className="flex justify-center gap-2 mb-4">{recentSquares}</div>
        </>
      )}
    </div>
  );
};

export default HeadToHeadComponent;