"use client";

import { useState, useRef, useEffect } from "react";
import { TEAMS, TeamConfig } from "@/lib/teams";
import { Search, ChevronDown, User, Hash, Trophy, HelpCircle, Shirt } from "lucide-react";

interface JerseyFormProps {
  selectedTeam: TeamConfig;
  onTeamChange: (team: TeamConfig) => void;
  kitType: "home" | "away";
  onKitTypeChange: (kitType: "home" | "away") => void;
  name: string;
  onNameChange: (name: string) => void;
  number: string;
  onNumberChange: (number: string) => void;
}

export default function JerseyForm({
  selectedTeam,
  onTeamChange,
  kitType,
  onKitTypeChange,
  name,
  onNameChange,
  number,
  onNumberChange,
}: JerseyFormProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTeams = TEAMS.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().slice(0, 12);
    // Only allow alphanumeric characters and spaces
    const cleanVal = val.replace(/[^A-Z0-9 ]/g, "");
    onNameChange(cleanVal);
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onNumberChange("");
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= 99) {
      onNumberChange(num.toString());
    }
  };

  const incrementNumber = () => {
    const current = parseInt(number || "10", 10);
    if (current < 99) {
      onNumberChange((current + 1).toString());
    }
  };

  const decrementNumber = () => {
    const current = parseInt(number || "10", 10);
    if (current > 0) {
      onNumberChange((current - 1).toString());
    }
  };

  // Get active kit colors for Selected Team
  const activeKit = kitType === "home" ? selectedTeam.home : selectedTeam.away;

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col gap-6 shadow-xl">

      {/* 1. Country Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Select Nation / Team
        </label>
        
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 hover:border-slate-700 transition-all text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none">{selectedTeam.flag}</span>
              <span className="font-semibold text-sm">{selectedTeam.name}</span>
              {/* Color pills */}
              <div className="flex gap-1 ml-2">
                <span
                  className="w-3 h-3 rounded-full border border-slate-800"
                  style={{ backgroundColor: activeKit.primaryColor }}
                />
                <span
                  className="w-3 h-3 rounded-full border border-slate-800"
                  style={{ backgroundColor: activeKit.secondaryColor }}
                />
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Search Dropdown */}
          {isOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-slate-950 border border-slate-800 rounded-xl shadow-2xl z-20 overflow-hidden backdrop-blur-xl">
              {/* Search Box */}
              <div className="p-2 border-b border-slate-800 flex items-center gap-2 bg-slate-900/30">
                <Search className="w-4 h-4 text-slate-400 ml-2" />
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-sm py-1.5"
                />
              </div>

              {/* List */}
              <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => {
                    const listKit = kitType === "home" ? team.home : team.away;
                    return (
                      <button
                        key={team.id}
                        type="button"
                        onClick={() => {
                          onTeamChange(team);
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-900/60 transition-colors text-left text-sm ${
                          selectedTeam.id === team.id ? "bg-emerald-500/10 text-emerald-400" : "text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl leading-none">{team.flag}</span>
                          <span className="font-semibold">{team.name}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-800 shadow-sm"
                            style={{ backgroundColor: listKit.primaryColor }}
                            title={`${kitType === "home" ? "Home" : "Away"} Primary Color`}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-800 shadow-sm"
                            style={{ backgroundColor: listKit.secondaryColor }}
                            title={`${kitType === "home" ? "Home" : "Away"} Secondary Color`}
                          />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">No teams found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Home / Away Segmented Toggle */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Shirt className="w-3.5 h-3.5" /> Kit Selection
        </label>
        <div className="grid grid-cols-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => onKitTypeChange("home")}
            className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              kitType === "home"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-extrabold"
                : "text-slate-450 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onKitTypeChange("away")}
            className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              kitType === "away"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-extrabold"
                : "text-slate-450 hover:text-white"
            }`}
          >
            Away
          </button>
        </div>
      </div>

      {/* 3. User Name Input */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Back Name
          </label>
          <span className="text-[10px] font-mono text-slate-500">
            {name.length} / 12 chars
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={handleNameInputChange}
            placeholder="e.g. BABA"
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 pl-11 text-sm font-semibold tracking-wide placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all uppercase"
          />
          <User className="w-4 h-4 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 4. Number Input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5" /> Squad Number
        </label>
        <div className="flex gap-2">
          {/* Main Number Field */}
          <div className="relative flex-1">
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={number}
              onChange={handleNumberInputChange}
              placeholder="10"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 pl-11 text-sm font-bold tracking-wide placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
            <Hash className="w-4 h-4 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
          
          {/* Quick Increment buttons */}
          <div className="flex bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={decrementNumber}
              className="px-4 py-2 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors text-lg font-bold border-r border-slate-800 focus:outline-none"
            >
              -
            </button>
            <button
              type="button"
              onClick={incrementNumber}
              className="px-4 py-2 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors text-lg font-bold focus:outline-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
