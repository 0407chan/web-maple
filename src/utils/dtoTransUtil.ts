import {
  getMaxStar,
  getMaxStarForSuperior
} from 'components/StarForce/constants'
import {
  EquipmentItemDto,
  SubCategory,
  subCategoryName
} from 'domains/EquipmentStore/types/equipment.types'
import { EMPTY_EQUIP } from 'dummy/equip'
import { EquipItemType } from 'types/inventory'
import { v4 as uuid } from 'uuid'

export const transDtoToType = (itemDto: EquipmentItemDto): EquipItemType => {
  // console.log(itemDto.description.name, itemDto.typeInfo.subCategory)
  // const newImage = await getEquipmentRawImage({ itemId: itemDto.id })
  const result: EquipItemType = {
    ...EMPTY_EQUIP,
    id: uuid(),
    typeInfo: itemDto.typeInfo,
    itemId: itemDto.id,
    bossReward:
      itemDto.metaInfo.bossReward !== undefined &&
      itemDto.metaInfo.bossReward === true,
    level: itemDto.metaInfo.reqLevel,
    name: itemDto.description.name,
    category: itemDto.typeInfo.subCategory as SubCategory,
    categoryName: subCategoryName[itemDto.typeInfo.subCategory as SubCategory],
    image: `https://maplestory.io/api/${import.meta.env.VITE_REGION}/${
      import.meta.env.VITE_VERSION
    }/item/${itemDto.id}/icon`,
    // image: newImage,
    max_upgrade: itemDto.metaInfo.tuc,
    upgrade: 0,
    isSuperior: itemDto.metaInfo.superiorEqp,
    maxStar: itemDto.metaInfo.superiorEqp
      ? getMaxStarForSuperior(itemDto.metaInfo.reqLevel)
      : getMaxStar(itemDto.metaInfo.reqLevel),
    upgrade_avalable: itemDto.metaInfo.tuc,
    islots: itemDto.metaInfo.islots[0],
    WEAPON_ATTACK: {
      ...EMPTY_EQUIP.WEAPON_ATTACK,
      base: itemDto.metaInfo.incPAD || EMPTY_EQUIP.WEAPON_ATTACK.base
    },
    MAGIC_ATTACK: {
      ...EMPTY_EQUIP.MAGIC_ATTACK,
      base: itemDto.metaInfo.incMAD || EMPTY_EQUIP.MAGIC_ATTACK.base
    },
    STR: {
      ...EMPTY_EQUIP.STR,
      base: itemDto.metaInfo.incSTR || EMPTY_EQUIP.STR.base
    },
    INT: {
      ...EMPTY_EQUIP.INT,
      base: itemDto.metaInfo.incINT || EMPTY_EQUIP.INT.base
    },
    DEX: {
      ...EMPTY_EQUIP.DEX,
      base: itemDto.metaInfo.incDEX || EMPTY_EQUIP.DEX.base
    },
    LUK: {
      ...EMPTY_EQUIP.LUK,
      base: itemDto.metaInfo.incLUK || EMPTY_EQUIP.LUK.base
    },
    MP: {
      ...EMPTY_EQUIP.MP,
      base: itemDto.metaInfo.incMMP || EMPTY_EQUIP.MP.base
    },
    HP: {
      ...EMPTY_EQUIP.HP,
      base: itemDto.metaInfo.incMHP || EMPTY_EQUIP.HP.base
    },
    DEFENCE: {
      ...EMPTY_EQUIP.DEFENCE,
      base: itemDto.metaInfo.incPDD || EMPTY_EQUIP.DEFENCE.base
    },
    AVOIDABLILITY: {
      ...EMPTY_EQUIP.AVOIDABLILITY,
      base: itemDto.metaInfo.incEVA || EMPTY_EQUIP.AVOIDABLILITY.base
    },
    IgnoreDefence: {
      ...EMPTY_EQUIP.IgnoreDefence,
      base: itemDto.metaInfo.imdR || EMPTY_EQUIP.IgnoreDefence.base
    },
    bossDemage: {
      ...EMPTY_EQUIP.bossDemage,
      base: itemDto.metaInfo.bdR || EMPTY_EQUIP.bossDemage.base
    },
    jump: {
      ...EMPTY_EQUIP.jump,
      base: itemDto.metaInfo.incJump || EMPTY_EQUIP.jump.base
    },
    speed: {
      ...EMPTY_EQUIP.speed,
      base: itemDto.metaInfo.incSpeed || EMPTY_EQUIP.speed.base
    }
  }

  return result
}
