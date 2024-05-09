import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store'

interface InitialState {
  attencion: [];
}

const initialState: InitialState = {
  attencion: [],
}

export const attencionsSlice = createSlice({
  name: 'attencions',
  initialState,
  reducers: {
    // increment: (state) => {
    //     state.value += 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// export const { increment, incrementByAmount } = attencionsSlice.actions