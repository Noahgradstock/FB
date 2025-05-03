import { create } from 'zustand';

const useTeamsStore = create((set, get) => ({
  selectedLeague: null,
  selectedHomeTeam: null,
  selectedAwayTeam: null,
  homeTeamAverages: null,
  awayTeamAverages: null,

  leagueData: null, 

  matchupData: null,
  fixtures: [],
  recentGames: [], 
  topScoringTeams: [],
  leagueTable: [],
  teams: [],

  headToHeadStats: null,
  headToHeadAllData: null,
  homeTeamForm: [],
  awayTeamForm: [],
  avgHomeGoals: 0,
  avgAwayGoals: 0,

  setLeague: async (league) => {
    set({ selectedLeague: league });
    await get().fetchLeagueData(league);
  },

  setLeagueData: (data) => set({ leagueData: data }),

  setHomeTeam: async (team) => {
    set({ selectedHomeTeam: team });
    await get().fetchMatchupData();
  },

  setAwayTeam: async (team) => {
    set({ selectedAwayTeam: team });
    await get().fetchMatchupData();
  },

  fetchLeagueData: async (league) => {
    try {
      const res = await fetch(`http://localhost:8080/api/league?league=${league}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
  
      let leagueTableArray = [];
      if (data.league_table && typeof data.league_table === 'object') {
        leagueTableArray = Object.entries(data.league_table).map(([teamName, stats]) => ({
          team_name: teamName,
          played: stats.Played,
          won: stats.Won,
          drawn: stats.Drawn,
          lost: stats.Lost,
          goal_difference: stats["Goal Difference"],
          points: stats.Points
        }));
      }

      // Omvandla next_games till array
      let nextGamesArray = [];
      if (Array.isArray(data.next_games)) {
        nextGamesArray = data.next_games.map((game) => ({
          homeTeam: game.HomeTeam,
          awayTeam: game.AwayTeam,
          date: game.Date,
          time: game.Time,
          division: game.Div
        }));
      }


      let recentGamesArray = [];
      if (Array.isArray(data.recent_games)) {
        recentGamesArray = data.recent_games.map((game) => ({
          homeTeam: game.home_team,
          awayTeam: game.away_team,
          homeGoals: game.home_goals,
          awayGoals: game.away_goals,
          result: game.result,
          date: game.date
        }));
      }

      const teamsArray = Array.isArray(data.teams) ? data.teams : [];

      // Spara allt i Zustand
      set({ 
        leagueData: { 
          ...data, 
          table: leagueTableArray, 
          nextGames: nextGamesArray, 
          recentGames: recentGamesArray,
          teams: teamsArray,
          topScoringTeams: data?.top_avg_goals_per_team || [],
        },
        leagueTable: leagueTableArray,
        fixtures: nextGamesArray,
        recentGames: recentGamesArray,
        teams: teamsArray,
        topScoringTeams: data?.top_avg_goals_per_team || [],
      });

    } catch (error) {
      console.error("Error fetching league data:", error);
      set({ leagueData: null, fixtures: [], leagueTable: [], recentGames: [], teams: [] });
    }
  },

  fetchMatchupData: async () => {
    const { selectedLeague, selectedHomeTeam, selectedAwayTeam } = get();
  
    if (!selectedLeague || !selectedHomeTeam || !selectedAwayTeam) return;
  
    try {
      const res = await fetch(
        `http://localhost:8080/api/team?league=${selectedLeague}&homeTeam=${selectedHomeTeam}&awayTeam=${selectedAwayTeam}`
      );
      const data = await res.json();
  
      const headToHeadKey = `${selectedHomeTeam}_vs_${selectedAwayTeam}`;
      const headToHeadStats = data?.head_to_head?.[headToHeadKey] || null;
      const headToHeadAllData = data?.head_to_head_all_data || {};
      set({ headToHeadAllData });
  
      const homeTeamFormObject = data?.team_form?.[selectedHomeTeam] || {};
      const awayTeamFormObject = data?.team_form?.[selectedAwayTeam] || {};
  
      const homeTeamForm = Object.values(homeTeamFormObject);
      const awayTeamForm = Object.values(awayTeamFormObject);
  
      const avgHomeGoals = data?.avg_goals_head_to_head?.avg_home_goals_vs_away || 0;
      const avgAwayGoals = data?.avg_goals_head_to_head?.avg_away_goals_vs_home || 0;

      const homeTeamAverages = data?.team_avg_goals?.[selectedHomeTeam] || null;
      const awayTeamAverages = data?.team_avg_goals?.[selectedAwayTeam] || null;

      const uppcomming_games = data?.uppcomming_games || [];
      const leagueTable = data?.league_table || [];

  
      set({
        matchupData: data,
        headToHeadStats,
        headToHeadAllData,
        homeTeamForm,
        awayTeamForm,
        avgHomeGoals,
        avgAwayGoals,
        uppcomming_games,
        leagueTable,
        homeTeamAverages,
        awayTeamAverages, 
      });
  
    } catch (err) {
      console.error("Fel vid hämtning av matchupData:", err);
      set({
        matchupData: null,
        headToHeadStats: null,
        homeTeamForm: [],
        awayTeamForm: [],
        avgHomeGoals: 0,
        avgAwayGoals: 0,
        fixtures: [],
        uppcomming_games: [],
        leagueTable: [],
      });
    }
  },
}));

export default useTeamsStore;