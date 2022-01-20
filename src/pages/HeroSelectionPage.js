import React from 'react';
import HeroCard from "../components/HeroComponents/HeroCard";

const HeroSelectionPage = ({heroes}) => {

    return (
        <div className={'d-flex flex-wrap selectionScreen justify-center'}>
            <h1 className={'p-5'}>Choose Your Hero</h1>
            {heroes.map( (x, i) => <HeroCard key={i} hero={x}/>)}
        </div>
    );
};

export default HeroSelectionPage;