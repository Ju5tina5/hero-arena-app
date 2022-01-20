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
                if (!state.inventory[i].image) {
                    let tempItem = action.payload;
                    tempItem['effectsArray'] = []
                    state.inventory[i] = tempItem;
                    state.value.gold -= action.payload.price;
                    return;
                }
            }
        },
        sellItem: (state, action) => {
            state.inventory[action.payload.index] = {image: null};
            state.value.gold += action.payload.price;
        },

        equipItem: (state, action) => {
            //Checking if there is equipped item already, by image.
            if (state.equipped.image !== null) {
                let tempItem = action.payload.data;
                if(state.equipped.effectsArray.length > 0){
                    state.equipped.effectsArray.map(x => state.value[Object.keys(x.effect)[0]] -= Object.values(x.effect)[0])
                }
                state.value.damage -= state.equipped.maxDamage;
                state.inventory[action.payload.index] = state.equipped;
                state.value.damage += action.payload.data.maxDamage;
                console.log(tempItem)
                if (tempItem.effectsArray.length > 0) {
                    tempItem.effectsArray.map(x => state.value[Object.keys(x.effect)[0]] += Object.values(x.effect)[0])
                }
                state.equipped = tempItem;
            } else {
                state.inventory[action.payload.index] = {image: null};
                state.value.damage += action.payload.data.maxDamage;
                action.payload.data.effectsArray.map(x => {
                    state.value[Object.keys(x.effect)[0]] += Object.values(x.effect)[0]
                })
                state.equipped = action.payload.data;
            }
        },
        removeEquippedItem: (state, action) => {
               if(action.payload.image !== null){
                   let tempItem = action.payload;
               }
        }

    }
})

export const {setHero, resetHero, addToInventory, sellItem, equipItem, removeEquippedItem} = heroSlice.actions

export default heroSlice.reducer
