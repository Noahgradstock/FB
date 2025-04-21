"use client";

import useTeamsStore from '../../../store_data/teams_store'; 

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const AwayTeamFormChart = () => {
  const { matchupData, selectedAwayTeam } = useTeamsStore();

  const form = matchupData?.team_form?.[selectedAwayTeam] || [];

  const data = form.map((result, i) => ({
    match: `${i + 1}`,
    Poäng: result === "W" ? 3 : result === "D" ? 1 : 0,
  }));

  const displayData = data.length ? data : [{ match: "0", Poäng: 0 }];

  return (
    <div className="w-full h-[400px] mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Formkurva: {selectedAwayTeam}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="match" />
          <YAxis allowDecimals={false} domain={[0, 3]} />
          <Tooltip />
          <Line type="monotone" dataKey="Poäng" stroke="#60a5fa" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AwayTeamFormChart;