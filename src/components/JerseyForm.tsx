"use client";

import { TEAMS, TeamConfig } from "@/lib/teams";
import { Check, User, Hash, Shirt } from "lucide-react";

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

  const isArgentina = selectedTeam.id === "argentina";
  const focusBorderClass = isArgentina 
    ? "focus:border-sky-400 focus:ring-sky-400/20" 
    : "focus:border-emerald-500 focus:ring-emerald-500/20";
  const focusBorderColor = isArgentina ? "focus:border-sky-400" : "focus:border-emerald-500";
  const activeIconColor = isArgentina ? "text-sky-400" : "text-emerald-400";
  const toggleBackground = isArgentina
    ? "bg-sky-400 text-slate-950 font-extrabold shadow-lg shadow-sky-400/20"
    : "bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20";

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col gap-6 shadow-xl">

      {/* 1. Country Selection */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Select Nation / Team
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          {TEAMS.map((team) => {
            const isSelected = selectedTeam.id === team.id;
            const teamKit = kitType === "home" ? team.home : team.away;
            return (
              <button
                key={team.id}
                type="button"
                onClick={() => onTeamChange(team)}
                className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border bg-slate-950/40 hover:bg-slate-950/70 active:scale-[0.98] transition-all text-center focus:outline-none ${
                  isSelected
                    ? ""
                    : "border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white"
                }`}
                style={isSelected ? {
                  borderColor: team.id === "argentina" ? "#38bdf8" : "#10b981",
                  boxShadow: team.id === "argentina" ? "0 0 20px rgba(56, 189, 248, 0.2)" : "0 0 20px rgba(16, 185, 129, 0.2)",
                  backgroundColor: "rgba(2, 6, 23, 0.9)"
                } : {}}
              >
                {/* Active Indicator Checkmark */}
                {isSelected && (
                  <div 
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-slate-950"
                    style={{ backgroundColor: team.id === "argentina" ? "#38bdf8" : "#10b981" }}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                
                {/* Flag Icon */}
                <span className="text-4xl mb-2 filter drop-shadow-md select-none">{team.flag}</span>
                
                {/* Team Name */}
                <span className={`font-bold text-sm tracking-wide transition-colors ${isSelected ? "text-white" : ""}`}>
                  {team.name}
                </span>

                {/* Color preview swatches */}
                <div className="flex gap-1.5 mt-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
                    style={{ backgroundColor: teamKit.primaryColor }}
                    title="Primary Color"
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
                    style={{ backgroundColor: teamKit.secondaryColor }}
                    title="Secondary Color"
                  />
                  {teamKit.accentColor && (
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
                      style={{ backgroundColor: teamKit.accentColor }}
                      title="Accent Color"
                    />
                  )}
                </div>
              </button>
            );
          })}
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
                ? toggleBackground
                : "text-slate-400 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onKitTypeChange("away")}
            className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              kitType === "away"
                ? toggleBackground
                : "text-slate-400 hover:text-white"
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
            className={`w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 pl-11 text-sm font-semibold tracking-wide placeholder-slate-600 focus:outline-none focus:ring-1 transition-all uppercase ${focusBorderColor} ${focusBorderClass}`}
          />
          <User className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${activeIconColor}`} />
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
              className={`w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 pl-11 text-sm font-bold tracking-wide placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${focusBorderColor} ${focusBorderClass}`}
            />
            <Hash className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${activeIconColor}`} />
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
