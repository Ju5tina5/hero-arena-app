import React, {useState} from 'react';
import {useSelector} from "react-redux";
import classes from '../FightingCards/FightingCard.module.css'
import inventoryClasses from '../Inventory.module.css';
import {useDispatch} from "react-redux";
import {addToInventory} from "../../features/heroSlice";
import {removeItem} from "../../features/arenaSlice";

const EnemyCard = () => {


    const enemy = useSelector( state => state.arena.currentEnemy )
    const enemyHealth = useSelector(state => state.arena.enemyHealth)
    const victory = useSelector(state => state.arena.victory);
    const droppedItems = useSelector(state => state.arena.itemsDropped)
    const inventory = useSelector(state => state.hero.inventory)
    const dispatch = useDispatch();


    const handleItemTake = (x, index) => {
        let tempItem = {...x};
        tempItem['isBuying'] = false;
        for (let i = 0; i < inventory.length; i++) {
            if(inventory[i].image === null){
                dispatch(addToInventory(tempItem))
                dispatch(removeItem(index))
                return
            }
        }
    }


    if(victory){
        return (
            <div className={`d-flex flex-column justify-evenly align-center ${classes.card}`}>
                <h1>Victory</h1>
                <div className={'d-flex'}>
                    {droppedItems.length > 0 ?
                        droppedItems.map( (x, i) =>
                                <div key={i} className={inventoryClasses.item}>
                                    <img src={x.image} alt=""/>
                                    <p>Price: {x.price}</p>
                                    <button onClick={() => handleItemTake(x, i)}>Take</button>
                                </div> ): <h2>No items dropped</h2>
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className={`d-flex flex-column justify-evenly align-center ${classes.card}`}>
                <h2>{enemy.name}</h2>
                <img src={enemy.image} alt=""/>
                <p>Max Damage {enemy.maxDamage}</p>
                <h3>HP: {enemy.health}/{enemyHealth}</h3>
                <div className={`${classes.progressBar}`}>
                    <div style={{width: `${(enemy.health/ enemyHealth ) * 100}%`}} className={classes.healthBar}> </div>
                </div>
            </div>
        );
    }
};

export default EnemyCard;