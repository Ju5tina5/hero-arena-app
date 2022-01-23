import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getEnemy, handleDamage, updateLog, checkIfVictory} from "../features/arenaSlice";
import PlayerCard from "./FightingCards/PlayerCard";
import EnemyCard from "./FightingCards/EnemyCard";
import {decreaseEnergy, increaseEnergy, resetHero} from "../features/heroSlice";
import MiniInventory from "./MiniInventory";
import {useNavigate} from "react-router-dom";
import DataContext from "../context/DataContext";

const Arena = () => {

    const dispatch = useDispatch();
    const hero = useSelector(state => state.hero.value);
    const energy = useSelector( state => state.hero.currentEnergy);
    const weapon = useSelector(state => state.hero.equipped);
    const enemy = useSelector(state => state.arena.currentEnemy);
    const victory = useSelector(state => state.arena.victory);
    const enemyLog = useSelector(state => state.arena.enemyLog);
    const enemyHealth = useSelector(state => state.arena.enemyHealth)

    const {getErrorMessage, setErrorMessage} = useContext(DataContext);


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
        setBattle(false);
        setErrorMessage([]);
        dispatch(updateLog(''))
        dispatch(increaseEnergy(hero.energy))
        navigate('/');
    }

    const handleAttack = () => {
        let damage = hero.damage + Math.floor(Math.random() * (hero.weaponDamage - 0 + 1));
        let critical = Math.round(Math.random() * 100)
        let isCritical = false;
        if (hero.strength > critical) {
            damage *= 3;
            isCritical = true;
        }
        if (isCritical) {
            setErrorMessage([`Critical Damage ${damage}`, ...getErrorMessage])
        } else {
            setErrorMessage([`You did ${damage} damage`, ...getErrorMessage])
        }
        dispatch(decreaseEnergy())
        dispatch(handleDamage(damage))
        enemyDamage();
    }

    const enemyDamage = () => {
        let enemyDamage = Math.round(Math.random() * enemy.maxDamage)
        setHealth(getHealth - enemyDamage)
        dispatch(updateLog(`${enemy.name} did ${enemyDamage} damage`))
    }


    const handleNoDamage = () => {
        dispatch(increaseEnergy(hero.strength))
        let enemyDamage = Math.round(Math.random() * enemy.maxDamage);
        setHealth(getHealth - enemyDamage)
    }

    if (getHealth <= 0 && !getGameOver) {
        setTimeout( () => {
            setGameOver(true)
            dispatch(updateLog(''))
        }, 1500 )
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
            <div className={'d-flex flex-column align-center'}>
                <div className={'d-flex'}>
                    {getShowInventory &&
                    <MiniInventory health={getHealth} setHealth={setHealth} />}
                    <PlayerCard health={getHealth} setInventory={setShowInventory}
                                getInventory={getShowInventory}/>
                    {getBattle && <EnemyCard />}
                </div>
                {getBattle === true && !victory ?
                     energy >= weapon.energyPerHit ?
                        <div className={'button'} onClick={handleAttack}>Attack</div>
                        : <div className={'button disabled'} onClick={handleNoDamage}>Receive Damage</div>
                    :
                    <div className={'d-flex justify-evenly'}>
                        <div className={'d-flex'}>
                            <div className={'button'} onClick={handleNewEnemy}>Find Enemy</div>
                            <div className={'button'} onClick={handleGoingHome}>Go Home</div>
                        </div>
                    </div>
                }
                <div className={'d-flex m-5 p-5 battleLog justify-between'}>
                    <div className={'d-flex flex-column'}>
                        {getErrorMessage.map( (x, i) =>
                            <p key={i}>{x}</p>
                        )}
                    </div>
                    <div className={'d-flex flex-column enemy'}>
                        {enemyLog.map( (x, i) =>
                            <p key={i}>{x}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default Arena;