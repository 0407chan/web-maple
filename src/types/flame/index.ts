export type StatusSettingType = {
  STR?: number
  DEX?: number
  INT?: number
  LUK?: number
  HP?: number
  AllStat?: number
  WEAPON_ATTACK?: number
  MAGIC_ATTACK?: number
  bossDemage?: number
  demage?: number
}

export type StatType = 'STR' | 'LUK' | 'INT' | 'DEX'
export type SimpleStatusSettingType = {
  // 방어구
  expectStat?: number
  statType?: StatType

  // 무기류
  attackGrage?: number
  bossGrade?: number
  allStatGrade?: number
  demageGrade?: number

  attackPerStat?: number
  allStatPerStat?: number
}

export type FlameSettingType = {
  POWERFUL?: number
  ETERNAL?: number
}

export type FlameType = 'ETERNAL' | 'POWERFUL'

export type AutoType = 'SIMPLE' | 'DETAIL'
