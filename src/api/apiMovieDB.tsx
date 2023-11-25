import {lang } from '../utils/config'
import axios from "axios";

export const clientAPI = async (endPoint: string) => {
    const page = 1
    const startChar = endPoint.includes('?') ? `&` : `?`
    const keyLang = `${startChar}api_key=${import.meta.env.VITE_API_KEY}&language=${lang}&page=${page}`

    return axios.get(`https://api.themoviedb.org/3/${endPoint}${keyLang}`)
}

