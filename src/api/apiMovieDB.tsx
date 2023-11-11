import { API_KEY, BASE_URL, lang } from '../utils/config'
import axios from "axios";

export const clientAPI = async (endPoint: string) => {
    const page = 1
    const startChar = endPoint.includes('?') ? `&` : `?`
    // endPoint = type = movie/5657484
    const keyLang = `${startChar}api_key=${API_KEY}&language=${lang}&page=${page}`

    return axios.get(`${BASE_URL}/${endPoint}${keyLang}`)
}
