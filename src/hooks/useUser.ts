import { useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'
import { EquipItemType } from 'types/inventory'

const useUser = () => {
  const user = useAppSelector((state: RootState) => state.userReducer.user)

  // 스공 계산
  const getStatAttack = (item: EquipItemType) => {
    const { STR, DEX, AllStat, WEAPON_ATTACK } = item

    const result = Math.floor(
      (1 + ((STR.base + STR.bonus) * 4 + (DEX.base + DEX.bonus)) * 0.01) *
        (WEAPON_ATTACK.base + WEAPON_ATTACK.bonus)
    )

    return result
  }
  return {
    user,
    getStatAttack
  }
}

export default useUser
