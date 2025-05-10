export type ClassesMapping = keyof typeof classesMapping
export const classesMapping = {
  MAGE: 'mage',
  WARRIOR: 'guerrier',
  CLERIC: 'clerc',
  ARCHER: 'archer',
  ASSASSIN: 'assassin'
}

export type JobsMapping = keyof typeof jobMapping
export const jobMapping = {
  enchanting: 'enchanter',
  smithing: 'blacksmith',
  woodcutting: 'woodcutter',
  farming: 'farmer',
  alchemy: 'alchemist',
  mining: 'miner',
  smelting: 'smelter',
}
