import React from 'react';
import useTeamsStore from '../../../store_data/teams_store'; 

const RecentGamesComponent = () => {
  const recentGames = useTeamsStore(state => state.recentGames);

  if (!recentGames || recentGames.length === 0) {
    return <div>Inga senaste matcher hittades.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Senaste matcher i ligan:</h2>
      
      <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2">
        <div>Datum</div>
        <div>Hemmalag</div>
        <div>Bortalag</div>
        <div>Resultat</div>
        <div>Vinnare</div>
      </div>

      {recentGames.map((game, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 py-2 border-b">
          <div>{new Date(game.date).toLocaleDateString('sv-SE')}</div>
          <div>{game.homeTeam}</div>
          <div>{game.awayTeam}</div>
          <div>{game.homeGoals} - {game.awayGoals}</div>
          <div>
            {game.result === 'H' ? game.homeTeam 
            : game.result === 'A' ? game.awayTeam 
            : 'Oavgjort'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentGamesComponent;