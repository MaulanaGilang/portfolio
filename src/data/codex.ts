/**
 * The Codex of Moonwake: House Maulana's world, from Gilang's own answers.
 * A fan work set in Runeterra (see the Riot disclaimer in the page footer).
 * Each tab has a short paragraph and a few facts; The Moonwatch also lists its ranks.
 */

export type CodexFact = { label: string; value: string };
export type CodexTab = { id: string; label: string; lead: string; body: string; facts: CodexFact[] };

export const codex: CodexTab[] = [
  {
    id: "land",
    label: "Land",
    lead: "A cliff-city over deep water, with one bridge in and one bridge out.",
    body: "Moonwake is built in terraces of pale stone down a sea cliff, curved like a crescent, with the great keep carved straight from the rock. Mist sits on the water most mornings. The autumns are long and cool, the winters short and silver, and when storms come the sea throws itself at the cliffs and the city doesn't flinch. Nobody stumbles in.",
    facts: [
      { label: "Seat", value: "Moonwake, crescent-shaped, built into the cliff" },
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
    body: "Under the city lies the Moonwell, a still reservoir of power. Its light is red-violet, like a lamp seen through fog. The well is not endless: what is drawn must be returned, so once a year, in the Quiet Hour, the whole city falls silent for one hour while the pool is fed. No one speaks. That silence is where the motto comes from.",
    facts: [
      { label: "Source", value: "The Moonwell, a still reservoir of water beneath the city" },
      { label: "Colour", value: "Red-violet, like a lamp seen through fog" },
      { label: "Cost", value: "It has a limit and must be refilled" },
      { label: "Who may use it", value: "Anyone born of the house, and anyone the house adopts. The pool chooses; it doesn't inherit" },
      { label: "Ritual", value: "The Quiet Hour: once a year, the city is silent for one hour and the pool is fed" },
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

/** The Moonwatch ranks: twelve shared ranks, then Moonwake's own path. */
export const ranks = {
  shared: [
    "Mercenary",
    "Recruit",
    "Scout",
    "Guard",
    "Footman",
    "Skirmisher",
    "Legionnaire",
    "Man at Arms",
    "Knight Errant",
    "Knight Defender",
    "Knight Champion",
    "Knight Commander",
  ],
  moonwake: [
    "Wellborn",
    "Tidecaller",
    "Mistweaver",
    "Moonwarden",
    "Lampbearer",
    "Wellkeeper",
    "Stormbinder",
    "Warden of the Still Pool",
    "Archmagus of the Coast",
  ],
};
