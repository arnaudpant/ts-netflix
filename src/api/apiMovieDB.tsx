import { API_KEY, BASE_URL, lang } from '../utils/config'
import axios from "axios";
import { sleep } from '../utils/helpers';

export const clientAPI = async (endPoint: string) => {
    const page = 1
    await sleep(3000)
    const startChar = endPoint.includes('?') ? `&` : `?`
    // endPoint = type = movie/5657484
    const keyLang = `${startChar}api_key=${API_KEY}&language=${lang}&page=${page}`

    return axios.get(`${BASE_URL}/${endPoint}${keyLang}`)
}
