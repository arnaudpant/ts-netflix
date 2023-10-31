import ky from 'ky'
import { API_KEY, API_URL, lang } from './config'


// const BASE_URL = 'https://api.themoviedb.org/3/movie/'
// export const httpClient = ky.extend({
//     prefixUrl: BASE_URL 
// })

export const clientAPI = (endPoint: string) => {
    const page = 1
    const startChar = endPoint.includes('?') ? `&` : `?`

    return ky(`${startChar}api_key=${API_KEY}&language=${lang}&page=${page}`,
    { prefixUrl: `${API_URL}${endPoint}/` },
).json()
}
