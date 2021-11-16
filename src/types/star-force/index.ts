export type SuccessRate = {
  success: number
  failMaintain: number
  failDecrease: number
  destroy: number
}

export type StarForceSetting = {
  star?: number
  itemCost?: number
  exchangeRate?: number

  eventOnePlusOne: boolean
  event1516: boolean
  event30Percent: boolean
}

export type StarForceResult = {
  destroyed: number
  cost: number
}
