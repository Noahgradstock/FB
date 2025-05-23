import { create } from 'zustand';

const useTeamsStore = create((set, get) => ({
  selectedLeague: null,
  selectedHomeTeam: null,
  selectedAwayTeam: null,

  leagueData: null,
  matchupData: null,
  fixtures: [],
  uppcomming_games: [], // Viktigt att denna finns
  leagueTable: [],       // Lägg till denna!

  headToHeadStats: null,
  homeTeamForm: null,
  awayTeamForm: null,
  avgHomeGoals: 0,
  avgAwayGoals: 0,

  setLeague: async (league) => {
    set({ selectedLeague: league });
    await get().fetchMatchupData();
  },

  setHomeTeam: async (team) => {
    set({ selectedHomeTeam: team });
    await get().fetchMatchupData();
  },

  setAwayTeam: async (team) => {
    set({ selectedAwayTeam: team });
    await get().fetchMatchupData();
  },

  fetchMatchupData: async () => {
    const { selectedLeague, selectedHomeTeam, selectedAwayTeam } = get();

    if (!selectedLeague || !selectedHomeTeam || !selectedAwayTeam) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/team_data/?league=${selectedLeague}&home_team=${selectedHomeTeam}&away_team=${selectedAwayTeam}`
      );
      const data = await res.json();

      // Plocka ut head-to-head och form från rätt delar
      const headToHeadKey = `${selectedHomeTeam}_vs_${selectedAwayTeam}`;
      const headToHeadStats = data?.head_to_head?.[headToHeadKey] || null;
      const homeTeamForm = data?.team_form?.[selectedHomeTeam] || null;
      const awayTeamForm = data?.team_form?.[selectedAwayTeam] || null;

      const avgHomeGoals = data?.avg_goals?.home_team_avg_goals || 0;
      const avgAwayGoals = data?.avg_goals?.away_team_avg_goals || 0;

      const uppcomming_games = data?.uppcomming_games || [];
      const leagueTable = data?.league_table || []; // 👈 NYTT: hämta ligatabellen från API

      set({
        matchupData: data,
        headToHeadStats,
        homeTeamForm,
        awayTeamForm,
        avgHomeGoals,
        avgAwayGoals,
        uppcomming_games,
        leagueTable, 
      });

    } catch (err) {
      console.error("Fel vid hämtning av matchupData:", err);
      set({
        matchupData: null,
        headToHeadStats: null,
        homeTeamForm: null,
        awayTeamForm: null,
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