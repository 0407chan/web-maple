export const numberUnit = (num: number): string => {
  const numString = num.toString()
  let result = ''

  // 경
  if (numString.length > 12) {
    result += `${numString.slice(-16, -12)}경`
    if (Number(numString.slice(-12, -8)) > 0) {
      result += ` ${numString.slice(-12, -8)}억`
    }
  }
  // 억
  else if (numString.length <= 12 && numString.length > 8) {
    result += `${numString.slice(-12, -8)}억`
    if (Number(numString.slice(-8, -4)) > 0) {
      result += ` ${numString.slice(-8, -4)}만`
    }
  }
  // 만
  else if (numString.length <= 8 && numString.length > 4) {
    result += `${numString.slice(-8, -4)}만`
  }
  return result
}
