import React, { useState, useEffect } from 'react';
import DetallePokemon from './DetallePokemon';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion, 
        obtenerPokemonesSiguienteAccion, 
        obtenerPokemonesAnteriorAccion,
        obtenerDetallePokemonAccion } from '../redux/pokeDucks';

const Grid = ()=>{

    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next);
    const previous = useSelector(store => store.pokemones.previous);

        //QUEDA PENDIENTE PODER MOSTRAR EL GRID CORRECTAMENTE. No se como traer todos los detalles de una
    return(
        <div>
            {
                 pokemones.length === 0 ? <button className="btn btn-dark" onClick={ ()=> dispatch(obtenerPokemonesAccion()) }>Obtener pokemones</button> : null
            }
            <div className="row row-cols-3">
            {
                pokemones.map(item => (
                    <div className="col text-center" key={item.url}>
                        <button onClick={()=>dispatch(obtenerDetallePokemonAccion(item.url))}>INFORMACIÓN</button>
                        
                        {item.name}
                        <DetallePokemon />
                    </div>
                 ))
            }
            </div>

            <div className="col-md-6">
            
                
                <ul className="lista-pokemones list-group mt-3 text-capitalize">
                    
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
    
        </div>  
    )
}

export default Grid;