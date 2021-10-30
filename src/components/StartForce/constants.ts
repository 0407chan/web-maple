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
