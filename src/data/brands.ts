// The four Livetools brands, the product lines the explainer can point to, and
// the kinds of shop it asks about. Each kind of shop names its picks in the
// order a new shop should look at them, with a sentence on why each one fits.

export type BrandId = "evolute" | "ns-tools" | "palbit" | "ph-horn";
export type MachineKind = "mill" | "lathe";

export type Brand = {
  id: BrandId;
  name: string;
  origin: string;
  knownFor: string;
};

export type ProductLine = {
  id: string;
  brand: BrandId;
  /** Series codes, shown in the code face before the name. */
  code?: string;
  name: string;
  /** The machines a line is used on; a line for none of the shop's machines is left out. */
  machines: readonly MachineKind[];
};

export type Pick = { line: string; why: string };

export type ShopKind = {
  id: string;
  label: string;
  hint: string;
  summary: string;
  picks: readonly Pick[];
};

export const BRANDS: readonly Brand[] = [
  {
    id: "evolute",
    name: "Evolute",
    origin: "Australia",
    knownFor:
      "High-performance solid carbide end mills, designed and ground in Melbourne, for roughing, finishing, slotting, hard materials, 3D milling and aluminium.",
  },
  {
    id: "ns-tools",
    name: "NS Tools",
    origin: "Japan",
    knownFor:
      "A world leader in micro solid carbide end mills for precision machining, specialising in sizes under 6 mm.",
  },
  {
    id: "palbit",
    name: "Palbit",
    origin: "Portugal",
    knownFor:
      "One of Europe's leading carbide makers: indexable inserts and holders for turning, milling, drilling, threading, grooving and parting off, in a large range of grades.",
  },
  {
    id: "ph-horn",
    name: "PH Horn",
    origin: "Germany",
    knownFor:
      "Grooving, side turning and slot milling specialists since 1969, trusted for small bores, fine grooves and small precision parts.",
  },
];

export const LINES: readonly ProductLine[] = [
  { id: "evolute-v14f", brand: "evolute", code: "V14F", name: "general-purpose end mill", machines: ["mill"] },
  {
    id: "evolute-aluminium",
    brand: "evolute",
    code: "AN1F · A13F · A23F · AN3F · RA13F",
    name: "aluminium end mills",
    machines: ["mill"],
  },
  { id: "evolute-ecomill", brand: "evolute", code: "EcoMill", name: "economy end mill", machines: ["mill"] },
  { id: "ns-mhr230", brand: "ns-tools", code: "MHR230", name: "long-neck micro end mill", machines: ["mill", "lathe"] },
  { id: "ns-msb230", brand: "ns-tools", code: "MSB230", name: "ball end mill", machines: ["mill"] },
  { id: "ns-mrbh230", brand: "ns-tools", code: "MRBH230", name: "ball end mill for hardened steel", machines: ["mill"] },
  { id: "palbit-turning", brand: "palbit", name: "Turning inserts and holders", machines: ["lathe"] },
  { id: "palbit-milling", brand: "palbit", name: "Milling cutters and inserts", machines: ["mill"] },
  { id: "palbit-grooving", brand: "palbit", name: "Grooving and parting off", machines: ["lathe"] },
  { id: "palbit-drilling", brand: "palbit", name: "Indexable drilling", machines: ["mill", "lathe"] },
  { id: "horn-s224", brand: "ph-horn", code: "S224", name: "grooving system", machines: ["lathe"] },
  { id: "horn-supermini", brand: "ph-horn", code: "Supermini", name: "small-bore boring", machines: ["lathe"] },
  { id: "horn-whirling", brand: "ph-horn", name: "Thread whirling", machines: ["lathe"] },
];

