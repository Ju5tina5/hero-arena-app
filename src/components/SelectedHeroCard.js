import React from 'react';
import {useSelector} from "react-redux";
import classes from "./HeroCard.module.css";
import {GiCrossedAxes, GiEnergyTank, GiGoldBar, GiHealthPotion, GiRunningNinja} from "react-icons/gi";
import {GrStatusPlaceholderSmall} from "react-icons/gr";
import {BiDumbbell} from "react-icons/bi";

const SelectedHeroCard = () => {

    const currentHero = useSelector(state => state.hero.value)

    return (
        <div className={'flex-grow-2'}>
            <div className={'d-flex flex-column'}>
                <h2>{currentHero.race}</h2>
                    <img src={currentHero.image} alt=""/>
                    <div className={` ${classes.stats}`}>
                        <h4>Stats:</h4>
                        <li>Damage: {currentHero.damage} <GiCrossedAxes /></li>
                        <li>Energy: {currentHero.energy} <GiEnergyTank /></li>
                        <li>Gold: {currentHero.gold} <GiGoldBar /></li>
                        <li>Health: {currentHero.health} <GiHealthPotion /></li>
                        <li>Inventory Slots: {currentHero.inventorySlots} <GrStatusPlaceholderSmall /></li>
                        <li>Stamina: {currentHero.stamina} <GiRunningNinja /> </li>
                        <li>Strength: {currentHero.strength} <BiDumbbell /></li>
                    </div>
            </div>
        </div>
    );
};

export default SelectedHeroCard;