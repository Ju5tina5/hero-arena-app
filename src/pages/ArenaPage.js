import React, {useEffect} from 'react';
import Arena from "../components/Arena";
import {useDispatch} from "react-redux";
import {resetEnergy} from "../features/heroSlice";

const ArenaPage = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(resetEnergy())
    }, [])

    return (
        <div className={'arena d-flex flex-column align-center justify-center'}>
            <h1>Arena</h1>
            <Arena />
        </div>
    );
};

export default ArenaPage;