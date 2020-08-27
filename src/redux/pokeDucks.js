import axios from 'axios';

const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: [],
}

//types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const OBTENER_POKEMONES_SIGUIENTE = 'OBTENER_POKEMONES_SIGUIENTE';
const OBTENER_POKEMONES_ANTERIOR = 'OBTENER_POKEMONES_ANTERIOR';
const OBTENER_DETALLE_POKEMON_EXITO = 'OBTENER_DETALLE_POKEMON_EXITO';

//reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case OBTENER_POKEMONES_SIGUIENTE:
            return {...state, ...action.payload}
        case OBTENER_POKEMONES_ANTERIOR:
            return {...state, ...action.payload}
        case OBTENER_DETALLE_POKEMON_EXITO:
            return {...state, detallePokemon: action.payload}
        default:
            return state;
    }
}

//acciones
export const obtenerPokemonesAccion = ()=> async (dispatch, getState)=>{
    if(localStorage.getItem('cargaInicial')){
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('cargaInicial'))   //se vuelve a convertir en array
        });
    }
    else{
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
            dispatch({
                type: OBTENER_POKEMONES_EXITO,
                payload: res.data
            });
            localStorage.setItem('cargaInicial', JSON.stringify(res.data)); //se pasa a string para almacenar en storage
        } catch (error) {
            console.log(error);    
        }
    }
}

export const obtenerPokemonesSiguienteAccion = ()=> async (dispatch, getState)=>{
    const next = getState().pokemones.next;
    if(localStorage.getItem(next)){
        dispatch({
            type: OBTENER_POKEMONES_SIGUIENTE,
            payload: JSON.parse(localStorage.getItem(next))
        });
    }
    else{
        try {
            const res = await axios.get(next);
            dispatch({
                type: OBTENER_POKEMONES_SIGUIENTE,
                payload: res.data,
            });
            localStorage.setItem(next, JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }    
    }
}

export const obtenerPokemonesAnteriorAccion = ()=> async (dispatch, getState)=>{
    const prev = getState().pokemones.previous;
    if(localStorage.getItem(prev)){
        dispatch({
            type: OBTENER_POKEMONES_ANTERIOR,
            payload: JSON.parse(localStorage.getItem(prev))
        });
    }
    else{
        try {
            const res = await axios.get(prev);
            dispatch({
                type: OBTENER_POKEMONES_ANTERIOR,
                payload: res.data,
            });
            localStorage.setItem(prev, JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const obtenerDetallePokemonAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async(dispatch, getState)=>{
    if(localStorage.getItem(url)){
        dispatch({
            type: OBTENER_DETALLE_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        });
    }
    else{
        try {
            const res = await axios.get(url);
            dispatch({
                type: OBTENER_DETALLE_POKEMON_EXITO,
                payload: {
                    nombre: res.data.name,
                    peso: res.data.weight,
                    alto: res.data.height,
                    img: res.data.sprites.front_default
                }
            })
            localStorage.setItem(url, JSON.stringify({
                nombre: res.data.name,
                peso: res.data.weight,
                alto: res.data.height,
                img: res.data.sprites.front_default
            }))
        } catch (error) {
            console.log(error);
        }
    }
}

