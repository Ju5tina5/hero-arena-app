import './App.css';
import {Routes, Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import MainPage from "./pages/MainPage";
import HeroSelectionPage from "./pages/HeroSelectionPage";
import ArenaPage from "./pages/ArenaPage";
import TraderPage from "./pages/TraderPage";
import DataContext from "../src/context/DataContext";

const characters = [
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blte097d3ac18c5b8ed/6165ec51ff59d903990f26e3/EE3E9KVL9ROW1613677289232.png",
        race: "Human",
        damage: 3,
        health: 150,
        energy: 50,
        stamina: 3,
        strength: 1,
        inventorySlots: 3,
        gold: 100
    },
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/bltad40c8b16ba5146c/6165db02ff59d903990f26dd/3BSJB91SIUBO1613677288515.png",
        race: "Dwarf",
        damage: 5,
        health: 90,
        energy: 30,
        stamina: 4,
        strength: 3,
        inventorySlots: 5,
        gold: 300
    },
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/bltdd9c3bc7630ea097/6165ee1b85a779070bc77f55/A62H0NRB056O1613677289519.png",
        race: "Elf",
        damage: 4,
        health: 100,
        energy: 40,
        stamina: 5,
        strength: 1,
        inventorySlots: 2,
        gold: 200
    },
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt5440cbe6b11972e4/6165e787c7341a058edee6c1/ZGHFCTYH33H41613677288710.png",
        race: "Gnome",
        damage: 20,
        health: 80,
        energy: 80,
        stamina: 7,
        strength: 1,
        inventorySlots: 4,
        gold: 100000
    },
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt8a0bea138cdc9f77/6165eebb70b75d5011e405d4/GYI6XASNQ8YE1613677290450.png",
        race: "Orc",
        damage: 7,
        health: 120,
        energy: 40,
        stamina: 1,
        strength: 10,
        inventorySlots: 5,
        gold: 50
    },
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blte86b6ed1f29656b9/6165e7dedfd0436b6dcf6e2e/YAAFZMAKCVPG1613677288954.png",
        race: "Goblin",
        damage: 5,
        health: 90,
        energy: 90,
        stamina: 5,
        strength: 2,
        inventorySlots: 3,
        gold: 200
    },
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt9d279b401555fd09/6165efc047c23d6a01ffdf49/NF9Y4RYPBLZ91613677291342.png",
        race: "Troll",
        damage: 6,
        health: 100,
        energy: 70,
        stamina: 4,
        strength: 4,
        inventorySlots: 3,
        gold: 100
    },
    {
        image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt0b1f2cd145aedbcd/6165f001a3e18902e03811d3/4UX5EM1CFKV81613677292421.png",
        race: "Undead",
        damage: 4,
        health: 40,
        energy: 50,
        stamina: 10,
        strength: 1,
        inventorySlots: 8,
        gold: 400
    },
]
const trader = {
    weapons: [
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_04.gif",
            maxDamage: 4,
            price: 50,
            energyPerHit: 20,
            effects: []
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_01.gif",
            maxDamage: 6,
            price: 70,
            energyPerHit: 19,
            effects: []
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Axe_23.gif",
            maxDamage: 7,
            price: 80,
            energyPerHit: 18,
            effects: []
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_ThrowingAxe_03.gif",
            maxDamage: 8,
            price: 120,
            energyPerHit: 17,
            effects: []
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_27.gif",
            maxDamage: 9,
            price: 150,
            energyPerHit: 17,
            effects: []
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_ThrowingAxe_01.gif",
            maxDamage: 10,
            price: 200,
            energyPerHit: 16,
            effects: []
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Hammer_15.gif",
            maxDamage: 11,
            price: 500,
            energyPerHit: 15,
            effects: ["s1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Hammer_09.gif",
            maxDamage: 13,
            price: 600,
            energyPerHit: 17,
            effects: ["s1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Pick_02.gif",
            maxDamage: 13,
            price: 700,
            energyPerHit: 15,
            effects: ["s1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_03.gif",
            maxDamage: 12,
            price: 800,
            energyPerHit: 14,
            effects: ["s1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_47.gif",
            maxDamage: 13,
            price: 900,
            energyPerHit: 15,
            effects: ["s1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_16.gif",
            maxDamage: 15,
            price: 1500,
            energyPerHit: 14,
            effects: ["s1", "i1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Hammer_16.gif",
            maxDamage: 15,
            price: 2000,
            energyPerHit: 15,
            effects: ["s2", "i1", "d1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_02.gif",
            maxDamage: 13,
            price: 4000,
            energyPerHit: 18,
            effects: ["d2", "s1", "h2", "sta1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_34.gif",
            maxDamage: 14,
            price: 10000,
            energyPerHit: 12,
            effects: ["e2", "h3", "i1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_26.gif",
            maxDamage: 12,
            price: 12000,
            energyPerHit: 14,
            effects: ["s3", "sta3", "h2"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Gauntlets_04.gif",
            maxDamage: 9,
            price: 15000,
            energyPerHit: 8,
            effects: ["h4", "d3", "s2", "i1"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_07.gif",
            maxDamage: 18,
            price: 20000,
            energyPerHit: 25,
            effects: ["s4", "i3", "h7"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Axe_04.gif",
            maxDamage: 16,
            price: 23000,
            energyPerHit: 14,
            effects: ["i3", "sta5", "d4", "s3"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_34.gif",
            maxDamage: 17,
            price: 250000,
            energyPerHit: 17,
            effects: ["s3", "i4", "h3", "d3"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_23.gif",
            maxDamage: 15,
            price: 30000,
            energyPerHit: 15,
            effects: ["sta5", "s3", "i2", "h2", "e3"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Axe_11.gif",
            maxDamage: 14,
            price: 35000,
            energyPerHit: 14,
            effects: ["sta4", "s3", "i2", "h4", "e2"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Weapon_ShortBlade_03.gif",
            maxDamage: 18,
            price: 50000,
            energyPerHit: 13,
            effects: ["sta4", "s3", "i2", "h4", "e2", "d4"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_35.gif",
            maxDamage: 18,
            price: 60000,
            energyPerHit: 15,
            effects: ["sta3", "s3", "i5", "h3", "e2", "d2"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_67.gif",
            maxDamage: 18,
            price: 70000,
            energyPerHit: 16,
            effects: ["sta5", "s3", "i3", "h3", "e4", "d3"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_69.gif",
            maxDamage: 20,
            price: 100000,
            energyPerHit: 15,
            effects: ["sta6", "s5", "i5", "h4", "e2", "d5"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Weapon_Shortblade_67.gif",
            maxDamage: 18,
            price: 150000,
            energyPerHit: 13,
            effects: ["sta6", "s5", "i5", "h4", "e2", "d8"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Axe_08.gif",
            maxDamage: 19,
            price: 200000,
            energyPerHit: 14,
            effects: ["sta5", "s5", "i8", "h6", "e4", "d6"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Weapon_ShortBlade_21.gif",
            maxDamage: 10,
            price: 250000,
            energyPerHit: 10,
            effects: ["sta6", "s8", "i6", "h8", "e6", "d6"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_40.gif",
            maxDamage: 14,
            price: 300000,
            energyPerHit: 14,
            effects: ["sta6", "s8", "i5", "h7", "e6", "d10"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Weapon_ShortBlade_06.gif",
            maxDamage: 11,
            price: 350000,
            energyPerHit: 12,
            effects: ["sta7", "s6", "i4", "h6", "e7", "d7"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Sword_43.gif",
            maxDamage: 18,
            price: 400000,
            energyPerHit: 14,
            effects: ["sta6", "s6", "i10", "h6", "e6", "d6"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Mace_48.gif",
            maxDamage: 25,
            price: 500000,
            energyPerHit: 8,
            effects: ["sta6", "s6", "i10", "h6", "e6", "d6"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Weapon_Glave_01.gif",
            maxDamage: 30,
            price: 800000,
            energyPerHit: 5,
            effects: ["sta7", "s7", "i8", "h7", "e7", "d7"]
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Weapon_Hand_10.gif",
            maxDamage: 30,
            price: 1000000,
            energyPerHit: 3,
            effects: ["sta10", "s10", "i10", "h10", "e10", "d10"]
        }

    ],
    potions: [
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 10",
            effect: {
                health: 10
            },
            price: 200
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 20",
            effect: {
                health: 20
            },
            price: 400
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 30",
            effect: {
                health: 30
            },
            price: 600
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 40",
            effect: {
                health: 40
            },
            price: 800
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 50",
            effect: {
                health: 50
            },
            price: 1000
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 60",
            effect: {
                health: 60
            },
            price: 1200
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 70",
            effect: {
                health: 70
            },
            price: 1400
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 80",
            effect: {
                health: 80
            },
            price: 1800
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 90",
            effect: {
                health: 90
            },
            price: 1800
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_21.gif",
            title: "Health + 100",
            effect: {
                health: 100
            },
            price: 2000
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 10",
            effect: {
                energy: 10
            },
            price: 300
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 20",
            effect: {
                energy: 20
            },
            price: 600
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 30",
            effect: {
                energy: 30
            },
            price: 900
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 40",
            effect: {
                energy: 40
            },
            price: 1200
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 50",
            effect: {
                energy: 50
            },
            price: 1500
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 60",
            effect: {
                energy: 60
            },
            price: 1800
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 70",
            effect: {
                energy: 70
            },
            price: 2100
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 80",
            effect: {
                energy: 80
            },
            price: 2400
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 90",
            effect: {
                energy: 90
            },
            price: 2700
        },
        {
            image: "https://wow.gamepressure.com/gfx/icons/INV_Potion_156.gif",
            title: "Energy + 100",
            effect: {
                energy: 100
            },
            price: 3000
        },
    ],
}
const effects = {
    s1: {
        title: "Strength +1",
        effect: {
            strength: 1
        }
    },
    s2: {
        title: "Strength +2",
        effect: {
            strength: 2
        }
    },
    s3: {
        title: "Strength +3",
        effect: {
            strength: 3
        }
    },
    s4: {
        title: "Strength +4",
        effect: {
            strength: 4
        }
    },
    s5: {
        title: "Strength +5",
        effect: {
            strength: 5
        }
    },
    s6: {
        title: "Strength +6",
        effect: {
            strength: 6
        }
    },
    s7: {
        title: "Strength +7",
        effect: {
            strength: 7
        }
    },
    s8: {
        title: "Strength +8",
        effect: {
            strength: 8
        }
    },
    s9: {
        title: "Strength +9",
        effect: {
            strength: 9
        }
    },
    s10: {
        title: "Strength +10",
        effect: {
            strength: 10
        }
    },
    d1: {
        title: "Damage +1",
        effect: {
            damage: 1
        }
    },
    d2: {
        title: "Damage +2",
        effect: {
            damage: 2
        }
    },
    d3: {
        title: "Damage +3",
        effect: {
            damage: 3
        }
    },
    d4: {
        title: "Damage +4",
        effect: {
            damage: 4
        }
    },
    d5: {
        title: "Damage +5",
        effect: {
            damage: 5
        }
    },
    d6: {
        title: "Damage +6",
        effect: {
            damage: 6
        }
    },
    d7: {
        title: "Damage +7",
        effect: {
            damage: 7
        }
    },
    d8: {
        title: "Damage +8",
        effect: {
            damage: 8
        }
    },
    d9: {
        title: "Damage +9",
        effect: {
            damage: 9
        }
    },
    d10: {
        title: "Damage +10",
        effect: {
            damage: 10
        }
    },
    h1: {
        title: "Health +10",
        effect: {
            health: 10
        }
    },
    h2: {
        title: "Health +20",
        effect: {
            health: 20
        }
    },
    h3: {
        title: "Health +30",
        effect: {
            health: 30
        }
    },
    h4: {
        title: "Health +40",
        effect: {
            health: 40
        }
    },
    h5: {
        title: "Health +50",
        effect: {
            health: 50
        }
    },
    h6: {
        title: "Health +60",
        effect: {
            health: 60
        }
    },
    h7: {
        title: "Health +70",
        effect: {
            health: 70
        }
    },
    h8: {
        title: "Health +80",
        effect: {
            health: 80
        }
    },
    h9: {
        title: "Health +90",
        effect: {
            health: 90
        }
    },
    h10: {
        title: "Health +100",
        effect: {
            health: 100
        }
    },
    e1: {
        title: "Energy +10",
        effect: {
            energy: 10
        }
    },
    e2: {
        title: "Energy +20",
        effect: {
            energy: 20
        }
    },
    e3: {
        title: "Energy +30",
        effect: {
            energy: 30
        }
    },
    e4: {
        title: "Energy +40",
        effect: {
            energy: 40
        }
    },
    e5: {
        title: "Energy +50",
        effect: {
            energy: 50
        }
    },
    e6: {
        title: "Energy +60",
        effect: {
            energy: 60
        }
    },
    e7: {
        title: "Energy +70",
        effect: {
            energy: 70
        }
    },
    e8: {
        title: "Energy +80",
        effect: {
            energy: 80
        }
    },
    e9: {
        title: "Energy +90",
        effect: {
            energy: 90
        }
    },
    e10: {
        title: "Energy +100",
        effect: {
            energy: 100
        }
    },
    sta1: {
        title: "Stamina +1",
        effect: {
            stamina: 1
        }
    },
    sta2: {
        title: "Stamina +2",
        effect: {
            stamina: 2
        }
    },
    sta3: {
        title: "Stamina +3",
        effect: {
            stamina: 3
        }
    },
    sta4: {
        title: "Stamina +4",
        effect: {
            stamina: 4
        }
    },
    sta5: {
        title: "Stamina +5",
        effect: {
            stamina: 5
        }
    },
    sta6: {
        title: "Stamina +6",
        effect: {
            stamina: 6
        }
    },
    sta7: {
        title: "Stamina +7",
        effect: {
            stamina: 7
        }
    },
    sta8: {
        title: "Stamina +8",
        effect: {
            stamina: 8
        }
    },
    sta9: {
        title: "Stamina +9",
        effect: {
            stamina: 9
        }
    },
    sta10: {
        title: "Stamina +10",
        effect: {
            stamina: 10
        }
    },
    str1: {
        title: "Strength +1",
        effect: {
            strength: 1
        }
    },
    str2: {
        title: "Strength +2",
        effect: {
            strength: 2
        }
    },
    str3: {
        title: "Strength +3",
        effect: {
            strength: 3
        }
    },
    str4: {
        title: "Strength +4",
        effect: {
            strength: 4
        }
    },
    str5: {
        title: "Strength +5",
        effect: {
            strength: 5
        }
    },
    str6: {
        title: "Strength +6",
        effect: {
            strength: 6
        }
    },
    str7: {
        title: "Strength +7",
        effect: {
            strength: 7
        }
    },
    str8: {
        title: "Strength +8",
        effect: {
            strength: 8
        }
    },
    str9: {
        title: "Strength +9",
        effect: {
            strength: 9
        }
    },
    str10: {
        title: "Strength +10",
        effect: {
            strength: 10
        }
    },
    i1: {
        title: "Inventory slots +1",
        effect: {
            inventorySlots: 1
        }
    },
    i2: {
        title: "Inventory slots +2",
        effect: {
            inventorySlots: 2
        }
    },
    i3: {
        title: "Inventory slots +3",
        effect: {
            inventorySlots: 3
        }
    },
    i4: {
        title: "Inventory slots +4",
        effect: {
            inventorySlots: 4
        }
    },
    i5: {
        title: "Inventory slots +5",
        effect: {
            inventorySlots: 5
        }
    },
    i6: {
        title: "Inventory slots +6",
        effect: {
            inventorySlots: 6
        }
    },
    i7: {
        title: "Inventory slots +7",
        effect: {
            inventorySlots: 7
        }
    },
    i8: {
        title: "Inventory slots +8",
        effect: {
            inventorySlots: 8
        }
    },
    i9: {
        title: "Inventory slots +9",
        effect: {
            inventorySlots: 9
        }
    },
    i10: {
        title: "Inventory slots +10",
        effect: {
            inventorySlots: 10
        }
    }

}

function App() {

    const hero = useSelector(state => state.hero.value)

    if(hero){
        return (
            <div className={'App'}>
                <DataContext.Provider value={{trader, effects}}>
                    <Routes>
                        <Route path={'/'} element={<MainPage />}/>
                        <Route path={'/trader'} element={<TraderPage />}/>
                        <Route path={'/arena'} element={<ArenaPage />}/>
                    </Routes>
                </DataContext.Provider>
            </div>
        );
    } else {
        return (
            <div className={'App'}>
                <HeroSelectionPage heroes={characters}/>
            </div>
        );
    }
}

export default App;
