// Business details and positioning, kept in one place so copy stays consistent across the site.
export const site = {
  name: "Efoil London",
  claim: "London's only e-foil destination",
  description:
    "London's only e-foil destination. Exclusive e-foil access to Queen Mother Reservoir, Datchet, 15 minutes from London, plus the UK's largest authorised LIFT eFoil retailer. Lessons from £150.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  phone: { display: "020 8087 4016", href: "tel:+442080874016" },
  mobile: { display: "07982 612 189", href: "tel:+447982612189" },
  email: "efoillondon@gmail.com",
  hq: { name: "Distribution HQ", line1: "63A Hersham Road", town: "Walton-on-Thames", postcode: "KT12 1LJ" },
  hours: [
    { days: "Monday – Friday", time: "9am – 6pm" },
    { days: "Saturday", time: "9am – 1pm" },
    { days: "Sunday", time: "Closed" },
  ],
  legal: "Efoil London and Efoil Hayling Island are trading names of Contract Builder Ltd, Coach House, Mill Road, Esher, KT10 8AS.",
  socials: {
    instagram: "https://www.instagram.com/efoilhaylingisland",
    facebook: "https://www.facebook.com/groups/1112119377299906/",
    linkedin: "https://www.linkedin.com/in/oliver-fripp-2293064/",
  },
  warrantyUrl: "https://liftfoils.com/efoil-warranty/",
  reservoir: {
    name: "Queen Mother Reservoir",
    place: "Datchet, Berkshire",
    coords: "51.48° N  0.55° W",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Queen+Mother+Reservoir+Datchet",
  },
  hayling: {
    name: "West Beach, Hayling Island",
    place: "Hampshire",
    coords: "50.78° N  1.00° W",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=West+Beach+Hayling+Island",
  },
} as const;

export const nav = [
  { label: "Lessons", href: "/lessons" },
  { label: "The Reservoir", href: "/london" },
  { label: "LIFT5", href: "/lift5" },
  { label: "LIFTX", href: "/liftx" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
] as const;

export const shopCategories = [
  { key: "all", label: "Everything" },
  { key: "efoils", label: "eFoils" },
  { key: "lessons", label: "Lessons" },
  { key: "wings", label: "Wings" },
  { key: "accessories", label: "Accessories" },
] as const;
