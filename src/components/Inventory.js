import React, {useState} from 'react';
import classes from './Inventory.module.css';
import {useSelector} from "react-redux";
import {GiGoldBar} from "react-icons/gi";
import Item from "./Item";


const Inventory = () => {


    const inventory = useSelector(state => state.hero.inventory);
    const money = useSelector(state => state.hero.value.gold)

    function determineType(item) {
       if(item.hasOwnProperty('maxDamage')){
           return 'weapons'
       }
       if(item.hasOwnProperty('title')){
           return 'potions'
       }
       if(!item.hasOwnProperty('maxDamage') && !item.hasOwnProperty('title') && item.hasOwnProperty('price')){
           return 'item'
       }
    }


    return (
        <div className={`p-5 d-flex flex-column flex-grow-2 ${classes.inventory}`}>
            <div className={classes.inventoryWrapper}>
                <h3>Inventory</h3>
                <div className={`d-flex flex-wrap align-center justify-center ${classes.relative}`}>
                    {inventory.map((x, i) => <Item key={i} item={x} type={determineType(x)} index={i} parent={'Inventory'} />)}
                </div>
                <h2 className={classes.money} style={{color: 'gold'}}> <GiGoldBar/> {money}</h2>
            </div>
        </div>
    );
};

export default Inventory;