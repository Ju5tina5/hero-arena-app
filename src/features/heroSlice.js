import {createSlice} from '@reduxjs/toolkit'

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        value: null,
        equipped: {
                image: null
            },
        inventory: []
    },
    reducers: {
        setHero: (state, action) => {
            state.value = action.payload;
            for (let i = 0; i < action.payload.inventorySlots; i++) {
                state.inventory.push({image: null});
            }
        },
        resetHero: (state) => {
            state.value = null;
            state.inventory = [];
            state.equipped = {image: null};
        },
        addToInventory: (state, action) => {
            for (let i = 0; i < state.inventory.length; i++) {
                if(!state.inventory[i].image) {
                   state.inventory[i] = action.payload
                    state.value.gold -= action.payload.price;
                    return;
                }
            }
        }
    }
})

export const {setHero, resetHero, addToInventory} = heroSlice.actions

export default heroSlice.reducer
