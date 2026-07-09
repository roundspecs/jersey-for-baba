"use client";

import { useState } from "react";
import { TEAMS, TeamConfig } from "@/lib/teams";
import JerseyPreview from "@/components/JerseyPreview";
import JerseyForm from "@/components/JerseyForm";
import { Trophy } from "lucide-react";

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<TeamConfig>(TEAMS[0]);
  const [kitType, setKitType] = useState<"home" | "away">("home");
  const [name, setName] = useState("BABA");
  const [number, setNumber] = useState("10");

  const isArgentina = selectedTeam.id === "argentina";
  const blobColor1 = isArgentina ? "rgba(116, 172, 223, 0.12)" : "rgba(255, 220, 2, 0.12)";
  const blobColor2 = isArgentina ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 155, 58, 0.12)";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div 
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-700" 
        style={{ backgroundColor: blobColor1 }}
      />
      <div 
        className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none -z-10 transition-all duration-700" 
        style={{ backgroundColor: blobColor2 }}
      />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 p-1.5 rounded-lg">
            <Trophy className="w-4 h-4" />
          </div>
          <span className="font-bold text-base text-white tracking-tight">
            JerseyForBaba
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            World Cup 2026
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 flex flex-col gap-8">

        {/* Generator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Form */}
          <div className="lg:col-span-5 w-full">
            <JerseyForm
              selectedTeam={selectedTeam}
              onTeamChange={setSelectedTeam}
              kitType={kitType}
              onKitTypeChange={setKitType}
              name={name}
              onNameChange={setName}
              number={number}
              onNumberChange={setNumber}
            />
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-7 w-full">
            <JerseyPreview
              team={selectedTeam}
              kitType={kitType}
              name={name}
              number={number}
            />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-6 text-center text-slate-600 text-xs">
        JerseyForBaba © 2026
      </footer>
    </div>
  );
}
