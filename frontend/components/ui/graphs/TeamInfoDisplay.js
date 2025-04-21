"use client";

import useTeamsStore from '../../store_data/teams_store'; 

export default function TeamInfoDisplay() {
  const selectedLeague = useTeamsStore((state) => state.selectedLeague);
  const selectedHomeTeam = useTeamsStore((state) => state.selectedHomeTeam);
  const selectedAwayTeam = useTeamsStore((state) => state.selectedAwayTeam);

  const leagueData = useTeamsStore((state) => state.leagueData);
  const matchupData = useTeamsStore((state) => state.matchupData);

  return (
    <div className="bg-white bg-opacity-80 p-4 rounded shadow-md text-black mt-6">
      <h2 className="text-2xl font-bold mb-3">Valda val:</h2>
      <p><strong>League:</strong> {selectedLeague || 'Ingen vald'}</p>
      <p><strong>Home Team:</strong> {selectedHomeTeam || 'Ingen vald'}</p>
      <p><strong>Away Team:</strong> {selectedAwayTeam || 'Ingen vald'}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">League Data:</h3>
        {leagueData ? (
          <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(leagueData, null, 2)}</pre>
        ) : (
          <p className="text-gray-500">Ingen ligadata hämtad.</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Home Team Data:</h3>
      
      </div>
      <div className="mt-4">
  <h3 className="text-lg font-semibold">Matchup Data:</h3>
  {matchupData ? (
    <pre className="text-sm bg-gray-100 p-2 rounded">
      {JSON.stringify(matchupData, null, 2)}
    </pre>
  ) : (
    <p className="text-gray-500">Ingen matchup-data hämtad.</p>
  )}
</div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Away Team Data:</h3>
    
          <p className="text-gray-500">Ingen bortalagsdata hämtad.</p>
 
      </div>
    </div>
  );
}