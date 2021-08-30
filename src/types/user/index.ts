import { StatusBase } from '../inventory'

export type UserType = {
  userId: number

  STR: StatusBase
  DEX: StatusBase
  INT: StatusBase
  LUK: StatusBase
  HP: StatusBase
  MP: StatusBase
  WEAPON_ATTACK: StatusBase
  MAGIC_ATTACK: StatusBase
}
