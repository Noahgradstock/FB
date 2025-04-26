import useTeamsStore from '../../../store_data/teams_store';

const LeagueTableComponent = () => {
  const leagueTable = useTeamsStore(state => state.leagueTable);

  // Om leagueTable är tomt, visa inte error utan en bra fallback
  if (!leagueTable || leagueTable.length === 0) {
    return <div className="text-center text-gray-500 mt-4">Ingen tabell tillgänglig.</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Ligatabell</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Lag</th>
            <th className="px-4 py-2">Spelade</th>
            <th className="px-4 py-2">Vunna</th>
            <th className="px-4 py-2">Oavgjorda</th>
            <th className="px-4 py-2">Förluster</th>
            <th className="px-4 py-2">Målskillnad</th>
            <th className="px-4 py-2">Poäng</th>
          </tr>
        </thead>
        <tbody>
        {leagueTable.map((team, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
            <td className="border-t px-4 py-2">{idx + 1}</td>
            <td className="border-t px-4 py-2">{team.name}</td>
            <td className="border-t px-4 py-2 text-center">{team.Played}</td>
            <td className="border-t px-4 py-2 text-center">{team.Won}</td>
            <td className="border-t px-4 py-2 text-center">{team.Drawn}</td>
            <td className="border-t px-4 py-2 text-center">{team.Lost}</td>
            <td className="border-t px-4 py-2 text-center">{team['Goal Difference']}</td>
            <td className="border-t px-4 py-2 text-center font-semibold">{team.Points}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTableComponent;