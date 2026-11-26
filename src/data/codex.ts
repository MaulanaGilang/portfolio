/**
 * The Codex of Moonwake: House Maulana's world, from Gilang's own answers.
 * A fan work set in Runeterra (see the Riot disclaimer in the page footer).
 * Each tab has a short paragraph and a few facts; The Moonwatch also lists its ranks.
 */

export type CodexFact = { label: string; value: string };
export type CodexTab = { id: string; label: string; lead: string; body: string; facts: CodexFact[] };

/** One painted image per chapter (generated with FLUX.2), shown on the Moonwake page and the map panel. */
export const codexImages: Record<string, string> = {
  land: "/offline/moonwake/codex-land.webp",
  nature: "/offline/moonwake/codex-nature.webp",
  magic: "/offline/moonwake/codex-magic.webp",
  people: "/offline/moonwake/codex-people.webp",
  regalia: "/offline/moonwake/codex-regalia.webp",
  keep: "/offline/moonwake-hall.webp",
  moonwatch: "/offline/moonwake/codex-moonwatch.webp",
  rule: "/offline/moonwake/codex-rule.webp",
  lore: "/offline/moonwake/codex-lore.webp",
};

/** The short introduction shown on the map panel and at the top of the Moonwake page. */
export const moonwakeIntro =
  "A cliff-city over deep water, where the spirit world and arcane craft meet. One bridge in, one bridge out; nobody stumbles in. Moonwake is quiet, deep and held: candle and moonlight, mist off the water, and a well of red-violet magic humming low beneath the stone. It is home that happens to be a fortress.";

export const codex: CodexTab[] = [
  {
    id: "land",
    label: "Land",
    lead: "A cliff-city over deep water, with one bridge in and one bridge out.",
    body: "Moonwake is a round fortress-city on a sheer-sided island just off the coast. One giant bridge on tall arches runs level from the mainland cliffs straight through its gate; the harbour sits far below at the waterline, linked to the streets by a cliff road and a cargo lift, and airships moor at the sky port on the wall. Rings of walls climb to the keep on the highest rock. Mist sits on the water most mornings. The autumns are long and cool, the winters short and silver, and when storms come the sea throws itself at the cliffs and the city doesn't flinch. Nobody stumbles in.",
    facts: [
      { label: "Seat", value: "Moonwake, a round walled city on a cliff-sided island" },
      { label: "Climate", value: "Mist, long cool autumns, short silver winters, sea storms" },
      { label: "Landmarks", value: "The Long Bridge, where there is nowhere to hide. The Still Pool, a courtyard pool that never ripples. The Hall of Names, every Maulana carved in silver" },
      { label: "Neighbours", value: "Piltover-style trade cities inland, Ionian spirit-villages across the water, and one Noxian outpost that watches and pretends not to" },
    ],
  },
  {
    id: "nature",
    label: "Nature",
    lead: "Moonvine blooms only at night, and the cats are treated like minor nobility.",
    body: "Blackthorn holds the cliff edges, salt-roses fill the courtyards, and one old wisteria hangs over the keep door. In autumn the falling petals glow faintly. On the anniversary of the founding, a red-violet aurora rises over the water. The fog has its own dangers, and the lamps on the bridge are never allowed to go out.",
    facts: [
      { label: "Sacred plant", value: "Moonvine: pale, blooms only at night" },
      { label: "Sacred animal", value: "The calico cat. The crest-cats are treated like minor nobility" },
      { label: "Other growth", value: "Blackthorn on the cliffs, salt-roses in the courtyards, the old wisteria over the keep door" },
      { label: "Dangers", value: "Cliff-wraiths in the fog, sirens in the deep water, and things that climb the bridge at night if the lamps go out" },
      { label: "Wonders", value: "Petals that glow as they fall in autumn, and the red-violet aurora on the founding night" },
    ],
  },
  {
    id: "magic",
    label: "Magic",
    lead: "Not blood, not runes. Water.",
    body: "Under the city lies the Moonwell, a still reservoir of power. Its light is red-violet, like a lamp seen through fog. The well is not endless: what is drawn must be returned, so once a year, in the Quiet Hour, the whole city falls silent for one hour while the pool is fed. No one speaks. That silence is where the motto comes from. The bed of the well gives up stillstone, a pale stone that drinks magic, holds it, and gives it back.",
    facts: [
      { label: "Source", value: "The Moonwell, a still reservoir of water beneath the city" },
      { label: "Colour", value: "Red-violet, like a lamp seen through fog" },
      { label: "Cost", value: "It has a limit and must be refilled" },
      { label: "Who may use it", value: "Anyone born of the house, and anyone the house adopts. The pool chooses; it doesn't inherit" },
      { label: "Ritual", value: "The Quiet Hour: once a year, the city is silent for one hour and the pool is fed" },
      { label: "Stillstone", value: "Pale stone cut from the bed of the well. It soaks up magic and stores it, glowing red-violet as it fills; when it drinks a spell, the air goes quiet. The walls, the armour and the weapons of the city are set with it" },
    ],
  },
  {
    id: "people",
    label: "People",
    lead: "A few thousand people: reserved, patient, and kind underneath.",
    body: "Fisherfolk, smiths, scribes, and one small standing army. They speak a blend of Ionian and the common tongue, greet each other with a softened \"good morning\", and answer a formal bow with \"We're here.\" They hold that being just and honest is holy, and they keep the spirits of the water. The food is richly spiced, and the music is strings, gamelan-like bells and drums.",
    facts: [
      { label: "Greeting", value: "A softened \"good morning\". A formal bow is answered with \"We're here\"" },
      { label: "Beliefs", value: "The spirits of the water, and the rule that just and honest is holy. Holy place: the Still Pool" },
      { label: "Festivals", value: "Moonwake Night (24 March), the Long Table where everyone eats together without rank, and the Day of Names when children receive theirs" },
      { label: "Food", value: "Rich, spiced cooking in the Indonesian way" },
      { label: "Music", value: "Strings, gamelan-like bells, and drums" },
    ],
  },
  {
    id: "regalia",
    label: "Regalia",
    lead: "Wine-red, black, silver, and one cream.",
    body: "Day to day, the house wears loose cream sweaters, dark trousers and leather. For ceremony it wears wine-red and black, threaded with silver, with a crescent at the collar. Armour is light: silver-plated sea-leather, built for movement rather than mass.",
    facts: [
      { label: "Colours", value: "Wine-red, black, silver, one cream" },
      { label: "Materials", value: "Enchanted silver, moonvine thread, sea-leather" },
      { label: "Signet", value: "A silver ring of the crescent over the pool, worn on the right hand" },
      { label: "Armour", value: "Light, silver-plated sea-leather" },
    ],
  },
  {
    id: "keep",
    label: "The Keep",
    lead: "Carved from the cliff: pale stone, black timber, silver inlay.",
    body: "The great hall holds one long table and a hearth that never goes out. Above it hangs the crest in silver: the moon and the pool, and no figures. Fortified and overgrown, the keep also holds a library, a moonvine garden, a watchtower on the point, and one hidden room that only the ruler's wife knows.",
    facts: [
      { label: "Style", value: "Fortified, overgrown, carved straight from the cliff" },
      { label: "Great hall", value: "A long table, a hearth that never goes out, the crest above it in silver" },
      { label: "Rooms", value: "The library, the moonvine garden, the watchtower on the point, and the hidden room" },
    ],
  },
  {
    id: "moonwatch",
    label: "The Moonwatch",
    lead: "Patient soldiers who never raise their voices.",
    body: "The Moonwatch fights defensively: it waits, counter-strikes and lays ambushes. Its elite, the Still, are twelve who never speak in combat. Its battle cry is a single word. Its proudest night was the Bridge Stand, when it was outnumbered ten to one and held the bridge until dawn without once raising its voice.",
    facts: [
      { label: "Fighting style", value: "Patient: defence, counter-strike, ambush" },
      { label: "Elite unit", value: "The Still: twelve who never speak in combat" },
      { label: "Battle cry", value: "\"Quiet.\" That's the whole cry" },
      { label: "Famous victory", value: "The Bridge Stand: outnumbered ten to one, the bridge held all night" },
      { label: "Arms", value: "Melee guards carry the longsword; ranged guards carry rifles with a glowing stillstone tube that fires back stored magic" },
      { label: "Armour", value: "Plain dark steel plate, wine tabards, hooded cloaks. Stillstone goes in weapons, never in armour" },
      { label: "Rarest unit", value: "The Wyrmwatch: riders on armoured war wyverns" },
    ],
  },
  {
    id: "rule",
    label: "Rule",
    lead: "A ruler who doesn't raise his voice, and doesn't lose.",
    body: "Gilang Maulana rules as Archmagus of the Coast, with a council of three. The house trades moonvine dye, enchanted ink, silver and rare vials of pool-water with the Ionian villages and the inland cities, and counts its money in silver crescents. Other houses put it plainly: quiet people. Don't borrow from them, and don't cross them.",
    facts: [
      { label: "Ruler", value: "Gilang Maulana, Archmagus of the Coast" },
      { label: "Council", value: "His wife (always first), the commander of the Moonwatch, and the Keeper of the Pool" },
      { label: "House code", value: "Never raise your voice. Never break a promise. The pool is fed before the table" },
      { label: "Allies and rivals", value: "Allied with the Ionian spirit-villages. Rivals: the Noxian outpost, and an inland city that wants the harbour" },
      { label: "Trade", value: "Moonvine dye, enchanted ink, silver, pool-water vials (rare, expensive, slow). Currency: silver crescents" },
    ],
  },
  {
    id: "lore",
    label: "Lore",
    lead: "Built on the cliff edge precisely because nobody else wanted it.",
    body: "House Maulana was founded by Gilang Maulana I and his wife, Yuki, in the year the two moons first aligned: a man who left a loud house, and a woman who refused to be left. Its value is devotion, the unglamorous kind that stays when it's boring. It nearly broke once, in the Long Silence, when the pool went dark for a year. Yuki is the one the pool remembers.",
    facts: [
      { label: "Founders", value: "Gilang Maulana I and Yuki, in the year the two moons first aligned" },
      { label: "Defining value", value: "Devotion: the kind that stays when it's boring" },
      { label: "Great crisis", value: "The Long Silence: the pool went dark for a year" },
      { label: "Artefact", value: "The Lamp: a red-violet light that never goes out, kept in the keep" },
      { label: "Prophecy", value: "\"One of ours will walk in a body not born of ours, and the pool will not mind.\"" },
      { label: "Threats today", value: "The Noxian outpost, and the slow fear that the pool is dimming" },
    ],
  },
];

/** The Moonwatch ranks: seven soldier ranks, then the five of the mage path. */
export const ranks = {
  shared: ["Recruit", "Watchman", "Rifleman", "Sergeant", "Knight", "Knight Captain", "Knight Commander"],
  moonwake: ["Mistweaver", "Moonwarden", "Lampbearer", "Warden of the Still Pool", "Archmagus of the Coast"],
};

/**
 * One concept-art tile: a span of 2 makes it double width in the mosaic. Sheets on
 * white set `sheet` so the whole sheet shows on a white tile instead of being cropped.
 */
export type ConceptTile = { src: string; title: string; text: string; span?: 2; sheet?: true };

/**
 * Concept art for the Moonwake page, shown as mosaics under divider labels in the
 * manner of a region page. New pieces were generated with FLUX.2; the rest reuse the
 * scenes and chapter images.
 */
export const conceptGalleries: { id: string; label: string; tiles: ConceptTile[] }[] = [
  {
    id: "environments",
    label: "Environments",
    tiles: [
      { src: "/offline/moonwake/concept/env-city.webp", span: 2, title: "Moonwake at dawn", text: "The walled city on its island, the bridge running level into the gate." },
      { src: "/offline/moonwake/concept/env-hall.webp", span: 2, title: "The long table", text: "The great hall of the keep, carved from the rock, with one table for everyone." },
      { src: "/offline/moonwake/concept/env-market.webp", title: "Lantern stairs", text: "The market streets are stairs. The lamps on them are never allowed to go out." },
      { src: "/offline/moonwake/concept/env-tower.webp", title: "The watchtower", text: "Storm nights on the cliff, under the red-violet aurora." },
      { src: "/offline/moonwake/concept/env-pool.webp", title: "The Moonwell", text: "The still reservoir under the city. What is drawn must be returned." },
      { src: "/offline/moonwake-courtyard.webp", title: "The Still Pool", text: "A courtyard pool that never ripples, whatever the weather." },
      { src: "/offline/moonwake-harbour.webp", span: 2, title: "The harbour", text: "Fishing boats home before the mist rolls in." },
      { src: "/offline/moonwake-bridge.webp", span: 2, title: "The Long Bridge", text: "One way in, one way out, and nowhere to hide on it." },
    ],
  },
  {
    id: "life",
    label: "Life in Moonwake",
    tiles: [
      { src: "/offline/moonwake/concept/life-townsfolk.webp", span: 2, title: "Townsfolk", text: "Fisherfolk, smiths, scribes and elders. A few thousand souls who greet each other with \"We're here\"." },
      { src: "/offline/moonwake/concept/life-archmagus.webp", title: "The Archmagus", text: "Robes in wine and black with silver thread, and the black polearm with the red-violet orb." },
      { src: "/offline/moonwake/concept/life-library.webp", title: "The library", text: "The crest-cats go wherever they like. The scribes have stopped arguing." },
      { src: "/offline/moonwake/concept/life-festival.webp", span: 2, title: "Moonwake Night", text: "Every 24 March: lanterns over the streets, strings and gongs, and glowing petals in the air." },
      { src: "/offline/moonwake-hall.webp", span: 2, title: "The Hall of Names", text: "Every Maulana, carved in silver, read aloud on the Day of Names." },
    ],
  },
  {
    id: "military",
    label: "The Moonwatch",
    tiles: [
      { src: "/offline/moonwake/concept/watch-soldier.webp", span: 2, sheet: true, title: "The Moonwatch", text: "Melee guards with the longsword, ranged guards with the stillstone rifle. Plain dark plate, wine tabards. Patient, defensive, impossible to hurry." },
      { src: "/offline/moonwake/concept/still-1.webp", span: 2, sheet: true, title: "The Still, I to VI", text: "Twelve from twelve corners of Runeterra, answering to the Archmagus alone. I to VI: Noxus, Piltover, Zaun, Ionia, Demacia and the Freljord." },
      { src: "/offline/moonwake/concept/still-2.webp", span: 2, sheet: true, title: "The Still, VII to XII", text: "Shurima, Bilgewater, the Shadow Isles, Targon, Ixtal and the Void. One black cloak over everything they brought with them." },
      { src: "/offline/moonwake/concept/ranks-1.webp", span: 2, sheet: true, title: "Ranks: the soldiers", text: "Recruit to Knight Commander: spear, sword and shield, rifle, halberd, longsword, greatsword." },
      { src: "/offline/moonwake/concept/ranks-2.webp", span: 2, sheet: true, title: "Ranks: the mage path", text: "Mistweaver to Archmagus: wand, glaive, lamp, ceremonial blade and the black polearm." },
      { src: "/offline/moonwake/concept/wyvern.webp", span: 2, sheet: true, title: "War wyvern", text: "Two legs, wings for arms. Plate barding over wine-red quilting, and a saddle for one." },
      { src: "/offline/moonwake/concept/wyrmwatch.webp", span: 2, title: "The Wyrmwatch", text: "The Moonwatch's rarest unit: wyvern riders who patrol the cliffs and the sea lanes." },
      { src: "/offline/moonwake/codex-moonwatch.webp", span: 2, title: "The Bridge Stand", text: "The battle cry is one word: \"Quiet.\"" },
    ],
  },
];

/**
 * The Still: twelve who never speak, numbered like a ranking. One black hooded
 * cloak with silver trim for all; everything else is their own.
 */
export const stillRoster: { n: string; weapon: string; style: string }[] = [
  { n: "I", weapon: "Noxus: a massive two-handed executioner's axe", style: "The breaker; ends fights with one swing" },
  { n: "II", weapon: "Piltover: a long hextech rifle with a blue crystal core", style: "The sniper on the watchtower" },
  { n: "III", weapon: "Zaun: a chemtech grenade launcher", style: "Clears crowds and bridges" },
  { n: "IV", weapon: "Ionia: a single long curved blade of wind-steel", style: "The duellist; fastest of the twelve" },
  { n: "V", weapon: "Demacia: a petricite tower shield and a flanged mace", style: "Holds the line; the shield drinks spells" },
  { n: "VI", weapon: "Freljord: a heavy recurve bow of True Ice", style: "The archer; arrows that freeze" },
  { n: "VII", weapon: "Shurima: a golden crossblade, thrown and caught", style: "Strikes at range and up close" },
  { n: "VIII", weapon: "Bilgewater: a harpoon gun on a chain, and a cutlass", style: "Drags enemies off walls and ships" },
  { n: "IX", weapon: "Shadow Isles: a chain-sickle with a lantern of black mist", style: "Hooks, binds and blinds" },
  { n: "X", weapon: "Targon: a celestial spear and a round bronze shield", style: "Throws the spear, fights on with the shield" },
  { n: "XI", weapon: "Ixtal: a blowpipe with poison darts, and an obsidian knife", style: "Silent, from the rooftops" },
  { n: "XII", weapon: "The Void: a blade-arm of captured Void chitin", style: "The one the others don't talk about" },
];
