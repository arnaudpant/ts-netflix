import { TYPE_MOVIE, TYPE_TV } from "./config"

export function getRandomIndex (min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomType (): string {
    return [TYPE_TV, TYPE_MOVIE][getRandomIndex(0, 1)]
}

export function getRandomMovieId (): number {
    const moviesId: number[] = [399566, 602734, 579047, 385128, 615658]
    return moviesId[getRandomIndex(0, moviesId.length -1)]
}

export function getRandomSerieId (): number {
    const seriesId: number[] = [71446, 60574, 1399, 66732]
    return seriesId[getRandomIndex(0, seriesId.length -1)]
}

export function getRandomMovieOrSerie (type = TYPE_MOVIE): number {
    return type === TYPE_TV ? getRandomSerieId() : getRandomMovieId()
}

export function sleep (tempo: number): void {
    new Promise(resolve => setTimeout(resolve, tempo))
}