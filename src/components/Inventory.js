import React from 'react';
import classes from './Inventory.module.css';
import {useSelector} from "react-redux";
import {GiGoldBar} from "react-icons/gi";
import {useLocation} from "react-router-dom";


const Inventory = () => {

    const location = useLocation();
    const inventory = useSelector(state => state.hero.inventory);
    const money = useSelector(state => state.hero.value.gold)

    return (
        <div className={`p-5 d-flex flex-column flex-grow-3 ${classes.inventory}`}>
          <h3>Inventory</h3>
            <div className={'d-flex flex-wrap'}>
                {inventory.map((x, i) =>
                    <div key={i} className={'box'}>
                        <img src={x.image} alt=""/>
                        {location.pathname === '/' && <button>Equip</button>}
                        {location.pathname === '/trader' &&  <button>Sell</button>}
                    </div> )}
            </div>
            <h2 style={{color: 'gold'}}> <GiGoldBar/> {money}</h2>
        </div>
    );
};

export default Inventory;