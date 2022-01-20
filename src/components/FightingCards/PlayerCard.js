import React, {useState} from 'react';
import classes from './FightingCard.module.css'
import {useSelector} from "react-redux";

const PlayerCard = ({health, energy}) => {


    const hero = useSelector(state => state.hero.value)
    const item = useSelector(state => state.hero.equipped);


    return (
        <div className={`d-flex flex-column justify-evenly align-center ${classes.card}`}>
            <h2>{hero.race}</h2>
            <div className={'d-flex justify-center align-center'}>
                <img className={'flex-grow-1'} src={hero.image} alt=""/>
                <div className={'flex-grow-1'}>
                    <p>Damage {hero.damage} {hero.weaponDamage > 0 &&  <span>(+ 0 to {hero.weaponDamage})</span>} </p>
                    <div className={'item'}>
                        <img src={item.image} alt=""/>
                    </div>
                </div>

            </div>
            <h3>HP: {health}/{hero.health}</h3>
            <div className={`${classes.progressBar}`}>
                <div style={{width: `${(health / hero.health) * 100}%`}} className={classes.healthBar}> </div>
            </div>
            <h3>Energy: {energy}/{hero.energy}</h3>
            <div className={`${classes.progressBar}`}>
                <div style={{width: `${(energy / hero.energy) * 100}%`}} className={classes.energy}> </div>
            </div>
        </div>
    );
};

export default PlayerCard;