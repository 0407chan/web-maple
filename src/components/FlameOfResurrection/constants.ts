// export const WEAPON_OPTION_NAME = [
//   'WEAPON_ATTACK',
//   'MAGIC_ATTACK',
//   'boss_demage',
//   'demage'

import { EquipItemType } from 'types/inventory'

// ]
export const WEAPON_OPTION_NAME = [
  'STR',
  'DEX',
  'INT',
  'LUK',
  'STR+DEX',
  'STR+INT',
  'STR+LUK',
  'DEX+INT',
  'DEX+LUK',
  'INT+LUK',
  'MaxHP',
  'MaxMP',
  'RequierdLevel',
  'DEFENCE',
  'WEAPON_ATTACK',
  'MAGIC_ATTACK',
  'boss_demage',
  'demage',
  'AllStat'
]
export const ARMER_OPTION_NAME = [
  'STR',
  'DEX',
  'INT',
  'LUK',
  'STR+DEX',
  'STR+INT',
  'STR+LUK',
  'DEX+INT',
  'DEX+LUK',
  'INT+LUK',
  'MaxHP',
  'MaxMP',
  'RequierdLevel',
  'DEFENCE',
  'WEAPON_ATTACK',
  'MAGIC_ATTACK',
  'move_speed',
  'jump',
  'AllStat'
]
export const POWERFUL_FLAME_PERCENTAGE = new Map<number, number>()
export const ETERNAL_FLAME_PERCENTAGE = new Map<number, number>()
for (let i = 1; i <= 100; i++) {
  if (i <= 20) {
    POWERFUL_FLAME_PERCENTAGE.set(i, 1)
  } else if (i > 20 && i <= 50) {
    POWERFUL_FLAME_PERCENTAGE.set(i, 2)
  } else if (i > 50 && i <= 86) {
    POWERFUL_FLAME_PERCENTAGE.set(i, 3)
  } else {
    POWERFUL_FLAME_PERCENTAGE.set(i, 4)
  }

  // if (i <= 25) {
  //   ETERNAL_FLAME_PERCENTAGE.set(i, 2)
  // } else if (i > 25 && i <= 50) {
  //   ETERNAL_FLAME_PERCENTAGE.set(i, 3)
  // } else if (i > 50 && i <= 75) {
  //   ETERNAL_FLAME_PERCENTAGE.set(i, 4)
  // } else {
  //   ETERNAL_FLAME_PERCENTAGE.set(i, 5)
  // }
  if (i <= 29) {
    ETERNAL_FLAME_PERCENTAGE.set(i, 2)
  } else if (i > 29 && i <= 74) {
    ETERNAL_FLAME_PERCENTAGE.set(i, 3)
  } else if (i > 74 && i <= 99) {
    ETERNAL_FLAME_PERCENTAGE.set(i, 4)
  } else {
    ETERNAL_FLAME_PERCENTAGE.set(i, 5)
  }
}

export const WAEPON_LEVEL_SECTION = new Map<number, 1 | 2 | 3 | 4>()
for (let i = 0; i <= 200; i++) {
  if (i < 120) {
    WAEPON_LEVEL_SECTION.set(i, 1)
  } else if (i >= 120 && i < 160) {
    WAEPON_LEVEL_SECTION.set(i, 2)
  } else if (i >= 160 && i < 200) {
    WAEPON_LEVEL_SECTION.set(i, 3)
  } else {
    WAEPON_LEVEL_SECTION.set(i, 4)
  }
}

export const NORMAL_ITEM_SECTION_RATE = {
  1: 0.03,
  2: 0.04,
  3: 0.0503,
  4: 0.06
}
export const BOSS_ITEM_SECTION_RATE = {
  1: 0.09,
  2: 0.12,
  3: 0.15,
  4: 0.18
}
export const NORMAL_ITEM_FLAME_RATE = {
  1: 1,
  2: 2.2215,
  3: 3.65,
  4: 5.365,
  5: 7.345,
  6: 8.75,
  7: 10.25
}
export const BOSS_ITEM_FLAME_RATE = {
  3: 1,
  4: 1.4666,
  5: 2.0166,
  6: 2.6646,
  7: 3.4166
}

export const WAEPON_FLAME_OPTION = {
  rest: {
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30
  },
  150: {
    1: 12,
    2: 17.6,
    3: 24.2,
    4: 32,
    5: 41
  },
  160: {
    1: 15,
    2: 22,
    3: 30.25,
    4: 40,
    5: 51.25
  },
  200: {
    1: 18,
    2: 26.4,
    3: 36.3,
    4: 48,
    5: 61.5
  }
}
export const ARMOR_FLAME_OPTION = {
  rest: {
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30
  },
  130: {
    1: 12,
    2: 17.6,
    3: 24.2,
    4: 32,
    5: 41
  },
  150: {
    1: 12,
    2: 17.6,
    3: 24.2,
    4: 32,
    5: 41
  },
  160: {
    1: 15,
    2: 22,
    3: 30.25,
    4: 40,
    5: 51.25
  },
  200: {
    1: 18,
    2: 26.4,
    3: 36.3,
    4: 48,
    5: 61.5
  }
}

export const isZeroWeapon = (item: EquipItemType): boolean => {
  if (
    item.islots === 'Wp' &&
    (item.name.indexOf('제네시스 라피스') !== -1 ||
      item.name.indexOf('제네시스 라즐리') !== -1 ||
      (item.name.indexOf('라피스') !== -1 && item.name.indexOf('형') !== -1) ||
      (item.name.indexOf('라즐리') !== -1 && item.name.indexOf('형') !== -1))
  ) {
    return true
  }
  return false
}

export const getZeroWeaponAttack = (item: EquipItemType): number => {
  const { name } = item
  if (name === '라피스 1형' || name === '라즐리 1형') {
    return 101
  } else if (name === '라피스 2형' || name === '라즐리 2형') {
    return 104
  } else if (name === '라피스 3형' || name === '라즐리 3형') {
    return 106
  } else if (name === '라피스 4형' || name === '라즐리 4형') {
    return 113
  } else if (name === '라피스 5형' || name === '라즐리 5형') {
    return 120
  } else if (name === '라피스 6형' || name === '라즐리 6형') {
    return 137
  } else if (name === '라피스 7형' || name === '라즐리 7형') {
    return 171
  } else if (name === '라피스 8형' || name === '라즐리 8형') {
    return 205
  } else if (name === '라피스 9형' || name === '라즐리 9형') {
    return 295
  } else if (name === '제네시스 라피스' || name === '제네시스 라즐리') {
    return 341
  } else {
    return 0
  }
}
