import React from 'react';
import {useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { obtenerDetallePokemonAccion } from '../redux/pokeDucks';


const DetallePokemon = ()=>{
    const dispatch = useDispatch();

    useEffect (() => {
        const fetchData = () => {
            dispatch(obtenerDetallePokemonAccion());
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.detallePokemon);

    return pokemon ? (
        <div className="card">
            <div className="card-body text-center">
                <div className="card-title text-capitalize">
                    {pokemon.nombre}
                </div>
                <img src={pokemon.img} alt={pokemon.nombre} className="img-fluid"/>
                <p className="card-text">
                    Peso: {pokemon.peso} | Altura: {pokemon.alto}
                </p>
            </div>
        </div>
    ):null
}

export default DetallePokemon;