export const SHOP_KINDS: readonly ShopKind[] = [
  {
    id: "general",
    label: "General engineering and jobbing",
    hint: "One-offs and short runs of anything, on mills and lathes.",
    summary:
      "A jobbing shop needs tools that cover a lot of ground without a huge tool crib. Start broad, with inserts and a good all-round end mill, and add specialists as the work shows you what it needs.",
    picks: [
      { line: "palbit-turning", why: "One set of holders and a few grades covers most of what comes through the door on the lathe." },
      { line: "palbit-milling", why: "Indexable face and shoulder milling for squaring stock and taking material off fast, with inserts you change rather than regrind." },
      { line: "palbit-drilling", why: "Indexable drills for the bigger holes, on the mill or the lathe." },
      { line: "evolute-v14f", why: "A 4-flute all-rounder that roughs and finishes, so one end mill does most side milling and pocketing in steel." },
      { line: "evolute-ecomill", why: "Good end mills at the lower end of the price, for jobs where a premium tool is not worth it." },
      { line: "horn-s224", why: "When grooving and parting start to matter, double-edged inserts do grooving, parting off and side turning from one holder." },
    ],
  },
  {
    id: "production-turning",
    label: "Production turning",
    hint: "Lathes and turn-mill centres, running parts by the hundred.",
    summary:
      "In production the cost per part rules: tool life, repeatable insert changes and chip control. Build around inserts, and put a specialist on the grooving and the small bores.",
    picks: [
      { line: "palbit-turning", why: "A large range of grades lets you match the insert to the material and push for tool life on long runs." },
      { line: "palbit-grooving", why: "Grooving and parting off inserts for every part that comes off the bar." },
      { line: "palbit-drilling", why: "Indexable drills to open up holes quickly before boring." },
      { line: "horn-s224", why: "Double-edged inserts for grooving, parting and side turning, with holders for face grooving too." },
      { line: "horn-supermini", why: "Boring bars for bores from 0.2 mm to 20 mm, where a standard bar will not fit." },
    ],
  },
  {
    id: "sliding-head",
    label: "Sliding head (Swiss-type)",
    hint: "Small, long, slender parts on sliding-head lathes.",
    summary:
      "On a sliding head the parts are small and the tools are smaller. PH Horn is the first stop for grooving, parting and small bores, with NS Tools for milling on the driven tools.",
    picks: [
      { line: "horn-s224", why: "Double-edged grooving and parting inserts, with holders made for Swiss-type machines." },
      { line: "horn-supermini", why: "Boring bars for bores from 0.2 mm to 20 mm, the sizes a sliding head lives on." },
      { line: "horn-whirling", why: "Thread whirling for long, fine threads such as medical screws." },
      { line: "ns-mhr230", why: "Micro end mills from 0.1 mm to 6 mm for flats, slots and cross features on the driven tools." },
      { line: "palbit-turning", why: "Turning inserts for the main turning work." },
    ],
  },
  {
    id: "die-mould",
    label: "Die and mould",
    hint: "Cavities, cores and electrodes, often in hardened steel.",
    summary:
      "Mould work is about finish and accuracy in hard material, with a lot of small-radius detail. Rough out with robust cutters, then finish with micro tools made for hardened steel.",
    picks: [
      { line: "ns-mrbh230", why: "Ball end mills with Mugen Coating Premium, made for hardened steel up to 65 HRC." },
      { line: "ns-msb230", why: "2-flute ball end mills with Mugen Coating for 3D surfaces and fine detail." },
      { line: "ns-mhr230", why: "Long-neck end mills from 0.1 mm to 6 mm for reaching into deep, narrow detail." },
      { line: "evolute-v14f", why: "A 4-flute end mill with a TiAlN coating for roughing and semi-finishing before the micro tools go in." },
      { line: "palbit-milling", why: "Indexable cutters to rough out cavities and square up blocks before the solid carbide comes in." },
    ],
  },
  {
    id: "aluminium",
    label: "Aluminium and non-ferrous",
    hint: "High-speed milling of aluminium, brass and plastics.",
    summary:
      "Aluminium rewards sharp tools that clear chips fast. Start with end mills made for aluminium, and use indexable cutters to face big blocks.",
    picks: [
      { line: "evolute-aluminium", why: "Evolute's end mills made for aluminium and soft materials, with several designs to choose between for roughing and finishing." },
      { line: "evolute-ecomill", why: "An economical end mill for everyday jobs and for trying out new work." },
      { line: "palbit-milling", why: "Indexable face mills to square up plate and blocks quickly." },
      { line: "ns-mhr230", why: "Micro end mills from 0.1 mm to 6 mm for fine features and small parts." },
    ],
  },
  {
    id: "precision-small",
    label: "Medical and precision small parts",
    hint: "Tiny features, tight tolerances and fine finishes.",
    summary:
      "Precision small parts need tools that stay accurate at sizes where most ranges have not started yet. PH Horn and NS Tools are the specialists here.",
    picks: [
      { line: "horn-whirling", why: "Thread whirling for medical screws, with a carbide grade PH Horn developed for that work." },
      { line: "horn-supermini", why: "Boring bars for bores from 0.2 mm to 20 mm." },
      { line: "horn-s224", why: "Grooving and parting with double-edged inserts, including holders for Swiss-type machines." },
      { line: "ns-mhr230", why: "Long-neck micro end mills from 0.1 mm to 6 mm for small features." },
      { line: "ns-msb230", why: "2-flute ball end mills for small 3D forms and fine finishes." },
    ],
  },
];

export const FLOORS = [
  { value: "both", label: "Mills and lathes", machines: ["mill", "lathe"] },
  { value: "mill", label: "Mills", machines: ["mill"] },
  { value: "lathe", label: "Lathes", machines: ["lathe"] },
] as const satisfies readonly { value: string; label: string; machines: readonly MachineKind[] }[];

export type FloorId = (typeof FLOORS)[number]["value"];
