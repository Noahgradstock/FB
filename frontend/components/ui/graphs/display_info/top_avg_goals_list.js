import React from 'react';
import useTeamsStore from '../../../store_data/teams_store'; 

const TopScoringTeamsComponent = () => {
    const topScoringTeams = useTeamsStore((state) => state.topScoringTeams);

  if (!topScoringTeams || topScoringTeams.length === 0) {
    return <div>Ingen målstatistik tillgänglig.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Lag med högst snittmål per match</h2>
      
      <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2 text-gray-700">
        <div>#</div>
        <div>Lag</div>
        <div>Matcher</div>
        <div>Gjorda mål</div>
        <div>Snittmål / match</div>
      </div>

      {topScoringTeams.map((team, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 py-2 border-b hover:bg-gray-100">
          <div>{index + 1}</div>
          <div>{team.Team}</div>
          <div>{team.Matches}</div>
          <div>{team.Goals}</div>
          <div>{team.AvgGoalsPerMatch}</div>
        </div>
      ))}
    </div>
  );
};

export default TopScoringTeamsComponent;