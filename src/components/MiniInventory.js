import React, {useContext} from 'react';
import classes from './Inventory.module.css'
import {useSelector, useDispatch} from "react-redux";
import {removeItem} from "../features/heroSlice";
import {increaseEnergy} from "../features/heroSlice";
import DataContext from "../context/DataContext";

const MiniInventory = ({health, setHealth}) => {

    const inventory = useSelector(state => state.hero.inventory)
    const hero = useSelector(state => state.hero.value)
    const dispatch = useDispatch();
    const energy = useSelector( state => state.hero.currentEnergy)
    const {getErrorMessage, setErrorMessage} = useContext(DataContext);


    const handlePotionUse = (item, index) => {
        if(item.effect.hasOwnProperty('energy')){
            if(energy < hero.energy){
                if((energy + item.effect.energy) < hero.energy){
                    setErrorMessage([`Yuo used potion, received ${item.effect.energy} energy points`, ...getErrorMessage])
                    dispatch(increaseEnergy(energy + item.effect.energy))
                    dispatch(removeItem(index))
                } else{
                    setErrorMessage([`Yuo used potion, received ${hero.energy - energy} energy points`, ...getErrorMessage])
                    dispatch(increaseEnergy(hero.energy))
                    dispatch(removeItem(index))
                }
            } else {
                setErrorMessage([`Energy Full`, ...getErrorMessage])
            }
        } else {
            if(health < hero.health){
                if((health + item.effect.health) < hero.health){
                    setErrorMessage([`Yuo used potion, received ${item.effect.health} health points`, ...getErrorMessage])
                    setHealth(health + item.effect.health)
                    dispatch(removeItem(index))
                } else{
                    setErrorMessage([`Yuo used potion, received ${hero.health - health} health points`, ...getErrorMessage])
                    setHealth(hero.health)
                    dispatch(removeItem(index))
                }
            } else {
                setErrorMessage([`Health Full`, ...getErrorMessage])
            }
        }
    }

    return (
        <div className={classes.miniInventory}>
            <h3>Inventory</h3>
            <div className={'d-flex flex-wrap justify-center'}>
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
                                <div className={`button ${classes.miniBtn}`} onClick={() => handlePotionUse(x, i)}>Use</div>
                            </div>
                        }
                    }
                )}
            </div>
        </div>
    );
};

export default MiniInventory;