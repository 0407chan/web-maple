import { EquipItemType } from 'types/inventory'
import { StarForceSetting, SuccessRate } from 'types/star-force'

export const getMaxStar = (level: number): number => {
  if (level <= 94) {
    return 5
  } else if (level >= 95 && level <= 107) {
    return 8
  } else if (level >= 108 && level <= 117) {
    return 10
  } else if (level >= 118 && level <= 127) {
    return 15
  } else if (level >= 128 && level <= 137) {
    return 20
  } else return 25
}
export const getMaxStarForSuperior = (level: number): number => {
  if (level <= 94) {
    return 3
  } else if (level >= 95 && level <= 107) {
    return 5
  } else if (level >= 108 && level <= 117) {
    return 8
  } else if (level >= 118 && level <= 127) {
    return 10
  } else if (level >= 128 && level <= 137) {
    return 12
  } else return 15
}

export const getSuccessRate = (
  item: EquipItemType,
  starForceSetting: StarForceSetting
): SuccessRate => {
  let result: SuccessRate = {
    success: 0,
    failMaintain: 0,
    failDecrease: 0,
    destroy: 0
  }
  if (item.starFailNumber === 2)
    return {
      ...result,
      success: 100
    }
  if (item.isSuperior) {
    return getSuperiorSuccessRate(item)
  }
  if (
    starForceSetting.event1516 &&
    (item.star === 5 || item.star === 10 || item.star === 15)
  ) {
    return {
      ...result,
      success: 100
    }
  }

  switch (item.star) {
    case 0:
      result = {
        success: 95,
        failMaintain: 5,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 1:
      result = {
        success: 90,
        failMaintain: 10,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 2:
      result = {
        success: 85,
        failMaintain: 15,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 3:
      result = {
        success: 85,
        failMaintain: 15,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 4:
      result = {
        success: 80,
        failMaintain: 20,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 5:
      result = {
        success: 75,
        failMaintain: 25,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 6:
      result = {
        success: 70,
        failMaintain: 30,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 7:
      result = {
        success: 65,
        failMaintain: 35,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 8:
      result = {
        success: 60,
        failMaintain: 40,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 9:
      result = {
        success: 55,
        failMaintain: 45,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 10:
      result = {
        success: 50,
        failMaintain: 50,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 11:
      result = {
        success: 45,
        failMaintain: 0,
        failDecrease: 55,
        destroy: 0
      }
      break
    case 12:
      result = {
        success: 40,
        failMaintain: 0,
        failDecrease: 59.4,
        destroy: 0.6
      }
      break
    case 13:
      result = {
        success: 35,
        failMaintain: 0,
        failDecrease: 63.7,
        destroy: 1.3
      }
      break
    case 14:
      result = {
        success: 30,
        failMaintain: 0,
        failDecrease: 68.6,
        destroy: 1.4
      }
      break
    case 15:
      result = {
        success: 30,
        failMaintain: 67.9,
        failDecrease: 0,
        destroy: 2.1
      }
      break
    case 16:
      result = {
        success: 30,
        failMaintain: 0,
        failDecrease: 67.9,
        destroy: 2.1
      }
      break
    case 17:
      result = {
        success: 30,
        failMaintain: 0,
        failDecrease: 67.9,
        destroy: 2.1
      }
      break
    case 18:
      result = {
        success: 30,
        failMaintain: 0,
        failDecrease: 67.2,
        destroy: 2.8
      }
      break
    case 19:
      result = {
        success: 30,
        failMaintain: 0,
        failDecrease: 67.2,
        destroy: 2.8
      }
      break
    case 20:
      result = {
        success: 30,
        failMaintain: 63,
        failDecrease: 0,
        destroy: 7
      }
      break
    case 21:
      result = {
        success: 30,
        failMaintain: 0,
        failDecrease: 63,
        destroy: 7
      }
      break
    case 22:
      result = {
        success: 3,
        failMaintain: 0,
        failDecrease: 77.6,
        destroy: 19.4
      }
      break
    case 23:
      result = {
        success: 2,
        failMaintain: 0,
        failDecrease: 68.6,
        destroy: 29.4
      }
      break
    case 24:
      result = {
        success: 1,
        failMaintain: 0,
        failDecrease: 59.4,
        destroy: 39.6
      }
      break
    default:
      result = { ...result }
      break
  }
  return result
}

export const getSuperiorSuccessRate = (item: EquipItemType): SuccessRate => {
  let result: SuccessRate = {
    success: 0,
    failMaintain: 0,
    failDecrease: 0,
    destroy: 0
  }

  switch (item.star) {
    case 0:
      result = {
        success: 50,
        failMaintain: 50,
        failDecrease: 0,
        destroy: 0
      }
      break
    case 1:
      result = {
        success: 50,
        failMaintain: 0,
        failDecrease: 50,
        destroy: 0
      }
      break
    case 2:
      result = {
        success: 45,
        failMaintain: 0,
        failDecrease: 55,
        destroy: 0
      }
      break
    case 3:
    case 4:
      result = {
        success: 40,
        failMaintain: 0,
        failDecrease: 60,
        destroy: 0
      }
      break
    case 5:
      result = {
        success: 40,
        failMaintain: 0,
        failDecrease: 58.2,
        destroy: 1.8
      }
      break
    case 6:
      result = {
        success: 40,
        failMaintain: 0,
        failDecrease: 57,
        destroy: 3
      }
      break
    case 7:
      result = {
        success: 40,
        failMaintain: 0,
        failDecrease: 55.8,
        destroy: 4.2
      }
      break
    case 8:
      result = {
        success: 40,
        failMaintain: 0,
        failDecrease: 54,
        destroy: 6
      }
      break
    case 9:
      result = {
        success: 37,
        failMaintain: 0,
        failDecrease: 53.55,
        destroy: 9.45
      }
      break
    case 10:
      result = {
        success: 35,
        failMaintain: 0,
        failDecrease: 52,
        destroy: 13
      }
      break
    case 11:
      result = {
        success: 35,
        failMaintain: 0,
        failDecrease: 48.75,
        destroy: 16.25
      }
      break
    case 12:
      result = {
        success: 3,
        failMaintain: 0,
        failDecrease: 48.5,
        destroy: 48.5
      }
      break
    case 13:
      result = {
        success: 2,
        failMaintain: 0,
        failDecrease: 49,
        destroy: 49
      }
      break
    case 14:
      result = {
        success: 1,
        failMaintain: 0,
        failDecrease: 49.5,
        destroy: 49.5
      }
      break
  }
  return result
}
export const getStarForceCost = (item: EquipItemType): number => {
  if (item.isSuperior) {
    return getSuperiorStarForceCost(item)
  }

  let result = 0

  if (item.star <= 9) {
    result = 1000 + (Math.pow(item.level, 3) * (item.star + 1)) / 25
  } else if (item.star >= 10 && item.star <= 14) {
    result =
      1000 + (Math.pow(item.level, 3) * Math.pow(item.star + 1, 2.7)) / 400
  } else {
    result =
      1000 + (Math.pow(item.level, 3) * Math.pow(item.star + 1, 2.7)) / 200
  }
  return Math.round(result / 100) * 100
}

export const getSuperiorStarForceCost = (item: EquipItemType): number => {
  const level = Math.round(item.level / 10) * 10
  const result = Math.pow(level, 3.56)
  return Math.round(result / 100) * 100
}

export const canStarForce = (item: EquipItemType): boolean => {
  if (item.typeInfo?.subCategory === 'Katara') return true

  if (item.islots === 'Po' || item.islots === 'Si' || item.islots === 'Me')
    return false

  return true
}

export const canSafeGuard = (item: EquipItemType): boolean => {
  if (item.star >= 12 && item.star <= 16) return true
  return false
}
