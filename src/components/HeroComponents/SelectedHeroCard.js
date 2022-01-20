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
        <div className={'hero d-flex flex-column'}>
            <div className={`d-flex flex-column ${classes.selectedHero}`}>
                <h2>{currentHero.race}</h2>
                <div className={'d-flex'}>
                    <img className={'flex-grow-1'} src={currentHero.image} alt=""/>
                    <div className={`d-flex flex-grow-2 flex-column  justify-evenly ${classes.statBox}`}>
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
                        <div className={'d-flex'}>
                            <div>
                                <h2>Equipped Item:</h2>
                                <h3>Double Click to remove</h3>
                            </div>
                            <div className={'box'} onDoubleClick={ () => removeEquipped(equipped)}>
                                {equipped.image !== null && <img src={equipped.image} alt=""/>}
                                {equipped.maxDamage && <p>Max Damage: {equipped.maxDamage}</p>}
                                {equipped.maxDamage && <p>Energy/Hit: {equipped.energyPerHit}</p>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <button className={'m-5 p-5'} onClick={() => dispatch(resetHero())}>Change Hero</button>
        </div>
    );
};

export default SelectedHeroCard;