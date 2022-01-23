import React, {useContext, useEffect} from 'react';
import Toolbar from "../components/Toolbar";
import Inventory from "../components/Inventory";
import SelectedHeroCard from "../components/HeroComponents/SelectedHeroCard";
import DataContext from "../context/DataContext";

const MainPage = () => {

    useEffect(() => {
        if(getErrorMessage.length > 0){
            setErrorMessage([])
        }
    }, [])

    const {getErrorMessage, setErrorMessage} = useContext(DataContext);

    return (
        <div className={'home d-flex flex-column justify-center'}>
            <Toolbar />
            <h1>{getErrorMessage[0]}</h1>
            <div className={'section d-flex'}>
                <SelectedHeroCard />
                <Inventory />
            </div>
        </div>
    );
};

export default MainPage;