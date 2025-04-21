"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import useTeamsStore from "../../../store_data/teams_store.js";

function DropdownBase({ title, items, onSelect }) {
  return (
    <div className="relative w-52">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-black py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white/25">
          {title}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="mt-2 w-52 origin-top-right rounded-xl border border-white/10 bg-black text-white shadow-lg ring-1 ring-white/10 focus:outline-none"
        >
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
      </Menu>
    </div>
  );
}

// LIGADROPDOWN – Hämtar endast ligor
export function LeagueDropdown() {
  const [leagues, setLeagues] = useState([]);
  const setLeague = useTeamsStore((state) => state.setLeague);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/teams");
        const data = await res.json();
        setLeagues(data.leagues || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeagues();
  }, []);

  const handleSelect = (league) => {
    console.log("Selected League:", league);
    setLeague(league);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <DropdownBase title="Välj liga" items={leagues} onSelect={handleSelect} />;
}

// GEMENSAM TEAMDROPDOWN – används av både hemma & bortalag
function TeamDropdown({ title, setTeam }) {
  const [teams, setTeams] = useState([]);
  const selectedLeague = useTeamsStore((state) => state.selectedLeague);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!selectedLeague) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/teams?league=${selectedLeague}`);
        const data = await res.json();
        setTeams(data.teams || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [selectedLeague]);

  const handleSelect = (team) => {
    console.log(`Selected ${title}:`, team);
    setTeam(team);
  };

  if (!selectedLeague) return <div className="text-sm text-gray-400 italic">Välj först en liga</div>;
  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error: {error}</div>;

  return <DropdownBase title={title} items={teams} onSelect={handleSelect} />;
}

// Exponerade komponenter
export function HomeTeam() {
  const setHomeTeam = useTeamsStore((state) => state.setHomeTeam);
  return <TeamDropdown title="Hemmalag" setTeam={setHomeTeam} />;
}

export function AwayTeam() {
  const setAwayTeam = useTeamsStore((state) => state.setAwayTeam);
  return <TeamDropdown title="Bortalag" setTeam={setAwayTeam} />;
}