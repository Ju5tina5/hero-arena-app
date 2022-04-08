import {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DataContext from "../context/DataContext";
import {addToInventory, sellItem, equipItem} from "../features/heroSlice";
import {useLocation} from "react-router-dom";
import classes from "./Inventory.module.css";

const Item = ({item, type, parent, index}) => {

    const [getCanBuy, setCanBuy] = useState(true);
    const {effects, setErrorMessage, getErrorMessage} = useContext(DataContext)
    const money = useSelector(state => state.hero.value.gold)
    const equipped = useSelector(state => state.hero.equipped)
    const dispatch = useDispatch();
    const location = useLocation();

    const handleBuy = (item) => {
        if (money >= item.price) {
            let tempItem = {...item};
            tempItem['isBuying'] = true;
            dispatch(addToInventory(tempItem))
        } else {
            setCanBuy(false)
            setTimeout( () => {
                setCanBuy(true)
            },1500)
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
        if(equipped.image !== null){
            setErrorMessage(['Remove equipped item first', ...getErrorMessage])
            setTimeout(() => {
                setErrorMessage([]);
            }, 1000)
        } else{
            let weapon = {
                data: {...item},
                index: index,
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
    }
    const renderInfo = () => {
        if (type === 'potions') {
            return <>
                <p>{item.title}</p>
                <p className={`${!getCanBuy?"warning":""}`}>Price {item.price} gold</p>
                {item.image !== null
                && parent === 'Inventory'
                && location.pathname === '/trader' && <div className={'button'} onClick={() => handleSell(item.price/2)}>Sell for 50%</div>}
                {parent !== 'Inventory' && <div className={'button'} onClick={() => handleBuy(item)}>Buy</div>}
            </>
        }
        if (type === 'item') {
            return <>
                <p>Price {item.price} gold</p>
                {item.image !== null
                && parent === 'Inventory'
                && location.pathname === '/trader' && <div className={'button'} onClick={() => handleSell(item.price)}>Sell</div>}
            </>
        }
        if (type === 'weapons') {
            return <>
                <p className={`${!getCanBuy?"warning":""}`}>Price {item.price} gold</p>
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
                && location.pathname === '/trader' && <div className={'button'} onClick={() => handleSell(item.price/2)}>Sell for 50%</div>}
                {item.image !== null
                && parent === 'Inventory' && location.pathname !== '/trader' && <div className={`button ${equipped.image !== null && classes.disabled}`} onClick={handleEquipped}>Equip</div>}
                {parent !== 'Inventory' && <div className={'button'} onClick={() => handleBuy(item)}>Buy</div>}
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