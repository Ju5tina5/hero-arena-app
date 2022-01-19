import React from 'react';
import Toolbar from "../components/Toolbar";
import Inventory from "../components/Inventory";
import SelectedHeroCard from "../components/SelectedHeroCard";

const MainPage = () => {
    return (
        <div>
            <Toolbar />
            <div className={'d-flex'}>
                <SelectedHeroCard />
                <Inventory />
            </div>
        </div>
    );
};

export default MainPage;