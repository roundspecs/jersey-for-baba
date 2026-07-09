export interface KitConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  textOutlineColor: string;
  patternType: 'stripes' | 'solid' | 'gradient' | 'checkers' | 'aztec' | 'stars-stripes' | 'waves' | 'origami' | 'diagonal' | 'lion' | 'fileteado';
  brandColor: string;
}

export interface TeamConfig {
  id: string;
  name: string;
  flag: string;
  numberFont: string;
  badgeStars: number;
  brand: 'adidas' | 'nike' | 'puma';
  home: KitConfig;
  away: KitConfig;
}

export const TEAMS: TeamConfig[] = [
  {
    id: "argentina",
    name: "Argentina",
    flag: "🇦🇷",
    numberFont: "Teko",
    badgeStars: 3,
    brand: "adidas",
    home: {
      primaryColor: "#43A1D5", // Icey Blue (the main stripe blue)
      secondaryColor: "#FFFFFF", // white
      accentColor: "#173E69", // navy (shoulders, cuffs)
      textColor: "#173E69", // navy text
      textOutlineColor: "#FFFFFF",
      patternType: "stripes",
      brandColor: "#173E69" // navy adidas 3-stripes
    },
    away: {
      primaryColor: "#0D0D0D", // black base
      secondaryColor: "#43A1D5", // Lucid Blue (fileteado swirls)
      accentColor: "#2563EB", // Blue Burst (accent)
      textColor: "#FFFFFF",
      textOutlineColor: "#0D0D0D",
      patternType: "fileteado",
      brandColor: "#43A1D5"
    }
  },
  {
    id: "brazil",
    name: "Brazil",
    flag: "🇧🇷",
    numberFont: "BebasNeue",
    badgeStars: 5,
    brand: "nike",
    home: {
      primaryColor: "#FFDC02", // canary yellow
      secondaryColor: "#009B3A", // green
      accentColor: "#002780", // blue
      textColor: "#002780",
      textOutlineColor: "#009B3A",
      patternType: "solid",
      brandColor: "#009B3A"
    },
    away: {
      primaryColor: "#002780", // blue
      secondaryColor: "#009B3A", // green
      accentColor: "#FFDC02", // yellow
      textColor: "#FFFFFF",
      textOutlineColor: "#FFDC02",
      patternType: "origami",
      brandColor: "#FFDC02"
    }
  }
];
