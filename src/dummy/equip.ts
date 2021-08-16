import { EquipType } from '@/types/inventory'
import IMAGE from '@/utils/images'

export const EMPTY_EQUIP: EquipType = {
  id: -1,
  job: '',
  category: '',
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
  MAGIC_ATTACK: {
    base: 0,
    bonus: 0,
    label: '마력',
    reinforce: 0
  },
  AllStat: {
    base: 0,
    bonus: 0,
    label: '올스텟',
    reinforce: 0
  },
  upgrade_avalable: 0,
  max_upgrade: 0,
  upgrade: 0,
  max_star: 0,
  star: 0
}

export const EQUIP_LIST: EquipType[] = [
  {
    id: 0,
    job: '전 직업',
    category: '한손검',
    name: '주황버섯 갓',
    image: IMAGE.EquipImages[0],
    STR: {
      label: 'STR',
      base: 10,
      bonus: 5,
      reinforce: 3
    },
    DEX: {
      label: 'DEX',
      base: 10,
      bonus: 0,
      reinforce: 0
    },
    INT: {
      label: 'INT',
      base: 2,
      bonus: 2,
      reinforce: 1
    },
    LUK: {
      label: 'LUK',
      base: 0,
      bonus: 5,
      reinforce: 0
    },
    HP: {
      label: 'maxHP',
      base: 50,
      bonus: 50,
      reinforce: 0
    },
    MP: {
      label: 'maxMP',
      base: 50,
      bonus: 50,
      reinforce: 0
    },
    WEAPON_ATTACK: {
      base: 50,
      bonus: 50,
      label: '공격력',
      reinforce: 0
    },
    MAGIC_ATTACK: {
      base: 10,
      bonus: 10,
      label: '마력',
      reinforce: 0
    },
    AllStat: {
      label: '올스텟',
      base: 5,
      bonus: 5,
      reinforce: 0
    },
    max_upgrade: 10,
    upgrade_avalable: 3,
    upgrade: 3,
    max_star: 25,
    star: 12
  },
  {
    id: 1,
    job: '전 직업',
    category: '한손검',
    name: '돼지 리본',
    image: IMAGE.EquipImages[1],
    STR: {
      label: 'STR',
      base: 10,
      bonus: 5,
      reinforce: 3
    },
    DEX: {
      label: 'DEX',
      base: 5,
      bonus: 5,
      reinforce: 5
    },
    INT: {
      label: 'INT',
      base: 6,
      bonus: 6,
      reinforce: 6
    },
    LUK: {
      label: 'LUK',
      base: 7,
      bonus: 7,
      reinforce: 7
    },
    HP: {
      label: 'maxHP',
      base: 80,
      bonus: 80,
      reinforce: 80
    },
    MP: {
      label: 'maxMP',
      base: 90,
      bonus: 90,
      reinforce: 90
    },
    WEAPON_ATTACK: {
      label: '공격력',
      base: 100,
      bonus: 50,
      reinforce: 100
    },
    MAGIC_ATTACK: {
      label: '마력',
      base: 10,
      bonus: 10,
      reinforce: 20
    },
    AllStat: {
      label: '올스텟',
      base: 5,
      bonus: 5,
      reinforce: 40
    },
    max_upgrade: 10,
    upgrade_avalable: 3,
    upgrade: 3,
    max_star: 25,
    star: 23
  },
  EMPTY_EQUIP,
  EMPTY_EQUIP,

  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,

  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,

  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,

  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,

  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP,
  EMPTY_EQUIP
]
