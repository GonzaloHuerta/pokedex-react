import React from 'react';
import DetallePokemon from './DetallePokemon';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion, 
        obtenerPokemonesSiguienteAccion, 
        obtenerPokemonesAnteriorAccion,
        obtenerDetallePokemonAccion } from '../redux/pokeDucks';

const Lista = ()=>{

    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next);
    const previous = useSelector(store => store.pokemones.previous);

    return(
        <div className="row">
            <div className="col-md-6">
                {
                    pokemones.length === 0 ? <button className="btn btn-dark" onClick={ ()=> dispatch(obtenerPokemonesAccion()) }>Obtener pokemones</button> : null
                }
                <ul className="lista-pokemones list-group mt-3 text-capitalize">
                    {
                        pokemones.map(item => (
                            <li className="list-group-item" key={item.url}>
                                {item.name}
                                <button className="btn btn-warning btn-sm float-right" onClick={ ()=> dispatch(obtenerDetallePokemonAccion(item.url)) }>Info</button>
                            </li>
                        ))
                    }
                </ul>
                <div className="mt-3">
                    {
                        previous ? <button className="btn btn-secondary btn-sm" onClick={ ()=> dispatch(obtenerPokemonesAnteriorAccion()) }>Anterior </button> : <button className="btn btn-secondary btn-sm" disabled>Anterior</button>
                    } 
                    {
                        next ? <button className="btn btn-primary btn-sm ml-3" onClick={ ()=> dispatch(obtenerPokemonesSiguienteAccion()) }>Siguiente</button>: <button className="btn btn-primary btn-sm ml-3" disabled>Siguiente</button>
                    }
                </div>
                
            </div>
            {
                pokemones.length > 0 ? <div className="col-md-6 mt-3"><DetallePokemon /></div> : null
            }
        
        </div>
    )
}

export default Lista;