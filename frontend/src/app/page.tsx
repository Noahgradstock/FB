"use client";
import useTeamsStore from "../../components/store_data/teams_store";

import React from 'react';
import HomeTeamFormChart from "../../components/ui/graphs/graphs/hometeam_form_graph";
import AwayTeamFormChart from "../../components/ui/graphs/graphs/awayteam_form_graph";
import HistogramChart from "../../components/ui/graphs/graphs/results_histogram";
import DropdownBase from "../../components/ui/graphs/interactions/league_droppdown";
import AvgGoalsDisplay from "../../components/ui/graphs/display_info/team_stats"
import HomeTeamAvgGoalsDisplay from "../../components/ui/graphs/display_info/generell_home_team_info"
import AwayTeamAvgGoalsDisplay from "../../components/ui/graphs/display_info/generell_away_team_info"
import FixturesComponent from "../../components/ui/graphs/display_info/uppcomming_games"
import RecentGamesComponent from "../../components/ui/graphs/display_info/recent_games"
import LeagueTableComponent from "../../components/ui/graphs/display_info/league_table"
import MarqueeBanner from "../../components/fixt/banner"

const Home = () => {

const selectedHomeTeam = useTeamsStore((state) => state.selectedHomeTeam);
const selectedAwayTeam = useTeamsStore((state) => state.selectedAwayTeam);
  return (
    /* Search - window */
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center text-black">
      <MarqueeBanner />
      
      <div className="text-center p-6 max-w-full md:max-w-3xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 mt-10 mx-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-900">Visualize live data and stay ahead of the market!</h1>
        <div className="flex justify-center gap-x-8">
          <DropdownBase />
        </div>
       
        <div className="flex justify-center gap-x-8 mt-4">
  
        </div>
    
        </div>
      

      {/* Charts - window */}
      <div className="text-center p-6 max-w-full md:max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-green-900">
        Statistik från när lagen mötts:&nbsp;
        <span className="text-black">
          {selectedHomeTeam && selectedAwayTeam ? `${selectedHomeTeam} vs ${selectedAwayTeam}` : "Välj två lag"}
        </span>
      </h1>
        <div className="my-20">
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-x-8 w-full sm:w-3/4 md:w-1/2">
        <HistogramChart />
        </div>
        <AvgGoalsDisplay />
        <div className="flex flex-col sm:flex-row justify-center gap-x-8">
          <HomeTeamFormChart />
          <AwayTeamFormChart />
        </div>
      </div>


      {/* Charts - window */}
      <div className="text-center p-6 max-w-full md:max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-green-900">
        Generell statistik för: &nbsp;
        <span className="text-black">
          {selectedHomeTeam && selectedAwayTeam ? `${selectedHomeTeam} och ${selectedAwayTeam}` : "Välj två lag"}
        </span>
      </h1>
        <div className="my-20">
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-x-8 w-full sm:w-3/4 md:w-1/2">
        </div>
        <HomeTeamAvgGoalsDisplay />
        <AwayTeamAvgGoalsDisplay />
        <div className="flex flex-col sm:flex-row justify-center gap-x-8">
          <HomeTeamFormChart />
          <AwayTeamFormChart />
        </div>
      </div>



      {/* Charts - window */}
      <div className="text-center p-6 max-w-full md:max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-green-900">Information om ligan:</h1>
        <div className="my-20">
        <LeagueTableComponent />
        <FixturesComponent />
        <RecentGamesComponent />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-x-8 w-full sm:w-3/4 md:w-1/2">
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-x-8">
        </div>
      </div>




      {/* Table - window */}
      <div className="text-center p-6 max-w-full md:max-w-6xl w-full rounded-lg shadow-lg bg-white bg-opacity-60 my-[30px] mx-[20px]">
        <h1 className="text-3xl sm:text-6xl font-bold mb-4 text-blue-900">Här kommer info!</h1>
       
  
      </div>
    </div>
  );
};

export default Home;