import {useSelector} from "react-redux";
import classes from '../FightingCards/FightingCard.module.css'
import inventoryClasses from '../Inventory.module.css';
import {useDispatch} from "react-redux";
import {addToInventory} from "../../features/heroSlice";
import {removeItem} from "../../features/arenaSlice";
import {useContext, useEffect} from "react";
import DataContext from "../../context/DataContext";

const EnemyCard = () => {


    const enemy = useSelector( state => state.arena.currentEnemy )
    const enemyHealth = useSelector(state => state.arena.enemyHealth)
    const victory = useSelector(state => state.arena.victory);
    const droppedItems = useSelector(state => state.arena.itemsDropped)
    const inventory = useSelector(state => state.hero.inventory)
    const dispatch = useDispatch();

    const {getErrorMessage, setErrorMessage} = useContext(DataContext);

    useEffect( () => {
        setErrorMessage([`A wild ${enemy.name} appears`, ...getErrorMessage])
    }, [enemy.name])

    const handleItemTake = (x, index) => {
        let tempItem = {...x};
        tempItem['isBuying'] = false;
        let emptySpots = 0;
        for (let i = 0; i < inventory.length; i++) {
            if(inventory[i].image === null){
                emptySpots += 1;
                dispatch(addToInventory(tempItem));
                dispatch(removeItem(index));
                return
            }
        }
        if(emptySpots === 0){
            setErrorMessage([`Inventory full`, ...getErrorMessage])
        }
    }


    if(victory){
        return (
            <div className={`d-flex flex-column justify-center align-center ${classes.card}`}>
                <h1>Victory</h1>
                <div className={'d-flex flex-column justify-center'}>
                    {droppedItems.length > 0 ?
                        <>
                       <h2>Items Dropped</h2>
                            <div className={'d-flex flex-wrap justify-center'}>
                                {droppedItems.map( (x, i) =>
                                    <div key={i} className={inventoryClasses.item}>
                                        <img src={x.image} alt=""/>
                                        <p>Price: {x.price}</p>
                                        <div className={`button ${inventoryClasses.miniBtn}`} onClick={() => handleItemTake(x, i)}>Take</div>
                                    </div> )}
                            </div>
                        </>
                        : <h2>No items dropped</h2>
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