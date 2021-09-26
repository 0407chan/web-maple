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
