import { StatusSettingType } from 'types/flame'

export const StatusName: Record<keyof StatusSettingType, string> = {
  AllStat: '올스텟',
  DEX: 'DEX',
  INT: 'INT',
  LUK: 'LUK',
  HP: 'HP',
  MAGIC_ATTACK: '마력',
  STR: 'STR',
  WEAPON_ATTACK: '공격력',
  bossDemage: '보공',
  demage: '데미지'
}
