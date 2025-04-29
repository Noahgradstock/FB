import React from 'react';
import useTeamsStore from '../../../store_data/teams_store'; 

const FixturesComponent = () => {
  const fixtures = useTeamsStore(state => state.fixtures); // <-- Använd fixtures istället

  if (!fixtures || fixtures.length === 0) {
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

      {fixtures.map((game, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 py-2 border-b">
          <div>{new Date(game.date).toLocaleDateString('sv-SE')}</div> 
          <div>{game.time}</div>                                        
          <div>{game.homeTeam}</div>                                      
          <div>{game.awayTeam}</div>                                   
        </div>
      ))}
    </div>
  );
};

export default FixturesComponent;