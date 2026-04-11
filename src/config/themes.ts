/**
 * 8 color themes — 2 original + 6 famous editor palettes.
 * Each theme has full light + dark variants with mode-specific accents.
 * Famous themes use their exact published hex values.
 */

export interface ThemeColors {
  "--bg-primary": string;
  "--bg-secondary": string;
  "--bg-tertiary": string;
  "--bg-surface": string;
  "--text-primary": string;
  "--text-secondary": string;
  "--text-tertiary": string;
  "--text-muted": string;
  "--border-default": string;
  "--border-subtle": string;
  "--border-strong": string;
  "--accent-primary": string;
  "--accent-primary-hover": string;
  "--accent-primary-muted": string;
  "--accent-secondary": string;
  "--accent-tertiary": string;
  "--pixel-orange": string;
  "--status-error": string;
  "--status-warning": string;
  "--github-green-1": string;
  "--github-green-2": string;
  "--github-green-3": string;
  "--github-green-4": string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export const STORAGE_KEY = "aykansal-color-theme";
export const DEFAULT_THEME_ID = "nord";

/* ─── OKLCH generator for original themes ─── */

interface GenConfig {
  id: string;
  name: string;
  description: string;
  neutralH: number;
  neutralC: number;
  accentH: number;
  accentC: number;
  lightL: number;
  darkL: number;
  secondaryH: number;
  tertiaryH: number;
}

function fmt(n: number): string {
  return parseFloat(n.toFixed(3)).toString();
}

function oklch(l: number, c: number, h: number, alpha?: number): string {
  const ls = fmt(l);
  const cs = fmt(c);
  const hs = fmt(h);
  if (alpha !== undefined) return `oklch(${ls} ${cs} ${hs} / ${alpha})`;
  return `oklch(${ls} ${cs} ${hs})`;
}

function generate(cfg: GenConfig): ThemeDefinition {
  const { neutralH: nh, neutralC: nc, accentH: ah, accentC: ac, lightL: ll, darkL: dl, secondaryH: sh, tertiaryH: th } = cfg;
  const sc = ac * 0.65;
  return {
    id: cfg.id,
    name: cfg.name,
    description: cfg.description,
    light: {
      "--bg-primary": oklch(0.975, nc, nh),
      "--bg-secondary": oklch(0.945, nc * 1.4, nh),
      "--bg-tertiary": oklch(0.915, nc * 1.8, nh),
      "--bg-surface": oklch(0.99, nc * 0.6, nh),
      "--text-primary": oklch(0.15, nc, nh),
      "--text-secondary": oklch(0.38, nc * 1.6, nh),
      "--text-tertiary": oklch(0.55, nc * 1.2, nh),
      "--text-muted": oklch(0.72, nc, nh),
      "--border-default": oklch(0.915, nc * 1.8, nh),
      "--border-subtle": oklch(0.945, nc * 1.4, nh),
      "--border-strong": oklch(0.84, nc * 2.2, nh),
      "--accent-primary": oklch(ll, ac, ah),
      "--accent-primary-hover": oklch(ll - 0.06, ac - 0.01, ah),
      "--accent-primary-muted": oklch(ll, ac, ah, 0.08),
      "--accent-secondary": oklch(ll, sc, sh),
      "--accent-tertiary": oklch(ll - 0.03, sc, th),
      "--pixel-orange": oklch(ll + 0.03, ac + 0.02, ah),
      "--status-error": oklch(0.52, 0.15, 25),
      "--status-warning": oklch(0.68, 0.13, 85),
      "--github-green-1": "#c6e48b",
      "--github-green-2": "#7bc96f",
      "--github-green-3": "#449e48",
      "--github-green-4": "#196127",
    },
    dark: {
      "--bg-primary": oklch(0.1, nc * 0.8, nh),
      "--bg-secondary": oklch(0.15, nc, nh),
      "--bg-tertiary": oklch(0.2, nc * 1.2, nh),
      "--bg-surface": oklch(0.25, nc * 1.2, nh),
      "--text-primary": oklch(0.96, nc * 0.8, nh),
      "--text-secondary": oklch(0.72, nc * 1.2, nh),
      "--text-tertiary": oklch(0.54, nc, nh),
      "--text-muted": oklch(0.36, nc * 0.8, nh),
      "--border-default": oklch(0.25, nc * 1.2, nh),
      "--border-subtle": oklch(0.18, nc, nh),
      "--border-strong": oklch(0.32, nc * 1.4, nh),
      "--accent-primary": oklch(dl, ac + 0.01, ah),
      "--accent-primary-hover": oklch(dl - 0.06, ac, ah),
      "--accent-primary-muted": oklch(dl, ac + 0.01, ah, 0.08),
      "--accent-secondary": oklch(dl, sc, sh),
      "--accent-tertiary": oklch(dl - 0.02, sc, th),
      "--pixel-orange": oklch(dl + 0.02, ac + 0.02, ah),
      "--status-error": oklch(0.6, 0.15, 25),
      "--status-warning": oklch(0.72, 0.14, 85),
      "--github-green-1": "#0e4429",
      "--github-green-2": "#006d32",
      "--github-green-3": "#26a641",
      "--github-green-4": "#39d353",
    },
  };
}

/* ─── Shared github greens ─── */

const ghLight = {
  "--github-green-1": "#c6e48b",
  "--github-green-2": "#7bc96f",
  "--github-green-3": "#449e48",
  "--github-green-4": "#196127",
} as const;

const ghDark = {
  "--github-green-1": "#0e4429",
  "--github-green-2": "#006d32",
  "--github-green-3": "#26a641",
  "--github-green-4": "#39d353",
} as const;

/* ─── Theme definitions ─── */

export const themes: ThemeDefinition[] = [
  // ━━━ Original themes (generated OKLCH) ━━━

  generate({
    id: "warm",
    name: "Warm",
    description: "Terracotta accent, warm neutrals",
    neutralH: 85, neutralC: 0.006,
    accentH: 40, accentC: 0.15, lightL: 0.55, darkL: 0.64,
    secondaryH: 240, tertiaryH: 150,
  }),

  generate({
    id: "forest",
    name: "Forest",
    description: "Emerald green, sage undertones",
    neutralH: 150, neutralC: 0.005,
    accentH: 155, accentC: 0.15, lightL: 0.52, darkL: 0.65,
    secondaryH: 240, tertiaryH: 150,
  }),

  // ━━━ Famous editor themes (exact published palettes) ━━━

  {
    id: "gruvbox",
    name: "Gruvbox",
    description: "Retro groove — warm orange on earthy tones",
    light: {
      "--bg-primary": "#fbf1c7",
      "--bg-secondary": "#f2e5bc",
      "--bg-tertiary": "#ebdbb2",
      "--bg-surface": "#f9f5d7",
      "--text-primary": "#282828",
      "--text-secondary": "#504945",
      "--text-tertiary": "#7c6f64",
      "--text-muted": "#a89984",
      "--border-default": "#ebdbb2",
      "--border-subtle": "#f2e5bc",
      "--border-strong": "#d5c4a1",
      "--accent-primary": "#af3a03",
      "--accent-primary-hover": "#8f2e02",
      "--accent-primary-muted": "rgba(175, 58, 3, 0.08)",
      "--accent-secondary": "#076678",
      "--accent-tertiary": "#79740e",
      "--pixel-orange": "#d65d0e",
      "--status-error": "#9d0006",
      "--status-warning": "#b57614",
      ...ghLight,
    },
    dark: {
      "--bg-primary": "#282828",
      "--bg-secondary": "#32302f",
      "--bg-tertiary": "#3c3836",
      "--bg-surface": "#504945",
      "--text-primary": "#fbf1c7",
      "--text-secondary": "#d5c4a1",
      "--text-tertiary": "#a89984",
      "--text-muted": "#665c54",
      "--border-default": "#3c3836",
      "--border-subtle": "#32302f",
      "--border-strong": "#504945",
      "--accent-primary": "#fe8019",
      "--accent-primary-hover": "#d65d0e",
      "--accent-primary-muted": "rgba(254, 128, 25, 0.08)",
      "--accent-secondary": "#83a598",
      "--accent-tertiary": "#b8bb26",
      "--pixel-orange": "#fe8019",
      "--status-error": "#fb4934",
      "--status-warning": "#fabd2f",
      ...ghDark,
    },
  },

  {
    id: "everforest",
    name: "Everforest",
    description: "Soft green on warm earth — comfortable for the eyes",
    light: {
      "--bg-primary": "#fdf6e3",
      "--bg-secondary": "#f4f0d9",
      "--bg-tertiary": "#efebd4",
      "--bg-surface": "#fdf6e3",
      "--text-primary": "#5c6a72",
      "--text-secondary": "#708089",
      "--text-tertiary": "#829181",
      "--text-muted": "#a6b0a0",
      "--border-default": "#efebd4",
      "--border-subtle": "#f4f0d9",
      "--border-strong": "#e6e2cc",
      "--accent-primary": "#8da101",
      "--accent-primary-hover": "#768901",
      "--accent-primary-muted": "rgba(141, 161, 1, 0.08)",
      "--accent-secondary": "#3a94c5",
      "--accent-tertiary": "#35a77c",
      "--pixel-orange": "#f57d26",
      "--status-error": "#f85552",
      "--status-warning": "#dfa000",
      ...ghLight,
    },
    dark: {
      "--bg-primary": "#2d353b",
      "--bg-secondary": "#343f44",
      "--bg-tertiary": "#3d484d",
      "--bg-surface": "#475258",
      "--text-primary": "#d3c6aa",
      "--text-secondary": "#9da9a0",
      "--text-tertiary": "#859289",
      "--text-muted": "#56635f",
      "--border-default": "#3d484d",
      "--border-subtle": "#343f44",
      "--border-strong": "#475258",
      "--accent-primary": "#a7c080",
      "--accent-primary-hover": "#8fa86a",
      "--accent-primary-muted": "rgba(167, 192, 128, 0.08)",
      "--accent-secondary": "#7fbbb3",
      "--accent-tertiary": "#83c092",
      "--pixel-orange": "#e69875",
      "--status-error": "#e67e80",
      "--status-warning": "#dbbc7f",
      ...ghDark,
    },
  },

  {
    id: "kanagawa",
    name: "Kanagawa",
    description: "Japanese ink — crystal blue on deep indigo",
    light: {
      "--bg-primary": "#f2ecbc",
      "--bg-secondary": "#e5ddb0",
      "--bg-tertiary": "#dcd5ac",
      "--bg-surface": "#f2ecbc",
      "--text-primary": "#43436c",
      "--text-secondary": "#545464",
      "--text-tertiary": "#8a8980",
      "--text-muted": "#b5b3a4",
      "--border-default": "#dcd5ac",
      "--border-subtle": "#e5ddb0",
      "--border-strong": "#d5cea3",
      "--accent-primary": "#4d699b",
      "--accent-primary-hover": "#3d5580",
      "--accent-primary-muted": "rgba(77, 105, 155, 0.08)",
      "--accent-secondary": "#cc6d00",
      "--accent-tertiary": "#6f894e",
      "--pixel-orange": "#e98a00",
      "--status-error": "#c84053",
      "--status-warning": "#de9800",
      ...ghLight,
    },
    dark: {
      "--bg-primary": "#1f1f28",
      "--bg-secondary": "#2a2a37",
      "--bg-tertiary": "#363646",
      "--bg-surface": "#363646",
      "--text-primary": "#dcd7ba",
      "--text-secondary": "#c8c093",
      "--text-tertiary": "#727169",
      "--text-muted": "#54546d",
      "--border-default": "#2a2a37",
      "--border-subtle": "#1f1f28",
      "--border-strong": "#363646",
      "--accent-primary": "#7e9cd8",
      "--accent-primary-hover": "#6684c0",
      "--accent-primary-muted": "rgba(126, 156, 216, 0.08)",
      "--accent-secondary": "#ffa066",
      "--accent-tertiary": "#98bb6c",
      "--pixel-orange": "#ffa066",
      "--status-error": "#e46876",
      "--status-warning": "#dca561",
      ...ghDark,
    },
  },

  {
    id: "nord",
    name: "Nord",
    description: "Arctic frost — cool blue on polar night",
    light: {
      "--bg-primary": "#eceff4",
      "--bg-secondary": "#e5e9f0",
      "--bg-tertiary": "#d8dee9",
      "--bg-surface": "#eceff4",
      "--text-primary": "#2e3440",
      "--text-secondary": "#3b4252",
      "--text-tertiary": "#4c566a",
      "--text-muted": "#7b88a1",
      "--border-default": "#d8dee9",
      "--border-subtle": "#e5e9f0",
      "--border-strong": "#c2c8d4",
      "--accent-primary": "#5e81ac",
      "--accent-primary-hover": "#4c6d94",
      "--accent-primary-muted": "rgba(94, 129, 172, 0.08)",
      "--accent-secondary": "#81a1c1",
      "--accent-tertiary": "#6b8f5c",
      "--pixel-orange": "#bf6043",
      "--status-error": "#bf616a",
      "--status-warning": "#c08b3e",
      ...ghLight,
    },
    dark: {
      "--bg-primary": "#2e3440",
      "--bg-secondary": "#3b4252",
      "--bg-tertiary": "#434c5e",
      "--bg-surface": "#4c566a",
      "--text-primary": "#eceff4",
      "--text-secondary": "#d8dee9",
      "--text-tertiary": "#7b88a1",
      "--text-muted": "#4c566a",
      "--border-default": "#434c5e",
      "--border-subtle": "#3b4252",
      "--border-strong": "#4c566a",
      "--accent-primary": "#88c0d0",
      "--accent-primary-hover": "#70a8b8",
      "--accent-primary-muted": "rgba(136, 192, 208, 0.08)",
      "--accent-secondary": "#5e81ac",
      "--accent-tertiary": "#a3be8c",
      "--pixel-orange": "#d08770",
      "--status-error": "#bf616a",
      "--status-warning": "#ebcb8b",
      ...ghDark,
    },
  },

  {
    id: "catppuccin",
    name: "Catppuccin",
    description: "Pastel mauve on soothing lavender base",
    light: {
      "--bg-primary": "#eff1f5",
      "--bg-secondary": "#e6e9ef",
      "--bg-tertiary": "#dce0e8",
      "--bg-surface": "#eff1f5",
      "--text-primary": "#4c4f69",
      "--text-secondary": "#5c5f77",
      "--text-tertiary": "#6c6f85",
      "--text-muted": "#9ca0b0",
      "--border-default": "#ccd0da",
      "--border-subtle": "#e6e9ef",
      "--border-strong": "#bcc0cc",
      "--accent-primary": "#8839ef",
      "--accent-primary-hover": "#7030d0",
      "--accent-primary-muted": "rgba(136, 57, 239, 0.08)",
      "--accent-secondary": "#1e66f5",
      "--accent-tertiary": "#40a02b",
      "--pixel-orange": "#fe640b",
      "--status-error": "#d20f39",
      "--status-warning": "#df8e1d",
      ...ghLight,
    },
    dark: {
      "--bg-primary": "#1e1e2e",
      "--bg-secondary": "#313244",
      "--bg-tertiary": "#45475a",
      "--bg-surface": "#313244",
      "--text-primary": "#cdd6f4",
      "--text-secondary": "#bac2de",
      "--text-tertiary": "#a6adc8",
      "--text-muted": "#6c7086",
      "--border-default": "#313244",
      "--border-subtle": "#181825",
      "--border-strong": "#45475a",
      "--accent-primary": "#cba6f7",
      "--accent-primary-hover": "#b38ee0",
      "--accent-primary-muted": "rgba(203, 166, 247, 0.08)",
      "--accent-secondary": "#89b4fa",
      "--accent-tertiary": "#a6e3a1",
      "--pixel-orange": "#fab387",
      "--status-error": "#f38ba8",
      "--status-warning": "#f9e2af",
      ...ghDark,
    },
  },

  {
    id: "tokyonight",
    name: "Tokyo Night",
    description: "Neon city — periwinkle blue on midnight indigo",
    light: {
      "--bg-primary": "#e1e2e7",
      "--bg-secondary": "#d5d6db",
      "--bg-tertiary": "#c4c5cb",
      "--bg-surface": "#e9eaf0",
      "--text-primary": "#3760bf",
      "--text-secondary": "#6172b0",
      "--text-tertiary": "#848cb5",
      "--text-muted": "#9699a3",
      "--border-default": "#d5d6db",
      "--border-subtle": "#dddee3",
      "--border-strong": "#c4c5cb",
      "--accent-primary": "#2e7de9",
      "--accent-primary-hover": "#2065cc",
      "--accent-primary-muted": "rgba(46, 125, 233, 0.08)",
      "--accent-secondary": "#9854f1",
      "--accent-tertiary": "#587539",
      "--pixel-orange": "#b15c00",
      "--status-error": "#c64343",
      "--status-warning": "#8c6c3e",
      ...ghLight,
    },
    dark: {
      "--bg-primary": "#1a1b26",
      "--bg-secondary": "#24283b",
      "--bg-tertiary": "#292e42",
      "--bg-surface": "#343a52",
      "--text-primary": "#c0caf5",
      "--text-secondary": "#a9b1d6",
      "--text-tertiary": "#565f89",
      "--text-muted": "#3b4261",
      "--border-default": "#292e42",
      "--border-subtle": "#24283b",
      "--border-strong": "#343a52",
      "--accent-primary": "#7aa2f7",
      "--accent-primary-hover": "#628ae0",
      "--accent-primary-muted": "rgba(122, 162, 247, 0.08)",
      "--accent-secondary": "#bb9af7",
      "--accent-tertiary": "#9ece6a",
      "--pixel-orange": "#ff9e64",
      "--status-error": "#f7768e",
      "--status-warning": "#e0af68",
      ...ghDark,
    },
  },
];
