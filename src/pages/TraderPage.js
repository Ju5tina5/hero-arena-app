import React from 'react';
import Toolbar from "../components/Toolbar";
import Inventory from "../components/Inventory";
import Shop from '../components/Shop'

const TraderPage = () => {
    return (
        <div className={'trader d-flex flex-column justify-center'}>
            <Toolbar />
            <div className={'section d-flex'}>
                <Shop />
                <Inventory />
            </div>
        </div>
    );
};

export default TraderPage;