import React from 'react';
import classes from './HeroCard.module.css';
import
{GiCrossedAxes,
    GiEnergyTank,
    GiGoldBar,
    GiHealthPotion,
    GiRunningNinja
} from 'react-icons/gi';
import {BiDumbbell} from 'react-icons/bi';
import {GrStatusPlaceholderSmall} from 'react-icons/gr';
import {setHero} from "../../features/heroSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';

const HeroCard = ({hero}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleHeroSelection = (hero) => {
        dispatch(setHero(hero))
        navigate('/hero-arena-app/')
    }

    return (
        <div className={`justify-evenly ${classes.heroSelectionCard}`} onClick={() => handleHeroSelection(hero)}>
            <h2>{hero.race}</h2>
            <div className={'d-flex justify-evenly'}>
                <img src={hero.image} alt=""/>
                <div className={`p-5 ${classes.stats}`}>
                    <h4>Stats:</h4>
                    <li>Damage: {hero.damage} <GiCrossedAxes /></li>
                    <li>Energy: {hero.energy} <GiEnergyTank /></li>
                    <li>Gold: {hero.gold} <GiGoldBar /></li>
                    <li>Health: {hero.health} <GiHealthPotion /></li>
                    <li>Inv Slots: {hero.inventorySlots} <GrStatusPlaceholderSmall /></li>
                    <li>Stamina: {hero.stamina} <GiRunningNinja /> </li>
                    <li>Strength: {hero.strength} <BiDumbbell /></li>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;