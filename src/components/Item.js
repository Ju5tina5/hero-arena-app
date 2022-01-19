import {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import DataContext from "../context/DataContext";
import {addToInventory} from "../features/heroSlice";

const Item = ({item, type}) => {

    const {effects} = useContext(DataContext)
    const money = useSelector(state => state.hero.value.gold)
    const dispatch = useDispatch();


    const handleBuy = (item) => {
        if(money >= item.price){
            dispatch(addToInventory(item))
        } else {
            alert('No money')
        }
    }


    const renderInfo = () => {
        if (type === 'potions') {
            return <>
                <p>{item.title}</p>
                <p>Price {item.price} gold</p>
                <button onClick={() => handleBuy(item)}>Buy</button>
            </>
        }
        if(type === 'weapons'){
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
                <button onClick={() => handleBuy(item)}>Buy</button>
            </>
        }

    }

    return (
        <div className={'box d-flex'}>
            <img src={item.image} alt=""/>
            <div>
                {renderInfo()}
            </div>
        </div>
    );
};

export default Item;