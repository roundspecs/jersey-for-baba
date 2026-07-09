"use client";

import { useRef, useState, useEffect } from "react";
import { TeamConfig } from "@/lib/teams";
import { Download, RefreshCw, Check } from "lucide-react";

interface JerseyPreviewProps {
  team: TeamConfig;
  kitType: "home" | "away";
  name: string;
  number: string;
}

export default function JerseyPreview({ team, kitType, name, number }: JerseyPreviewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [base64Image, setBase64Image] = useState<string>("");
  const [base64Font, setBase64Font] = useState<string>("");

  useEffect(() => {
    fetch("/jerseys/argentina-font.ttf")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch font");
        return res.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          setBase64Font(base64);
        };
        reader.readAsDataURL(blob);
      })
      .catch((err) => {
        console.error("Error loading argentina-font.ttf", err);
      });
  }, []);

  const kit = kitType === "home" ? team.home : team.away;
  const displayName = (name || "BABA").toUpperCase().slice(0, 12);
  const displayNumber = number || "10";

  const isArgentina = team.id === "argentina";

  // Scale name font based on length to prevent overflow
  const nameFontSize = isArgentina
    ? (displayName.length > 10 ? 48 : displayName.length > 7 ? 60 : 72)
    : (displayName.length > 10 ? 38 : displayName.length > 7 ? 48 : 56);
  const nameLetterSpacing = isArgentina
    ? (displayName.length > 10 ? 2 : displayName.length > 7 ? 3 : 5)
    : (displayName.length > 10 ? -1 : displayName.length > 7 ? 0 : 1);

  // Scale number font for two-digit numbers
  const numberFontSize = isArgentina
    ? (displayNumber.length > 1 ? 320 : 350)
    : (displayNumber.length > 1 ? 250 : 270);

  const numberLetterSpacing = isArgentina
    ? 0
    : (displayNumber.length > 1 ? -24 : 0);

  useEffect(() => {
    const url = `/jerseys/${team.id}-${kitType}.png`;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        try {
          setBase64Image(canvas.toDataURL("image/png"));
        } catch (err) {
          console.error("Failed to convert image to base64", err);
          setBase64Image(url);
        }
      }
    };
    img.onerror = () => {
      // Fallback to Argentina if Brazil is not found
      const fallbackUrl = `/jerseys/argentina-${kitType}.png`;
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = "anonymous";
      fallbackImg.src = fallbackUrl;
      fallbackImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = fallbackImg.naturalWidth;
        canvas.height = fallbackImg.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(fallbackImg, 0, 0);
          try {
            setBase64Image(canvas.toDataURL("image/png"));
          } catch (err) {
            setBase64Image(fallbackUrl);
          }
        }
      };
      fallbackImg.onerror = () => {
        setBase64Image(url);
      };
    };
  }, [team.id, kitType]);

  const handleDownload = async () => {
    if (!svgRef.current) return;
    setIsExporting(true);

    try {
      const svgElement = svgRef.current;
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      const bgGrad = ctx.createRadialGradient(600, 600, 100, 600, 600, 800);
      bgGrad.addColorStop(0, "#1e293b");
      bgGrad.addColorStop(1, "#0f172a");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 1200);

      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.src = url;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 100, 100, 1000, 1000);
          resolve();
        };
        img.onerror = () => reject(new Error("Failed to load SVG"));
      });

      const dataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `${team.name.toLowerCase()}_${kitType}_${displayName.toLowerCase()}_${displayNumber}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const fontStyle = {
    fontFamily: team.id === "argentina" 
      ? 'ArgentinaFont, var(--font-teko), sans-serif' 
      : 'var(--font-bebas-neue), var(--font-antonio), sans-serif',
    fontWeight: team.id === "argentina" ? ("900" as const) : ("normal" as const)
  };

  const numberFontStyle = {
    fontFamily: team.id === "argentina" 
      ? 'ArgentinaFont, var(--font-teko), sans-serif' 
      : 'var(--font-bebas-neue), var(--font-antonio), sans-serif',
    fontWeight: "normal" as const
  };

  const displayImage = base64Image || `/jerseys/${team.id}-${kitType}.png`;

  const nameOutlineWidth = isArgentina ? 4 : 0;
  const numberOutlineWidth = isArgentina ? 10 : 3;
  const numberInnerStrokeWidth = isArgentina ? 2 : 0;
  const numberYTranslation = 375;
  const nameYPosition = isArgentina ? 230 : 210;
  const renderNumberText = (xOffset: number, char: string) => {
    return (
      <g transform={`translate(${xOffset}, 0)`}>
        <text x="5" y="5" fill="#000" fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central" opacity="0.3" filter="blur(3px)">{char}</text>
        <text x="0" y="0" fill={kit.textOutlineColor} stroke={kit.textOutlineColor} strokeWidth={numberOutlineWidth} strokeLinejoin="round" fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central">{char}</text>
        <text x="0" y="0" fill={kit.textColor} stroke={kit.textColor} strokeWidth={numberInnerStrokeWidth} strokeLinejoin="round" fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central">{char}</text>
        <text x="0" y="0" fill={kit.textColor} fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central">{char}</text>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Preview card */}
      <div className="relative w-full aspect-square max-w-[480px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center p-4">
        <svg
          ref={svgRef}
          viewBox="0 0 800 800"
          className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {base64Font && (
              <style dangerouslySetInnerHTML={{ __html: `
                @font-face {
                  font-family: 'ArgentinaFont';
                  src: url(data:font/ttf;charset=utf-8;base64,${base64Font}) format('truetype');
                  font-weight: normal;
                  font-style: normal;
                }
              ` }} />
            )}
            <path id="name-arc" d="M 260 270 Q 400 215 540 270" fill="none" />
          </defs>

          {/* Render Jersey Image */}
          {displayImage && (
            <image
              href={displayImage}
              x="100"
              y="0"
              width="600"
              height="800"
            />
          )}

          {/* NAME */}
          <g style={fontStyle}>
            {/* Outer stroke for outline */}
            {nameOutlineWidth > 0 && (
              <text
                x="400"
                y={nameYPosition}
                textAnchor="middle"
                dominantBaseline="central"
                fill={kit.textOutlineColor}
                stroke={kit.textOutlineColor}
                strokeWidth={nameOutlineWidth}
                strokeLinejoin="round"
                fontSize={nameFontSize}
                letterSpacing={nameLetterSpacing}
              >
                {displayName}
              </text>
            )}
            {/* Inner text fill */}
            <text
              x="400"
              y={nameYPosition}
              textAnchor="middle"
              dominantBaseline="central"
              fill={kit.textColor}
              fontSize={nameFontSize}
              letterSpacing={nameLetterSpacing}
            >
              {displayName}
            </text>
          </g>

          <g style={numberFontStyle} transform={`translate(400, ${numberYTranslation})`}>
            {isArgentina ? (
              <>
                <text x="5" y="5" fill="#000" fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central" opacity="0.3" filter="blur(3px)">{displayNumber}</text>
                <text x="0" y="0" fill={kit.textOutlineColor} stroke={kit.textOutlineColor} strokeWidth={numberOutlineWidth} strokeLinejoin="round" fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central">{displayNumber}</text>
                <text x="0" y="0" fill={kit.textColor} stroke={kit.textColor} strokeWidth={numberInnerStrokeWidth} strokeLinejoin="round" fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central">{displayNumber}</text>
                <text x="0" y="0" fill={kit.textColor} fontSize={numberFontSize} textAnchor="middle" dominantBaseline="central">{displayNumber}</text>
              </>
            ) : (
              displayNumber.length === 1 ? (
                renderNumberText(0, displayNumber)
              ) : (
                <>
                  {renderNumberText(-42, displayNumber[0])}
                  {renderNumberText(42, displayNumber[1])}
                </>
              )
            )}
          </g>
        </svg>
      </div>

      {/* Download button */}
      <div className="mt-6 w-full max-w-[480px]">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all active:scale-[0.98] ${
            exportSuccess
              ? "bg-emerald-500 text-slate-950"
              : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
          } disabled:opacity-50`}
        >
          {isExporting ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Rendering...</>
          ) : exportSuccess ? (
            <><Check className="w-4 h-4" /> Downloaded</>
          ) : (
            <><Download className="w-4 h-4" /> Download PNG</>
          )}
        </button>
      </div>
    </div>
  );
}
