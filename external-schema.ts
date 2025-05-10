import {boolean, double, mysqlTable, int, float, text, varchar} from 'drizzle-orm/mysql-core';

export const xConomy = mysqlTable('xconomy', {
  uid: varchar('UID', { length: 255 }).notNull().unique(),
  player: text('player'),
  balance: double('balance'),
  hidden: boolean('hidden')
});

export const lpPlayers = mysqlTable('luckperms_players', {
  uuid: varchar('uuid', { length: 255 }).notNull().unique(),
  username: text('username'),
  primaryGroup: double('primary_group'),
});

export const mmoProfilesPlayerData = mysqlTable('mmoprofiles_playerdata', {
  uuid: varchar('uuid', { length: 255 }).notNull().unique(),
  data: text('data'),
  isSaved: boolean('is_saved'),
})

export const mmoCorePlayerData = mysqlTable('mmocore_playerdata', {
  uuid: varchar('uuid', { length: 36 }).notNull().primaryKey(),
  classPoints: int('class_points').default(0),
  skillPoints: int('skill_points').default(0),
  attributePoints: int('attribute_points').default(0),
  attributeReallocPoints: int('attribute_realloc_points').default(0),
  skillReallocationPoints: int('skill_reallocation_points').default(0),
  skillTreeReallocationPoints: int('skill_tree_reallocation_points').default(0),
  skillTreePoints: text('skill_tree_points'),
  skillTreeLevels: text('skill_tree_levels'),
  level: int('level').default(1),
  experience: int('experience').default(0),
  class: varchar('class', { length: 20 }),
  guild: varchar('guild', { length: 20 }),
  lastLogin: text('last_login'),
  attributes: text('attributes'),
  professions: text('professions'),
  timesClaimed: text('times_claimed'),
  quests: text('quests'),
  waypoints: text('waypoints'),
  friends: text('friends'),
  skills: text('skills'),
  boundSkills: text('bound_skills'),
  health: float('health'),
  mana: float('mana'),
  stamina: float('stamina'),
  stellium: float('stellium'),
  unlockedItems: text('unlocked_items'),
  classInfo: text('class_info'),
  isSaved: boolean('is_saved'),
});