import React, { useState } from 'react';
import DetallePokemon from './DetallePokemon';
import Lista from '../componentes/Lista';
import Grid from '../componentes/Grid';

import { useDispatch, useSelector } from 'react-redux';


const Pokemones = ()=>{

    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next);
    const previous = useSelector(store => store.pokemones.previous);

    const [grid, setGrid] = useState(false);

    const pasarAGrid = ()=>{
        setGrid(true);
    }

    const pasarALista = ()=>{
        setGrid(false);
    }

    return(
        <div className="container">

            <h3 className="text-center mt-2 mb-4">Lista de Pokemones</h3>
            <button className="btn btn-secondary btn-sm mt-3" onClick={pasarAGrid}>Grid</button>
            <button className="btn btn-secondary btn-sm ml-4 mt-3" onClick={pasarALista}>Lista</button>
            <br/><br/>

            {
                grid ? <Grid /> : <Lista />
            }
           
                

        </div>
    )
}

export default Pokemones;