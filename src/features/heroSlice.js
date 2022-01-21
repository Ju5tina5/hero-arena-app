import {createSlice} from '@reduxjs/toolkit'

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        value: null,
        equipped: {
            image: null,
            energyPerHit: 0
        },
        inventory: [],
        currentEnergy: 0
    },
    reducers: {
        setHero: (state, action) => {
            let hero = {...action.payload}
            hero['weaponDamage'] = 0;
            state.value = hero;
            state.currentEnergy = hero.energy;
            for (let i = 0; i < action.payload.inventorySlots; i++) {
                state.inventory.push({image: null});
            }
        },
        resetHero: (state) => {
            state.value = null;
            state.inventory = [];
            state.equipped = {image: null};
        },
        decreaseEnergy: state => {
            state.currentEnergy = state.currentEnergy - state.equipped.energyPerHit
            if(state.currentEnergy < state.value.energy){
                if((state.currentEnergy + state.value.stamina) < state.value.energy){
                    state.currentEnergy = state.currentEnergy + state.value.stamina
                } else {
                    state.currentEnergy = state.value.energy;
                }
            }
        },
        increaseEnergy: (state, action) => {
            if((state.currentEnergy + action.payload) > state.value.energy){
                state.currentEnergy = state.value.energy;
            } else {
                state.currentEnergy += action.payload;
            }
        },
        addToInventory: (state, action) => {
            for (let i = 0; i < state.inventory.length; i++) {
                if (!state.inventory[i].image) {
                    let tempItem = {...action.payload};
                    tempItem['effectsArray'] = []
                    state.inventory[i] = tempItem;
                    if(tempItem.isBuying){
                        state.value.gold -= action.payload.price;
                    }
                    return;
                }
            }
        },
        removeItem: (state, action) => {
            state.inventory[action.payload] = {image: null}
        },
        sellItem: (state, action) => {
            state.inventory[action.payload.index] = {image: null};
            state.value.gold += action.payload.price;
        },
        equipItem: (state, action) => {
            //Checking if there is equipped item already, by image.
            if (state.equipped.image !== null) {
                let tempItem = {...action.payload.data};
                if(state.equipped.effectsArray.length > 0){
                    state.equipped.effectsArray.map(x => {
                        if(Object.keys(x.effect)[0] === 'inventorySlots'){
                            let tempInventory = [...state.inventory]
                            for (let i = 0; i < Object.values(x.effect)[0]; i++) {
                                tempInventory.push({image: null})
                            }
                            state.value[Object.keys(x.effect)[0]] -= Object.values(x.effect)[0]
                            state.inventory = [...tempInventory];
                        }
                    })
                }
                state.value.weaponDamage = 0;
                state.inventory[action.payload.index] = state.equipped;
                state.value.weaponDamage = action.payload.data.maxDamage;
                if (tempItem.effectsArray.length > 0) {
                    tempItem.effectsArray.map(x => state.value[Object.keys(x.effect)[0]] += Object.values(x.effect)[0])
                }
                state.equipped = tempItem;
            } else {
                state.inventory[action.payload.index] = {image: null};
                state.value.weaponDamage = action.payload.data.maxDamage;
                action.payload.data.effectsArray.map(x => {
                    if(Object.keys(x.effect)[0] === 'inventorySlots'){
                        for (let i = 0; i < Object.values(x.effect)[0]; i++) {
                            state.inventory.push({image: null})
                        }
                    }
                    state.value[Object.keys(x.effect)[0]] += Object.values(x.effect)[0]
                })
                state.equipped = action.payload.data;
            }
        },
        removeEquippedItem: (state, action) => {
               if(action.payload.image !== null){
                   for (let i = 0; i < state.inventory.length; i++) {
                        if(state.inventory[i].image === null){
                            let tempItem = {...action.payload};
                            state.value.weaponDamage = 0;
                            if(tempItem.effectsArray.length > 0){
                                tempItem.effectsArray.map(x => {
                                    if(Object.keys(x.effect)[0] === 'inventorySlots'){
                                        for (let i = 0; i < Object.values(x.effect)[0]; i++) {
                                            for (let j = 0; j < state.inventory.length; j++) {
                                                if(state.inventory[j].image === null){
                                                    state.inventory.splice(j, 1)
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                    state.value[Object.keys(x.effect)[0]] -= Object.values(x.effect)[0]
                                })

                            }
                            state.inventory[i] = tempItem
                            state.equipped = {image: null};
                            return;
                        }
                   }
               }
        }

    }
})

export const {setHero, resetHero, addToInventory, sellItem, equipItem, removeEquippedItem, removeItem, decreaseEnergy, increaseEnergy} = heroSlice.actions

export default heroSlice.reducer
