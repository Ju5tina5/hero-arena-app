import {useState} from "react";
import Item from "./Item";
import DataContext from "../context/DataContext";
import {useContext} from "react";



const Shop = () => {

    const [getItems, setItems] = useState('weapons')
    const {trader} = useContext(DataContext)

    return (
        <div className={'shop d-flex flex-column flex-grow-3'}>
            <h2>Shop</h2>
            <div className={'d-flex justify-evenly'}>
                <div className={'button'} onClick={() => setItems('weapons')}>Weapons</div>
                <div className={'button'} onClick={() => setItems('potions')}>Potions</div>
            </div>
            <div className={'d-flex justify-center flex-wrap'}>
                {trader[getItems].map((item, i) =>
                   <Item key={i} item={item} type={getItems} parent={'Shop'} index={i}/>
                )}
            </div>
        </div>
    );
};

export default Shop;