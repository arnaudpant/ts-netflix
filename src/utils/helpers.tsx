import { TYPE_MOVIE, TYPE_TV } from "./config"

export function getRandomIndex (min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomType (): any {
    return [TYPE_TV, TYPE_MOVIE][getRandomIndex(0, 1)]
}


export function sleep (tempo: number): void {
    new Promise(resolve => setTimeout(resolve, tempo))
}