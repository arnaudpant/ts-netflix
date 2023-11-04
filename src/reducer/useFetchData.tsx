import { useReducer } from "react";

const initialState = {
    data,
    error,
    status
}

function useFetchData () {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {data, error, status} = state
}