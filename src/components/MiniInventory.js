import React from 'react';
import classes from './Inventory.module.css'
import {useSelector, useDispatch} from "react-redux";
import {removeItem} from "../features/heroSlice";
import {increaseEnergy} from "../features/heroSlice";

const MiniInventory = ({health, setHealth}) => {

    const inventory = useSelector(state => state.hero.inventory)
    const hero = useSelector(state => state.hero.value)
    const dispatch = useDispatch();
    const energy = useSelector( state => state.hero.currentEnergy)

    const handlePotionUse = (item, index) => {
        if(item.effect.hasOwnProperty('energy')){
            if(energy < hero.energy){
                if((energy + item.effect.energy) < hero.energy){
                    dispatch(increaseEnergy(energy + item.effect.energy))
                    dispatch(removeItem(index))
                } else{
                    dispatch(increaseEnergy(hero.energy))
                    dispatch(removeItem(index))
                }
            }
        } else {
            if(health < hero.health){
                if((health + item.effect.health) < hero.health){
                    setHealth(health + item.effect.health)
                    dispatch(removeItem(index))
                } else{
                    setHealth(hero.health)
                    dispatch(removeItem(index))
                }
            }
        }
    }

    return (
        <div className={classes.miniInventory}>
            <h3>Inventory</h3>
            <div className={'d-flex flex-wrap'}>
                {inventory.map((x, i) => {
                        if (x.hasOwnProperty('maxDamage') || x.image === null || !x.hasOwnProperty('effect')) {
                            return (
                                <div key={i} className={`${classes.item} ${classes.disabled} d-flex align-center`}>
                                    {x.image !== null && <img src={x.image} alt=""/>}
                                </div>)
                        } else {
                            return <div key={i} className={`${classes.item} d-flex flex-column justify-between`}>
                                <img src={x.image} alt=""/>
                                <p>{x.title}</p>
                                <button onClick={() => handlePotionUse(x, i)}>Use</button>
                            </div>
                        }
                    }
                )}
            </div>
        </div>
    );
};

export default MiniInventory;