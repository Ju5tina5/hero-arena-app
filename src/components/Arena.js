import React, { useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getEnemy, handleDamage} from "../features/arenaSlice";
import PlayerCard from "./FightingCards/PlayerCard";
import EnemyCard from "./FightingCards/EnemyCard";
import {resetHero} from "../features/heroSlice";

const Arena = () => {

    const dispatch = useDispatch();
    const hero = useSelector( state => state.hero.value);
    const weapon = useSelector( state => state.hero.equipped);
    const enemy = useSelector( state => state.arena.currentEnemy);



    const [getBattle, setBattle] = useState(false);
    const [getGameOver, setGameOver] = useState(false);
    const [getHealth, setHealth] = useState(hero.health);
    const [getEnergy, setEnergy] = useState(hero.energy);


    const handleNewEnemy = () => {
      dispatch(getEnemy());
      setBattle(true)
    }

    const handleAttack = () => {
        let damage = hero.damage + Math.floor(Math.random() * (hero.weaponDamage - 0 + 1));
        dispatch(handleDamage(damage))
        setEnergy(getEnergy - weapon.energyPerHit)
        let enemyDamage = Math.round(Math.random() * enemy.maxDamage);
        setHealth( getHealth - enemyDamage)
    }

    if(getHealth <= 0 && !getGameOver){
        setGameOver(true)
    }

    console.log(getEnergy)


    if(getGameOver){
        return (
            <>
                <h1>Game Over</h1>
                <button onClick={() => dispatch(resetHero())}>Start Again</button>
            </>

        );
    } else{
        return (
            <div className={'d-flex justify-center align-center'}>
                <PlayerCard health={getHealth} energy={getEnergy}/>
                {getBattle ?
                    getEnergy >= weapon.energyPerHit ?
                        <button onClick={handleAttack}>Attack</button>
                        : <button disabled={true} className={'disabled'}>Attack</button>
                    :<button onClick={handleNewEnemy}>Find Enemy</button>}
                {getBattle && <EnemyCard />}
            </div>
        );
    }
};

export default Arena;