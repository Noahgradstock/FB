import React from 'react';
import useTeamsStore from '../../../store_data/teams_store'; 

const FixturesComponent = () => {
  const { uppcomming_games } = useTeamsStore(state => state);

  if (!uppcomming_games || uppcomming_games.length === 0) {
    return <div>Inga kommande matcher hittades.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kommande matcher i ligan:</h2>
      
      <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2">
        <div>Datum</div>
        <div>Tid (Engelsk tid)</div>
        <div>Hemmalag</div>
        <div>Bortalag</div>
      </div>

      {uppcomming_games.map((game, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 py-2 border-b">
          <div>{new Date(game.Date).toLocaleDateString('sv-SE')}</div>
          <div>{game.Time}</div>
          <div>{game.HomeTeam}</div>
          <div>{game.AwayTeam}</div>
        </div>
      ))}
    </div>
  );
};

export default FixturesComponent;