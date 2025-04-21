"use client";

import React from 'react';
import DataFetcher from "../../components/ui/graphs/interactions/get_team_stats";
import HomeTeamFormChart from "../../components/ui/graphs/graphs/hometeam_form_graph";
import AwayTeamFormChart from "../../components/ui/graphs/graphs/awayteam_form_graph";
import HistogramChart from "../../components/ui/graphs/graphs/results_histogram";
import PositiveNegativeBarChart from "../../components/ui/graphs/graphs/winstreak_graph";
import PremierLeagueTable from "../../components/ui/graphs/graphs/league_table";
import { HomeTeam } from "../../components/ui/graphs/interactions/league_droppdown";
import { LeagueDropdown } from "../../components/ui/graphs/interactions/league_droppdown";
import { AwayTeam } from "../../components/ui/graphs/interactions/league_droppdown";
import TeamInfoDisplay from "../../components/ui/graphs/display_info/team_stats_display"


const Home = () => {
  return (
    /* Search - window */
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen flex flex-col items-center justify-center text-black">
      <div className="text-center p-6 max-w-4xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 mt-10">
        <h1 className="text-6xl font-bold mb-4 text-blue-900">Hej till vår startsida!</h1>
        <div className="flex justify-center gap-x-8">
          <LeagueDropdown />
        </div>
        <div className='flex flex-row justify-center gap-4 mt-10'>
        <HomeTeam />
        </div>
        <div className='flex flex-row justify-center gap-4 mt-10'>
        <AwayTeam />
        </div>
        <TeamInfoDisplay />
        <DataFetcher />
      </div>
      {/* Charts - window */}
      <div className="text-center p-6 max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">  
      <h1 className="text-4xl font-bold mb-4 text-green-900">Här kan du se lite statistik från olika matcher!</h1>
      <div className="my-20">
      <PositiveNegativeBarChart />
      </div>
      <div className="flex justify-center gap-x-5">
           <HistogramChart />
        </div>
        <div className="flex justify-center gap-x-8">
        <HomeTeamFormChart />
        <AwayTeamFormChart />
        </div>
      {/* Table - window */}
    </div>
    <div className="text-center p-6 max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">  
    <h1 className="text-6xl font-bold mb-4 text-blue-900">Här kommer en tabell från den aktuella ligan visas!</h1>
    <PremierLeagueTable />
    </div>
  </div>
  );
};

export default Home;