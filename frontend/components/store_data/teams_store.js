// teams_store.js
import { create } from 'zustand';

const useTeamsStore = create((set, get) => ({
  selectedLeague: null,
  selectedHomeTeam: null,
  selectedAwayTeam: null,

  leagueData: null,
  matchupData: null,

  headToHeadStats: null,
  homeTeamForm: null,
  awayTeamForm: null,

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

      set({
        matchupData: data,
        headToHeadStats,
        homeTeamForm,
        awayTeamForm,
      });

    } catch (err) {
      console.error("Fel vid hämtning av matchupData:", err);
      set({
        matchupData: null,
        headToHeadStats: null,
        homeTeamForm: null,
        awayTeamForm: null,
      });
    }
  },
}));

export default useTeamsStore;