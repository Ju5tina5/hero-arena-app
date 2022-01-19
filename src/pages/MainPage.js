import React from 'react';
import Toolbar from "../components/Toolbar";
import Inventory from "../components/Inventory";
import SelectedHeroCard from "../components/SelectedHeroCard";

const MainPage = () => {
    return (
        <div className={'home d-flex flex-column justify-center'}>
            <Toolbar />
            <div className={'section d-flex justify-center'}>
                <SelectedHeroCard />
                <Inventory />
            </div>
        </div>
    );
};

export default MainPage;