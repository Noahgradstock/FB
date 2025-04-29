import useTeamsStore from '../../../store_data/teams_store';

const LeagueTableComponent = () => {
  const leagueData = useTeamsStore(state => state.leagueData);

  if (!leagueData || !leagueData.table || leagueData.table.length === 0) {
    return <div className="text-center text-gray-500 mt-4">Ingen ligatabell tillgänglig.</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Ligatabell</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Lag</th>
            <th className="px-4 py-2 text-center">Spelade</th>
            <th className="px-4 py-2 text-center">Vunna</th>
            <th className="px-4 py-2 text-center">Oavgjorda</th>
            <th className="px-4 py-2 text-center">Förluster</th>
            <th className="px-4 py-2 text-center">Målskillnad</th>
            <th className="px-4 py-2 text-center">Poäng</th>
          </tr>
        </thead>
        <tbody>
          {leagueData.table.map((team, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border-t px-4 py-2">{team.position}</td>
              <td className="border-t px-4 py-2">{team.team_name}</td>
              <td className="border-t px-4 py-2 text-center">{team.played}</td>
              <td className="border-t px-4 py-2 text-center">{team.won}</td>
              <td className="border-t px-4 py-2 text-center">{team.drawn}</td>
              <td className="border-t px-4 py-2 text-center">{team.lost}</td>
              <td className="border-t px-4 py-2 text-center">{team.goal_difference}</td>
              <td className="border-t px-4 py-2 text-center font-semibold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTableComponent;