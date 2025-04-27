'use client'

import { useEffect, useState } from 'react'

export default function PremierLeagueTable() {
  const [teams] = useState([])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Premier League (Live)</h2>
      <div className="overflow-x-auto"> {/* Gör tabellen rullbar på mindre skärmar */}
        <table className="w-full border border-gray-300 rounded-lg table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Lag</th>
              <th className="text-center p-2">M</th>
              <th className="text-center p-2">V</th>
              <th className="text-center p-2">O</th>
              <th className="text-center p-2">F</th>
              <th className="text-center p-2">+/-</th>
              <th className="text-right p-2">Poäng</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.team.id} className="border-t hover:bg-gray-100">
                <td className="p-2">{team.position}</td>
                <td className="p-2">{team.team.name}</td>
                <td className="text-center p-2">{team.played}</td>
                <td className="text-center p-2">{team.won}</td>
                <td className="text-center p-2">{team.drawn}</td>
                <td className="text-center p-2">{team.lost}</td>
                <td className="text-center p-2">{team.goalsFor - team.goalsAgainst}</td>
                <td className="text-right p-2 font-semibold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4"></div>
    </div>
  )
}