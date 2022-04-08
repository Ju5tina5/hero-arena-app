import React from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";

const Toolbar = () => {

    const location = useLocation();

    return (
        <div className={'toolbar d-flex justify-evenly'}>
            {location.pathname === '/'
                ?<Link to={'/hero-arena-app/trader'}>Trader</Link>
                :<Link to={'/hero-arena-app/'}>Home</Link>}
            <Link to={'/hero-arena-app/arena'}>Arena</Link>
        </div>
    );
};

export default Toolbar;