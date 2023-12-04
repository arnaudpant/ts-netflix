import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { AfficheShow } from "../type/types";
import { TYPE_MOVIE, TYPE_TV } from "../utils/config";
export type GlobalContext = {
    movies: any[],
    series: any[],
    addMovie?: any,
    addSeries?: any,
}

type InitialState = {
    movies: AfficheShow[],
    series: AfficheShow[]
}

const HistoryMovieContext = createContext<GlobalContext>({
    movies: [],
    series: [],
    addMovie: () => { },
    addSeries: () => { },
})
/** REDUCER */
const MAX_ELEMENTS = 3
const initialState: InitialState = {
    movies: [],
    series: []
}

const reducer = (state: typeof initialState, action: { type: 'addMovie' | 'addSerie' , payload: AfficheShow  | never }): typeof state => {
    switch (action.type) {
        case 'addMovie':
            return {
                ...state,
                movies: [action.payload, ...state.movies.slice(0, MAX_ELEMENTS - 1)]
            }
        case 'addSerie':
            return {
                ...state,
                series: [action.payload, ...state.series.slice(0, MAX_ELEMENTS - 1)]
            }
        default:
            throw new Error('Action non supportée')
    }
}

const HistoryMovieProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addMovie = useCallback(
        (movie: AfficheShow) => {
            dispatch({ type: 'addMovie', payload: movie })
        }, []
    )

    const addSeries = useCallback(
        (serie: AfficheShow) => {
            dispatch({ type: 'addSerie', payload: serie })
        }, []
    )


    const { series, movies } = state
    const value: GlobalContext = useMemo(()=>({ movies, series, addMovie, addSeries }),[movies, series, addMovie, addSeries]) 
    return <HistoryMovieContext.Provider value={value} {...props} />
}

const useHistoryMovie = () => {
    const context = useContext(HistoryMovieContext)
    if (!context) {
        throw new Error("useHistoryMovie s'utilise avec HistoryMovieProvider")
    }
    return context
}

const useAddHistory = (movie: AfficheShow, type = TYPE_TV) => {
    const { addSeries, addMovie, movies, series } = useHistoryMovie()

    useEffect(() => {
        const MoviesId = movies.map(elt => elt.id).includes(movie.id)
        const SeriesId = series.map(elt => elt.id).includes(movie.id)

        if (type === TYPE_MOVIE && !MoviesId) {
            addMovie(movie)
        }
        if (type === TYPE_TV && !SeriesId) {
            addSeries(movie)
        }

    }, [movie])
}


export { HistoryMovieContext, HistoryMovieProvider, useHistoryMovie, useAddHistory }