import ky from 'ky'

const BASE_URL = 'https://api.themoviedb.org/3/movie/'

export const httpClient = ky.extend({
    prefixUrl: BASE_URL 
})