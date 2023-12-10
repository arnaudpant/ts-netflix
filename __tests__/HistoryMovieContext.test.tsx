import React from 'react'
import { useHistoryMovie, useAddHistory, HistoryMovieProvider } from '../src/context/HistoryMovieContext'
import { expect, test } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { AfficheShow } from '../src/type/types'
import { TYPE_MOVIE, TYPE_TV } from '../src/utils/config'

const wrapperHistoryContext = ({ children }) => {
    return (<HistoryMovieProvider>{children}</HistoryMovieProvider>)
}

test('useHistoryMovie valeur par defaut', async () => {
    const { result } = renderHook(() => useHistoryMovie(), { wrapper: wrapperHistoryContext })
    expect(result.current).toEqual({
        movies: [],
        series: [],
        addMovie: expect.any(Function),
        addSeries: expect.any(Function)
    })
})

test('test useHistoryMovie addMovie()', async () => {
    const movie = { id: '007', name: 'fakeMovie' }
    const { result } = renderHook(() => useHistoryMovie(), { wrapper: wrapperHistoryContext })
    act(() => {
        result.current.addMovie(movie)
    })
    expect(result.current).toEqual({
        movies: [movie],
        series: [],
        addMovie: expect.any(Function),
        addSeries: expect.any(Function)
    })
})

test('test useAddHistory ajout movie + serie', async () => {
    const movie: AfficheShow = {
        type: 'movie',
        id: 500, 
        name: '', 
        title: 'fakeMovie', 
        overview: '',
        backdrop_path: '',
        poster_path: ''
    }
    const serie: AfficheShow = {
        type: 'movie',
        id: 500, 
        name: 'fakeSerie', 
        title: '', 
        overview: '',
        backdrop_path: '',
        poster_path: ''
    }
    const { result } = renderHook(() => {
        useAddHistory(movie, TYPE_MOVIE)
        useAddHistory(serie, TYPE_TV)
        return useHistoryMovie()
    }, 
    { wrapper: wrapperHistoryContext })
    
    expect(result.current).toEqual({
        movies: [movie],
        series: [serie],
        addMovie: expect.any(Function),
        addSeries: expect.any(Function)
    })
})