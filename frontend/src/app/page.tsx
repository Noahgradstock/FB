"use client";

import React from 'react';
import DataFetcher from "../../components/ui/graphs/interactions/get_team_stats";
import HomeTeamFormChart from "../../components/ui/graphs/graphs/hometeam_form_graph";
import AwayTeamFormChart from "../../components/ui/graphs/graphs/awayteam_form_graph";
import HistogramChart from "../../components/ui/graphs/graphs/results_histogram";
import { HomeTeam } from "../../components/ui/graphs/interactions/league_droppdown";
import { LeagueDropdown } from "../../components/ui/graphs/interactions/league_droppdown";
import { AwayTeam } from "../../components/ui/graphs/interactions/league_droppdown";
import TeamInfoDisplay from "../../components/ui/graphs/display_info/team_stats_display"
import AvgGoalsDisplay from "../../components/ui/graphs/display_info/team_stats"
import FixturesComponent from "../../components/ui/graphs/display_info/uppcomming_games"
import LeagueTableComponent from "../../components/ui/graphs/display_info/league_table"
import MarqueeBanner from "../../components/fixt/banner"

const Home = () => {
  return (
    /* Search - window */
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center text-black">
      <MarqueeBanner />
      
      <div className="text-center p-6 max-w-full md:max-w-3xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 mt-10 mx-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-900">Visualize live data and stay ahead of the market!</h1>
        <div className="flex justify-center gap-x-8">
          <LeagueDropdown />
        </div>
        
        <div className="flex justify-center gap-x-8 mt-4">
          <HomeTeam />
        </div>

        <div className="flex justify-center gap-x-8 mt-4">
          <AwayTeam />
        </div>

        <DataFetcher />
      </div>
      
      {/* Charts - window */}
      <div className="text-center p-6 max-w-full md:max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-green-900">Här kan du se lite statistik från olika matcher!</h1>
        <div className="my-20">
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-x-8 w-full sm:w-3/4 md:w-1/2">
        <HistogramChart />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-x-8">
          <HomeTeamFormChart />
          <AwayTeamFormChart />
        </div>
      </div>

      {/* Table - window */}
      <div className="text-center p-6 max-w-full md:max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">
        <h1 className="text-3xl sm:text-6xl font-bold mb-4 text-blue-900">Här kommer en tabell från den aktuella ligan visas!</h1>
        <LeagueTableComponent />
        <FixturesComponent />
        <TeamInfoDisplay />
        <AvgGoalsDisplay />
      </div>
    </div>
  );
};

export default Home;