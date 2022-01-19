import {useState} from "react";
import Item from "./Item";
import DataContext from "../context/DataContext";
import {useContext} from "react";



const Shop = () => {

    const [getItems, setItems] = useState('weapons')
    const {trader} = useContext(DataContext)

    return (
        <div className={'d-flex flex-column flex-grow-3'}>
            <h2>Shop</h2>
            <div className={'d-flex justify-evenly'}>
                <button onClick={() => setItems('weapons')}>Weapons</button>
                <button onClick={() => setItems('potions')}>Potions</button>
            </div>
            <div className={'d-flex justify-center flex-wrap'}>
                {trader[getItems].map((item, i) =>
                   <Item key={i} item={item} type={getItems}/>
                )}
            </div>
        </div>
    );
};

export default Shop;