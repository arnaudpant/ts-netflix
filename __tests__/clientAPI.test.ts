import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { clientAPI } from '../src/api/apiMovieDB'

const keyLang= `?api_key=APIKEY&language=fr-fr&page=1`
const endPoint = 'fake-endPoint'

const server = setupServer(
    http.get(`https://api.themoviedb.org/3/${endPoint}${keyLang}`, () => {
        return HttpResponse.json({
            type: 'movie',
            id: 112233,
            name: 'nameMovie',
            title: 'movieMock',
            overview: 'movieMock',
            backdrop_path: 'backdrop_path',
            poster_path: 'poster_path'
        })
    })
)

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

test('requette API', async () => {
    const result = await clientAPI(endPoint)
    expect(result.data.type).toEqual('movie')
    expect(result.data.id).toEqual(112233)
    expect(result.data.name).toEqual('nameMovie')
    expect(result.data.title).toEqual('movieMock')
    expect(result.data.overview).toEqual('movieMock')
    expect(result.data.backdrop_path).toEqual('backdrop_path')
    expect(result.data.poster_path).toEqual('poster_path')
})
