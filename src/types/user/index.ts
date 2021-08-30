export type UserStatBase = {
  base: number
  bonus: number
}

export type UserType = {
  userId: number

  STR: UserStatBase
  DEX: UserStatBase
  INT: UserStatBase
  LUK: UserStatBase
  HP: UserStatBase
  MP: UserStatBase
  WEAPON_ATTACK: UserStatBase
  MAGIC_ATTACK: UserStatBase
}
