import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import classes from "./HeroCard.module.css";
import {GiCrossedAxes, GiEnergyTank, GiGoldBar, GiHealthPotion, GiRunningNinja} from "react-icons/gi";
import {GrStatusPlaceholderSmall} from "react-icons/gr";
import {BiDumbbell} from "react-icons/bi";
import {resetHero} from "../features/heroSlice";

const SelectedHeroCard = () => {

    const currentHero = useSelector(state => state.hero.value)
    const equipped = useSelector(state => state.hero.equipped)
    const dispatch = useDispatch();

    return (
        <div className={'d-flex flex-column flex-grow-2'}>
            <div className={`d-flex flex-column flex-grow-3 ${classes.selectedHero}`}>
                <h2>{currentHero.race}</h2>
                <div className={'d-flex'}>
                    <img className={'flex-grow-1'} src={currentHero.image} alt=""/>
                    <div className={`d-flex flex-grow-1 flex-column align-center justify-evenly ${classes.statBox}`}>
                        <h4>Stats:</h4>
                        <li>Damage: {currentHero.damage} <GiCrossedAxes/></li>
                        <li>Energy: {currentHero.energy} <GiEnergyTank/></li>
                        <li>Gold: {currentHero.gold} <GiGoldBar/></li>
                        <li>Health: {currentHero.health} <GiHealthPotion/></li>
                        <li>Inventory Slots: {currentHero.inventorySlots} <GrStatusPlaceholderSmall/></li>
                        <li>Stamina: {currentHero.stamina} <GiRunningNinja/></li>
                        <li>Strength: {currentHero.strength} <BiDumbbell/></li>
                        <div className={'box'}>
                            <img src={equipped.image} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <button className={'m-5 p-5'} onClick={() => dispatch(resetHero())}>Change Hero</button>
        </div>
    );
};

export default SelectedHeroCard;