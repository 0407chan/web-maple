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
}

export type StarForceResult = {
  destroyed: number
  cost: number
}
