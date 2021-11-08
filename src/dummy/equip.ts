import { EquipItemType } from '@/types/inventory'

export const EMPTY_EQUIP: EquipItemType = {
  id: '',
  job: '',
  level: 0,
  itemId: 0,
  starFailNumber: 0,
  isDestroyed: false,
  bossReward: false,
  category: 'One-Handed Sword',
  categoryName: '한손검',
  equipGroup: 'Weapon',
  islots: 'Wp',
  name: '',
  image: '',
  STR: {
    base: 0,
    bonus: 0,
    label: 'STR',
    reinforce: 0
  },
  DEX: {
    base: 0,
    bonus: 0,
    label: 'DEX',
    reinforce: 0
  },
  INT: {
    base: 0,
    bonus: 0,
    label: 'INT',
    reinforce: 0
  },
  LUK: {
    base: 0,
    bonus: 0,
    label: 'LUK',
    reinforce: 0
  },
  HP: {
    base: 0,
    bonus: 0,
    label: 'maxHP',
    reinforce: 0
  },
  MP: {
    base: 0,
    bonus: 0,
    label: 'maxMP',
    reinforce: 0
  },
  WEAPON_ATTACK: {
    base: 0,
    bonus: 0,
    label: '공격력',
    reinforce: 0
  },
  DEFENCE: {
    base: 0,
    bonus: 0,
    label: '방어력',
    reinforce: 0
  },
  demage: {
    base: 0,
    bonus: 0,
    label: '데미지',
    reinforce: 0
  },
  bossDemage: {
    base: 0,
    bonus: 0,
    label: '보스 몬스터 공격 시 데미지',
    reinforce: 0
  },
  IgnoreDefence: {
    base: 0,
    bonus: 0,
    label: '몬스터 방어력 무시',
    reinforce: 0
  },
  RequierdLevel: {
    base: 0,
    bonus: 0,
    label: '착용 레벨 감소',
    reinforce: 0
  },
  MAGIC_ATTACK: {
    base: 0,
    bonus: 0,
    label: '마력',
    reinforce: 0
  },
  AVOIDABLILITY: {
    base: 0,
    bonus: 0,
    label: '회피율',
    reinforce: 0
  },
  AllStat: {
    base: 0,
    bonus: 0,
    label: '올스텟',
    reinforce: 0
  },
  jump: {
    base: 0,
    bonus: 0,
    label: '점프력',
    reinforce: 0
  },
  speed: {
    base: 0,
    bonus: 0,
    label: '이동속도',
    reinforce: 0
  },
  isSuperior: false,
  upgrade_avalable: 0,
  max_upgrade: 0,
  upgrade: 0,
  maxStar: 0,
  star: 0
}
