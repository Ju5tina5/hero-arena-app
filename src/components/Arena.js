import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getEnemy, handleDamage} from "../features/arenaSlice";
import PlayerCard from "./FightingCards/PlayerCard";
import EnemyCard from "./FightingCards/EnemyCard";
import {decreaseEnergy, increaseEnergy, resetHero} from "../features/heroSlice";
import MiniInventory from "./MiniInventory";
import {useNavigate} from "react-router-dom";

const Arena = () => {

    const dispatch = useDispatch();
    const hero = useSelector(state => state.hero.value);
    const energy = useSelector( state => state.hero.currentEnergy)
    const weapon = useSelector(state => state.hero.equipped);
    const enemy = useSelector(state => state.arena.currentEnemy);
    const victory = useSelector(state => state.arena.victory)


    const [getBattle, setBattle] = useState(false);
    const [getGameOver, setGameOver] = useState(false);
    const [getHealth, setHealth] = useState(hero.health);
    const [getShowInventory, setShowInventory] = useState(false);

    const navigate = useNavigate();


    const handleNewEnemy = () => {
        dispatch(getEnemy());
        setBattle(true);
    }

    const handleGoingHome = () => {
        setBattle(false)
        dispatch(increaseEnergy(hero.energy))
        navigate('/');
    }

    const handleAttack = () => {
        let damage = hero.damage + Math.floor(Math.random() * (hero.weaponDamage - 0 + 1));
        let critical = Math.round(Math.random() * 100)
        if (hero.strength > critical) {
            damage *= 3;
        }
        dispatch(handleDamage(damage))
        dispatch(decreaseEnergy())
        let enemyDamage = Math.round(Math.random() * enemy.maxDamage);
        setHealth(getHealth - enemyDamage)
    }

    const handleNoDamage = () => {
        dispatch(increaseEnergy(hero.strength))
        let enemyDamage = Math.round(Math.random() * enemy.maxDamage);
        setHealth(getHealth - enemyDamage)
    }

    if (getHealth <= 0 && !getGameOver) {
        setGameOver(true)
    }

    if (getGameOver) {
        return (
            <>
                <h1>Game Over</h1>
                <div className={'button'} onClick={() => dispatch(resetHero())}>Start Again</div>
            </>

        );
    } else {
        return (
            <div className={'d-flex justify-center align-center'}>
                {getShowInventory &&
                <MiniInventory health={getHealth} setHealth={setHealth} />}
                <PlayerCard health={getHealth} setInventory={setShowInventory}
                            getInventory={getShowInventory}/>
                {getBattle === true && !victory ?
                     energy >= weapon.energyPerHit ?
                        <div className={'button'} onClick={handleAttack}>Attack</div>
                        : <div className={'button disabled'} onClick={handleNoDamage}>Receive Damage</div>
                    :
                    <div className={'d-flex flex-column justify-evenly'}>
                        <div className={'button'} onClick={handleNewEnemy}>Find Enemy</div>
                        <div className={'button'} onClick={handleGoingHome}>Go Home</div>
                    </div>

                }
                {getBattle && <EnemyCard />}
            </div>
        );
    }
};

export default Arena;