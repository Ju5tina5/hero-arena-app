import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import classes from "./HeroCard.module.css";
import {GiCrossedAxes, GiEnergyTank, GiGoldBar, GiHealthPotion, GiRunningNinja} from "react-icons/gi";
import {GrStatusPlaceholderSmall} from "react-icons/gr";
import {BiDumbbell} from "react-icons/bi";
import {removeEquippedItem, resetHero} from "../../features/heroSlice";

const SelectedHeroCard = () => {

    const currentHero = useSelector(state => state.hero.value)
    const equipped = useSelector(state => state.hero.equipped)
    const dispatch = useDispatch();

    const removeEquipped = () => {
        dispatch(removeEquippedItem(equipped));
    }

    return (
        <div className={'d-flex flex-column flex-grow-2'}>
            <div className={`d-flex flex-column ${classes.selectedHero}`}>
                <h2>{currentHero.race}</h2>
                <div className={'d-flex justify-center align-center'}>
                    <img className={'flex-grow-1'} src={currentHero.image} alt=""/>
                    <div className={`d-flex flex-grow-3 flex-column justify-evenly align-center ${classes.statBox}`}>
                        <h4>Stats:</h4>
                        <li>Damage: {currentHero.damage} <GiCrossedAxes/>
                            {currentHero.weaponDamage > 0 &&  <span>(+ 0 to {currentHero.weaponDamage})</span>}
                        </li>
                        <li>Energy: {currentHero.energy} <GiEnergyTank/></li>
                        <li>Gold: {currentHero.gold} <GiGoldBar/></li>
                        <li>Health: {currentHero.health} <GiHealthPotion/></li>
                        <li>Inventory Slots: {currentHero.inventorySlots} <GrStatusPlaceholderSmall/></li>
                        <li>Stamina: {currentHero.stamina} <GiRunningNinja/></li>
                        <li>Strength: {currentHero.strength} <BiDumbbell/></li>
                        <div className={'d-flex flex-column'}>
                            <h3>Double Click to remove Item</h3>
                            <div className={`d-flex ${classes.equippedItem}`} onDoubleClick={ () => removeEquipped(equipped)}>
                                {equipped.image !== null && <img className={'flex-grow-2'} src={equipped.image} alt=""/>}
                                <div className={'d-flex flex-column flex-grow-3'} >
                                    {equipped.maxDamage && <p>Max Damage: {equipped.maxDamage}</p>}
                                    {equipped.maxDamage && <p>Energy/Hit: {equipped.energyPerHit}</p>}
                                    {equipped.effectsArray ?
                                        <> <h4>Effects</h4>
                                        {equipped.effectsArray.map((x, i) =>
                                            <div key={i}>
                                                <p>{x.title}</p>
                                            </div>
                                        )}
                                        </>
                                        :''}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div  className={'m-5 p-5 button'} onClick={() => dispatch(resetHero())}>Change Hero</div>
            </div>
        </div>
    );
};

export default SelectedHeroCard;