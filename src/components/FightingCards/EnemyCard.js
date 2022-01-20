import React, {useState} from 'react';
import classes from './FightingCard.module.css'
import {useSelector} from "react-redux";

const EnemyCard = () => {

    const enemy = useSelector( state => state.arena.currentEnemy )
    const victory = useSelector(state => state.arena.victory);
    const [getEnemyHealth, setEnemyHealth] = useState(enemy.health)

    if(victory){
        return (
            <div className={`d-flex flex-column justify-evenly align-center ${classes.card}`}>
                <h1>Victory</h1>
            </div>

        );
    } else {
        return (
            <div className={`d-flex flex-column justify-evenly align-center ${classes.card}`}>
                <h2>{enemy.name}</h2>
                <img src={enemy.image} alt=""/>
                <p>Max Damage {enemy.maxDamage}</p>
                <h3>HP: {enemy.health}/{getEnemyHealth}</h3>
                <div className={`${classes.progressBar}`}>
                    <div style={{width: `${(enemy.health/ getEnemyHealth ) * 100}%`}} className={classes.healthBar}> </div>
                </div>
            </div>
        );
    }
};

export default EnemyCard;