// Web-optimised loops cut from the Efoil London / LIFT Foils footage (public/video).
export type VideoAsset = {
  /** 720p H.264, used on small screens and for tiles */
  src: string;
  /** 1080p H.264, used on large screens for full-bleed sections */
  srcHd?: string;
  poster: string;
  label: string;
};

const clip = (name: string, label: string, hd = false): VideoAsset => ({
  src: `/video/${name}-720.mp4`,
  srcHd: hd ? `/video/${name}-1080.mp4` : undefined,
  poster: `/video/${name}.jpg`,
  label,
});

export const videos = {
  hero: clip("hero", "eFoil riders flying over the water at sunset", true),
  sunsetDuo: clip("sunset-duo", "Two riders carving on eFoils at sunset", true),
  darkOcean: clip("dark-ocean", "Aerial view of an eFoil rider on dark open water", true),
  aerialFormation: clip("aerial-formation", "Three eFoil riders flying in formation, seen from above", true),
  sunsetSilhouette: clip("sunset-silhouette", "Silhouette of a rider flying an eFoil into the sun", true),
  lift5Studio: clip("lift5-studio", "LIFT5 eFoil rotating in the studio", true),
  liftxStudio: clip("liftx-studio", "LIFTX eFoil rotating in the studio", true),
  liftxOcean: clip("liftx-ocean", "LIFTX riders on turquoise waves", true),
  lessonFlight: clip("lesson-flight", "A parent and child learning to eFoil"),
  actionMontage: clip("action-montage", "eFoil riders carving and jumping"),
  beachWalk: clip("beach-walk", "Riders carrying their eFoils down to the water"),
  openOcean: clip("open-ocean", "A rider crossing open water on an eFoil"),
  underwaterFoil: clip("underwater-foil", "The hydrofoil gliding underwater over a reef"),
  coastRide: clip("coast-ride", "A rider cruising along the coast"),
  packing: clip("packing", "Clicking the mast into a LIFTX board"),
  lcsLiftx: clip("lcs-liftx", "The Lift Connect System clicking into a LIFTX"),
  lcsLift5: clip("lcs-lift5", "The Lift Connect System and drop-in battery on LIFT5"),
  batteryXray: clip("battery-xray", "Cutaway of the LIFT eFoil battery"),
  lift5Detail: clip("lift5-detail", "LIFT5 deck and handles in detail"),
  liftxReveal: clip("liftx-reveal", "LIFTX board revealed in the studio"),
} satisfies Record<string, VideoAsset>;
