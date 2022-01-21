import {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import DataContext from "../context/DataContext";
import {addToInventory, sellItem, equipItem} from "../features/heroSlice";
import {useLocation} from "react-router-dom";

const Item = ({item, type, parent, index}) => {

    let {effects} = useContext(DataContext)
    const money = useSelector(state => state.hero.value.gold)
    const dispatch = useDispatch();
    const location = useLocation();

    const handleBuy = (item) => {
        if (money >= item.price) {
            let tempItem = {...item};
            tempItem['isBuying'] = true;
            dispatch(addToInventory(tempItem))
        } else {
            alert('No money')
        }
    }

    const handleSell = (price) => {
        let sellInfo = {
            price: price,
            index: index
        }
        dispatch(sellItem(sellInfo))
    }

    const handleEquipped = () => {
        let weapon = {
            data: {...item},
            index: index
        }
        if (item.effects.length === 0) {
            dispatch(equipItem(weapon))
        }else{
            let effectsArray = [];
            item.effects.map( x => effectsArray.push(effects[x]))
            weapon.data['effectsArray'] = [...effectsArray];
            dispatch(equipItem(weapon))
        }
    }

    const renderInfo = () => {
        if (type === 'potions') {
            return <>
                <p>{item.title}</p>
                <p>Price {item.price} gold</p>
                {item.image !== null
                && parent === 'Inventory'
                && location.pathname === '/trader' && <button onClick={() => handleSell(item.price/2)}>Sell for 50%</button>}
                {parent !== 'Inventory' && <button onClick={() => handleBuy(item)}>Buy</button>}
            </>
        }
        if (type === 'item') {
            return <>
                <p>Price {item.price} gold</p>
                {item.image !== null
                && parent === 'Inventory'
                && location.pathname === '/trader' && <button onClick={() => handleSell(item.price)}>Sell</button>}
            </>
        }
        if (type === 'weapons') {
            return <>
                <p>Price {item.price} gold</p>
                <p>Max Damage: {item.maxDamage}</p>
                <p>Energy/Hit {item.energyPerHit}</p>
                {item.effects.length > 0 &&
                <>
                    <p>Effects:</p>
                    {item.effects.map((x, i) =>
                        <p key={i}>{effects[x].title}</p>
                    )}
                </>
                }
                {item.image !== null
                && parent === 'Inventory'
                && location.pathname === '/trader' && <button onClick={() => handleSell(item.price/2)}>Sell for 50%</button>}
                {item.image !== null
                && parent === 'Inventory'
                && location.pathname !== '/trader' && <button onClick={handleEquipped}>Equip</button>}
                {parent !== 'Inventory' && <button onClick={() => handleBuy(item)}>Buy</button>}
            </>
        }
    }

    return (
        <div className={'box d-flex flex-column justify-between'}>
            {item.image !== null && <img src={item.image} alt=""/>}
            <div className={'d-flex flex-column p-5'}>
                {renderInfo()}
            </div>
        </div>
    );
};

export default Item;