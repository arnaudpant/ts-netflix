export type MovieHeader = {
    movie: {
        backdrop_path: string,
        title: string,
        overview: string,
        name? : string
    }
}

export type AfficheShow = {
    type: string,
    id: number,
    title: string,
    overview: string,
    backdrop_path: string,
    poster_path: string
}