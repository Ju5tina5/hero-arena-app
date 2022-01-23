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
        currentEnergy: 0,
        extraInventory: 0
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
            state.equipped = {image: null, energyPerHit: 0};
            state.currentEnergy = 0;
            state.successfulRemoval = true;
            state.extraInventory = 0;
        },
        resetEnergy: state => {
            state.currentEnergy = state.value.energy;
        },
        decreaseEnergy: state => {
            state.currentEnergy = state.currentEnergy - state.equipped.energyPerHit
            if (state.currentEnergy < state.value.energy) {
                if ((state.currentEnergy + state.value.stamina) < state.value.energy) {
                    state.currentEnergy = state.currentEnergy + state.value.stamina
                } else {
                    state.currentEnergy = state.value.energy;
                }
            }
        },
        increaseEnergy: (state, action) => {
            if ((state.currentEnergy + action.payload) > state.value.energy) {
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
                    if (tempItem.isBuying) {
                        state.value.gold -= action.payload.price;
                    }
                    return;
                }
            }
        },
        removeItem: (state, action) => {
            state.inventory.splice(action.payload, 1);
            let tempItem = {image: null}
            state.inventory.push(tempItem);
        },
        sellItem: (state, action) => {
            state.inventory.splice(action.payload.index, 1);
            let tempEmpty = {image: null};
            state.inventory.push(tempEmpty);
            state.value.gold += action.payload.price;
        },
        equipItem: (state, action) => {
            //remove item from inventory
            state.inventory.splice(action.payload.index, 1);
            //Create Empty slot
            let tempEmpty = {image: null};
            // push slot to inventory
            state.inventory.push(tempEmpty);
            //set maximum weapon damage
            state.value.weaponDamage = action.payload.data.maxDamage;
                //mapping through item effects array
                action.payload.data.effectsArray.map(x => {
                    //if effect(x) == inventorySlots add number of empty inventory slots to inventory array
                    if (Object.keys(x.effect)[0] === 'inventorySlots') {
                        //loops number of times given by inventory slots value
                        for (let i = 0; i < Object.values(x.effect)[0]; i++) {
                            state.extraInventory += 1;
                            state.inventory.push({image: null})
                        }
                    }
                    // adding remaining effects
                    state.value[Object.keys(x.effect)[0]] += Object.values(x.effect)[0]
                })
                state.equipped = action.payload.data;
        },
        removeEquippedItem: (state, action) => {
            //if slot is not empty all ready
            if (action.payload.image !== null ) {
                let emptySpots = 0;
                // loop through hero inventory counting empty Slots
                for (let i = 0; i < state.inventory.length; i++) {
                    if(state.inventory[i].image === null){
                        emptySpots += 1;
                    }
                }
                //
                if(emptySpots <= state.extraInventory){
                    state.successfulRemoval = false;
                    return;
                }
                //loop through inventory checking if there is empty spot (object with image:null)
                for (let i = 0; i < state.inventory.length; i++) {
                    if (state.inventory[i].image === null) {
                        let tempItem = {...action.payload};
                        state.value.weaponDamage = 0;
                        if (tempItem.effectsArray.length > 0) {
                            //mapping through item effects array
                            tempItem.effectsArray.map(x => {
                                //if effect (x) == inventorySlots
                                if (Object.keys(x.effect)[0] === 'inventorySlots') {
                                    // check if / by removing current weapon where by enough empty spots
                                    if ((emptySpots - state.extraInventory) > 0) {
                                        //looping through added slot amount
                                        while (state.extraInventory !== 0){
                                            for (let k = 0; k < state.inventory.length; k++) {
                                                // if slot is empty use splice to remove, decrease extraInventory by 1
                                                if(state.inventory[k].image === null){
                                                    state.inventory.splice(k, 1)
                                                    state.extraInventory -= 1;
                                                }
                                            }
                                        }

                                    }
                                }
                                state.value[Object.keys(x.effect)[0]] -= Object.values(x.effect)[0]
                            })
                        }
                        state.inventory[i] = tempItem
                        state.equipped = {image: null};
                        state.successfulRemoval = true;
                        return;
                    }
                }
            }
        }
    }
})

export const {
    setHero,
    resetEnergy,
    resetHero,
    addToInventory,
    sellItem,
    equipItem,
    removeEquippedItem,
    removeItem,
    decreaseEnergy,
    increaseEnergy
} = heroSlice.actions

export default heroSlice.reducer
