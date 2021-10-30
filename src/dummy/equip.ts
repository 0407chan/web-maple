import { EquipItemType } from '@/types/inventory'
import IMAGE from '@/utils/images'
import { v4 as uuid } from 'uuid'

export const EMPTY_EQUIP: EquipItemType = {
  id: '',
  job: '',
  level: 0,
  itemId: 0,
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

export const EQUIP_LIST: EquipItemType[] = [
  {
    ...EMPTY_EQUIP,
    id: uuid(),
    job: '전 직업',
    category: 'One-Handed Sword',
    categoryName: '한손검',
    equipGroup: 'Weapon',
    islots: 'Wp',
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
    DEFENCE: {
      base: 0,
      bonus: 0,
      label: '물리 방어력',
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
    maxStar: 25,
    star: 12
  }
  // {
  //   id: uuid(),
  //   job: '전 직업',
  //   category: 'One-Handed Sword',
  //   categoryName: '한손검',
  //   equipGroup: 'Weapon',
  //   islots: 'Wp',
  //   name: '돼지 리본',
  //   image: IMAGE.EquipImages[1],
  //   STR: {
  //     label: 'STR',
  //     base: 15,
  //     bonus: 15,
  //     reinforce: 3
  //   },
  //   DEX: {
  //     label: 'DEX',
  //     base: 16,
  //     bonus: 16,
  //     reinforce: 5
  //   },
  //   INT: {
  //     label: 'INT',
  //     base: 6,
  //     bonus: 6,
  //     reinforce: 6
  //   },
  //   LUK: {
  //     label: 'LUK',
  //     base: 7,
  //     bonus: 7,
  //     reinforce: 7
  //   },
  //   HP: {
  //     label: 'maxHP',
  //     base: 80,
  //     bonus: 80,
  //     reinforce: 80
  //   },
  //   MP: {
  //     label: 'maxMP',
  //     base: 90,
  //     bonus: 90,
  //     reinforce: 90
  //   },
  //   WEAPON_ATTACK: {
  //     label: '공격력',
  //     base: 170,
  //     bonus: 70,
  //     reinforce: 100
  //   },
  //   WEAPON_DEFENCE: {
  //     base: 0,
  //     bonus: 0,
  //     label: '방어력',
  //     reinforce: 0
  //   },
  //   MAGIC_ATTACK: {
  //     label: '마력',
  //     base: 10,
  //     bonus: 10,
  //     reinforce: 20
  //   },
  //   AllStat: {
  //     label: '올스텟',
  //     base: 5,
  //     bonus: 5,
  //     reinforce: 40
  //   },
  //   max_upgrade: 10,
  //   upgrade_avalable: 3,
  //   upgrade: 3,
  //   maxStar: 25,
  //   star: 23
  // },
  // {
  //   id: uuid(),
  //   job: '전 직업',
  //   category: 'One-Handed Sword',
  //   categoryName: '한손검',
  //   equipGroup: 'Weapon',
  //   islots: 'Wp',
  //   name: '나뭇 가지',
  //   image: IMAGE.EquipImages[2],
  //   STR: {
  //     label: 'STR',
  //     base: 20,
  //     bonus: 20,
  //     reinforce: 3
  //   },
  //   DEX: {
  //     label: 'DEX',
  //     base: 23,
  //     bonus: 23,
  //     reinforce: 5
  //   },
  //   INT: {
  //     label: 'INT',
  //     base: 6,
  //     bonus: 6,
  //     reinforce: 6
  //   },
  //   LUK: {
  //     label: 'LUK',
  //     base: 7,
  //     bonus: 7,
  //     reinforce: 7
  //   },
  //   HP: {
  //     label: 'maxHP',
  //     base: 80,
  //     bonus: 80,
  //     reinforce: 80
  //   },
  //   MP: {
  //     label: 'maxMP',
  //     base: 90,
  //     bonus: 90,
  //     reinforce: 90
  //   },
  //   WEAPON_ATTACK: {
  //     label: '공격력',
  //     base: 240,
  //     bonus: 22,
  //     reinforce: 100
  //   },
  //   WEAPON_DEFENCE: {
  //     base: 0,
  //     bonus: 0,
  //     label: '방어력',
  //     reinforce: 0
  //   },
  //   MAGIC_ATTACK: {
  //     label: '마력',
  //     base: 10,
  //     bonus: 10,
  //     reinforce: 20
  //   },
  //   AllStat: {
  //     label: '올스텟',
  //     base: 5,
  //     bonus: 5,
  //     reinforce: 40
  //   },
  //   max_upgrade: 10,
  //   upgrade_avalable: 3,
  //   upgrade: 3,
  //   maxStar: 25,
  //   star: 23
  // },
  // {
  //   id: uuid(),
  //   job: '전 직업',
  //   category: 'One-Handed Sword',
  //   categoryName: '한손검',
  //   equipGroup: 'Weapon',
  //   islots: 'Wp',
  //   name: '슬라임 액체',
  //   image: IMAGE.EquipImages[3],
  //   STR: {
  //     label: 'STR',
  //     base: 34,
  //     bonus: 34,
  //     reinforce: 3
  //   },
  //   DEX: {
  //     label: 'DEX',
  //     base: 31,
  //     bonus: 31,
  //     reinforce: 5
  //   },
  //   INT: {
  //     label: 'INT',
  //     base: 6,
  //     bonus: 6,
  //     reinforce: 6
  //   },
  //   LUK: {
  //     label: 'LUK',
  //     base: 7,
  //     bonus: 7,
  //     reinforce: 7
  //   },
  //   HP: {
  //     label: 'maxHP',
  //     base: 80,
  //     bonus: 80,
  //     reinforce: 80
  //   },
  //   MP: {
  //     label: 'maxMP',
  //     base: 90,
  //     bonus: 90,
  //     reinforce: 90
  //   },
  //   WEAPON_ATTACK: {
  //     label: '공격력',
  //     base: 310,
  //     bonus: 11,
  //     reinforce: 100
  //   },
  //   WEAPON_DEFENCE: {
  //     base: 0,
  //     bonus: 0,
  //     label: '방어력',
  //     reinforce: 0
  //   },
  //   MAGIC_ATTACK: {
  //     label: '마력',
  //     base: 10,
  //     bonus: 10,
  //     reinforce: 20
  //   },
  //   AllStat: {
  //     label: '올스텟',
  //     base: 5,
  //     bonus: 5,
  //     reinforce: 40
  //   },
  //   max_upgrade: 10,
  //   upgrade_avalable: 3,
  //   upgrade: 3,
  //   maxStar: 25,
  //   star: 23
  // }
]
