import React, { useEffect } from 'react';
import useTeamsStore from '../../../store_data/teams_store'; 

const FixturesComponent = () => {
    const { fixtures } = useTeamsStore(state => state); // Hämta fixtures från store
  
    if (!fixtures || fixtures.length === 0) {
      return <div>Inga kommande matcher hittades.</div>;
    }
  
    return (
      <div>
        <h2>Kommande matcher</h2>
        <ul>
          {fixtures.map((fixture, index) => (
            <li key={index}>
              {fixture.HomeTeam} vs {fixture.AwayTeam} - {new Date(fixture.Date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FixturesComponent;