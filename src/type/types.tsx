import { TYPE_MOVIE, TYPE_TV } from "../utils/config"

export type MovieHeader = {
    movie: {
        backdrop_path: string,
        title: string,
        overview: string,
        name? : string
    }
}

export type AfficheShow = {
    type: typeof TYPE_MOVIE | typeof TYPE_TV,
    id: number,
    name: string,
    title: string,
    overview: string,
    backdrop_path: string,
    poster_path: string
}