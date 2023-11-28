import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
export type GlobalContext = {
    movies: any[],
    series: any[],
    setMovies: Dispatch<SetStateAction<never[]>>,
    setSeries: Dispatch<SetStateAction<never[]>>,
}

const HistoryMovieContext = createContext<GlobalContext>({
    movies: [],
    series: [],
    setMovies: ()=> {},
    setSeries: ()=> {},
})

const HistoryMovieProvider = (props:any) => {
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const value: GlobalContext = { movies, series, setMovies, setSeries }

    return <HistoryMovieContext.Provider value={value} {...props} />
}

const useHistoryMovie = () => {
    const context = useContext(HistoryMovieContext)
    if(!context){
        throw new Error("useHistoryMovie s'utilise avec HistoryMovieProvider")
    }
    return context
}


export {HistoryMovieContext, HistoryMovieProvider, useHistoryMovie}