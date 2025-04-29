"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import useTeamsStore from "../../../store_data/teams_store";

function DropdownBase({ title, items, onSelect, disabled }) {
  return (
    <div className="relative w-52">
      <Menu>
        <MenuButton
          disabled={disabled}
          className={`inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm font-semibold shadow-inner shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/25
            ${disabled ? 'bg-gray-700 text-white/40 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          {title}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        {!disabled && (
          <MenuItems className="absolute z-50 mt-2 w-52 origin-top-right rounded-xl border border-white/10 bg-black text-white shadow-lg ring-1 ring-white/10 focus:outline-none">
            {items.map((item, index) => (
              <MenuItem key={index}>
                <button
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10"
                  onClick={() => onSelect(item)}
                >
                  {item}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        )}
      </Menu>
    </div>
  );
}

export default function CountryLeagueSelector() {
  const data = {
    England: ["E0", "E1", "E2"],
    Scotland: ["SC0", "SC1"],
    Germany: ["D1", "D2"],
    Spain: ["SP1", "SP2"],
  };

  const setLeague = useTeamsStore((state) => state.setLeague);
  const setHomeTeam = useTeamsStore((state) => state.setHomeTeam);
  const setAwayTeam = useTeamsStore((state) => state.setAwayTeam);
  const fetchMatchupData = useTeamsStore((state) => state.fetchMatchupData);

  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [teams, setTeams] = useState([]);
  const [homeTeamLocal, setHomeTeamLocal] = useState(null);
  const [awayTeamLocal, setAwayTeamLocal] = useState(null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedLeague(null);
    setTeams([]);
    setHomeTeamLocal(null);
    setAwayTeamLocal(null);
  };

  const handleLeagueSelect = async (league) => {
    setLoading(true);
    setSelectedLeague(league);
    setTeams([]);
    setHomeTeamLocal(null);
    setAwayTeamLocal(null);

    await setLeague(league);

    try {
      const res = await fetch(`http://localhost:8080/api/league?league=${league}`);
      const result = await res.json();
      setTeams(result.teams || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHomeTeamSelect = (team) => {
    setHomeTeamLocal(team);
    setHomeTeam(team);
    setAwayTeamLocal(null);
  };

  const handleAwayTeamSelect = async (team) => {
    setAwayTeamLocal(team);
    setAwayTeam(team);

    const { selectedHomeTeam } = useTeamsStore.getState();

    if (selectedHomeTeam) {
      setLoading(true);
      await fetchMatchupData();
      setLoading(false);
    }
  };

  useEffect(() => {
    const autoFetchMatchup = async () => {
      if (homeTeamLocal && awayTeamLocal && selectedLeague) {
        setLoading(true);
        await fetchMatchupData();
        setLoading(false);
      }
    };

    autoFetchMatchup();
  }, [homeTeamLocal, awayTeamLocal, selectedLeague]);

  const countries = Object.keys(data);
  const leagues = selectedCountry ? data[selectedCountry] : [];

  return (
    <div className="flex flex-col gap-4 items-start">
      <DropdownBase
        title={selectedCountry || "Välj land"}
        items={countries}
        onSelect={handleCountrySelect}
        disabled={false}
      />
      <DropdownBase
        title={selectedLeague || "Välj liga"}
        items={leagues}
        onSelect={handleLeagueSelect}
        disabled={!selectedCountry}
      />
      <DropdownBase
        title={homeTeamLocal || "Välj hemmalag"}
        items={teams}
        onSelect={handleHomeTeamSelect}
        disabled={teams.length === 0}
      />
      <DropdownBase
        title={awayTeamLocal || "Välj bortalag"}
        items={teams.filter((t) => t !== homeTeamLocal)}
        onSelect={handleAwayTeamSelect}
        disabled={!homeTeamLocal}
      />

      {loading && (
        <div className="text-sm text-gray-500 animate-pulse text-center w-full mt-2">
          Laddar...
        </div>
      )}
    </div>
  );
}