import { createSlice } from '@reduxjs/toolkit'

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        value: null
    },
    reducers: {
        setHero: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setHero } = heroSlice.actions

export default heroSlice.reducer
