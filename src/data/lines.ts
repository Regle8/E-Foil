import { videos, type VideoAsset } from "@/lib/media";

export type LineKey = "lift5" | "liftx";

export type Line = {
  name: string;
  collection: string;
  heroVideo: VideoAsset;
  kicker: string;
  intro: string;
  badge: string;
  stockNote?: string;
  explorerSlug: string;
  statement: string;
  highlights: string[];
  features: { video: VideoAsset; title: string; body: string }[];
  film: { id: string; title: string };
  rideVideo: VideoAsset;
};

export const lines: Record<LineKey, Line> = {
  lift5: {
    name: "LIFT5",
    collection: "LIFT5",
    heroVideo: videos.lift5Studio,
    kicker: "The ride, redefined",
    intro:
      "Effortless setup. Seamless performance. LIFT5 is built to disappear beneath you, so you can focus purely on the ride, with the Lift Connect System, Quiet Ride Technology and high-modulus carbon construction.",
    badge: "Taking pre-orders",
    explorerSlug: "lift5-4-9-sport",
    statement:
      "Imagine gliding effortlessly above the water, the only sound the gentle ripple beneath you. You're not just riding a board: you're defying gravity, carving through glassy water with a feeling of pure weightlessness.",
    highlights: [
      "Single-button power and a clean, tool-free click-in connection",
      "Cable-less click-in batteries for seamless reliability",
      "Quiet Ride Technology: the quietest, smoothest eFoil ride there is",
      "New motor controller, more durable construction, extended ride time",
    ],
    features: [
      {
        video: videos.lcsLift5,
        title: "Next-gen LCS",
        body: "The Lift Connect System runs through the whole package. Click in the mast, propellers and wings without tools. No wires, no hoses: ready in seconds.",
      },
      {
        video: videos.batteryXray,
        title: "Click-in battery",
        body: "Restructured high-performance cells and an all-new battery management system for longer rides, faster charging and less maintenance.",
      },
      {
        video: videos.lift5Detail,
        title: "Lighter, surf-inspired boards",
        body: "Every component redesigned for a quicker set-up, with lighter boards and surf-inspired shapes for effortless control and stability.",
      },
    ],
    film: { id: "7WdX2LgkGpE", title: "LIFT5 · Everything's changed" },
    rideVideo: videos.sunsetSilhouette,
  },
  liftx: {
    name: "LIFTX",
    collection: "LIFTX",
    heroVideo: videos.liftxStudio,
    kicker: "Where surf meets powered foil",
    intro:
      "A new era in foiling. The first hybrid eFoil platform: harness natural forces, then switch seamlessly to powered propulsion. The ultimate crossover ride for those who refuse to be limited.",
    badge: "2026 boards in stock",
    stockNote:
      "In stock now: 2026 LIFTX 4'8 Dawn Patrol and 5'2 Off White, both with the lighter-weight battery and ready for immediate dispatch.",
    explorerSlug: "liftx-4-8",
    statement:
      "LIFTX isn't just power, it's progression. Get upwind, chase swells, ride unassisted, or just take it for a cruise. The lightest, most connected electric foil yet, built for those who see possibility beyond the break.",
    highlights: [
      "Seamless transitions between powered and unpowered riding",
      "Built for charging swells, open-ocean waves and downwind runs",
      "Thinner, surf-inspired profile for a natural, surf-like feel",
      "Lightweight, hyper-compact design with the LCS 55 folding prop",
    ],
    features: [
      {
        video: videos.liftxOcean,
        title: "Hybrid performance",
        body: "A crossover board with the agility of a surf foil and the power of an eFoil, ready for a huge range of conditions.",
      },
      {
        video: videos.lcsLiftx,
        title: "Next-gen LCS",
        body: "The tool-free Lift Connect System throughout: click in the mast, fit the folding prop and go.",
      },
      {
        video: videos.liftxReveal,
        title: "True glide",
        body: "Carve waves, chase wakes and ride downwind swells, gliding between powered and unpowered riding.",
      },
    ],
    film: { id: "q4F-eAEpkZw", title: "LIFTX · Power meets flow" },
    rideVideo: videos.actionMontage,
  },
};
