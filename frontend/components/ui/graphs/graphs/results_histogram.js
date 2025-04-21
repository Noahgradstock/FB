"use client";

import useTeamsStore from '../../../store_data/teams_store'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HistogramChart = () => {
  const matchupData = useTeamsStore((state) => state.matchupData);
  const selectedHomeTeam = useTeamsStore((state) => state.selectedHomeTeam);
  const selectedAwayTeam = useTeamsStore((state) => state.selectedAwayTeam);

  // Nyckeln som används i backendens response
  const matchupKey = `${selectedHomeTeam}_vs_${selectedAwayTeam}`;

  const stats = matchupData?.head_to_head?.[matchupKey] || null;

  const formattedData = stats
    ? [
        {
          name: `${selectedHomeTeam} vs ${selectedAwayTeam}`,
          Vinster: stats.Vinster || 0,
          Förluster: stats.Förluster || 0,
          Oavgjorda: stats.Oavgjorda || 0,
        },
      ]
    : [
        {
          name: "Ingen data",
          Vinster: 0,
          Förluster: 0,
          Oavgjorda: 0,
        },
      ];

  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Vinster" fill="#4ade80" />
          <Bar dataKey="Förluster" fill="#f87171" />
          <Bar dataKey="Oavgjorda" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChart;