import { useCallback, useReducer } from "react";

/** 3 reducer */
const reducer = (state:any, action: any) => {
    switch (action.type) {
        case 'fetching': 
            return {status: 'fetching', data: null, error: null}
        case 'done': 
            return {status: 'done', data: action.payload, error: null}
        case 'error': 
            return {status: 'error', data: null, error: action.error}
            default:
                return state
    }
}
/** 2 state initial */
const initialState = {
    data: null,
    error: null,
    status: 'idle'
}

/** Hook utilisant le reducer */
export function useFetchData () {

    const [state, dispatch] = useReducer(reducer, initialState)
    const {data, error, status} = state

    const execute = useCallback((promise: any) => {
        dispatch({type: 'fetching'})
        promise
        .then((data: any )=> dispatch({type: 'done', payload: data}))
        .catch((error: any) => {
            console.log(error.response.data)
            dispatch({type: 'error', error: error})}
        )
    }, [])
    return { data, error, status, execute }
}