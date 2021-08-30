import { UserType } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  user: UserType
}

const initUser: UserType = {
  userId: 1,
  STR: {
    base: 0,
    bonus: 0
  },
  DEX: {
    base: 0,
    bonus: 0
  },
  INT: {
    base: 0,
    bonus: 0
  },
  LUK: {
    base: 0,
    bonus: 0
  },
  HP: {
    base: 0,
    bonus: 0
  },
  MP: {
    base: 0,
    bonus: 0
  },
  WEAPON_ATTACK: {
    base: 0,
    bonus: 0
  },
  MAGIC_ATTACK: {
    base: 0,
    bonus: 0
  }
}
const initialState: UserState = {
  user: initUser
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer
