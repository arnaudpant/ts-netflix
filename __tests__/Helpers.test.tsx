import { expect, test } from 'vitest'
import { getRandomIndex, getRandomType } from '../src/utils/helpers'
import "@testing-library/jest-dom";

test('get random index', () => {
    const randomIndex = getRandomIndex(0, 5)
    expect(randomIndex).toBeGreaterThanOrEqual(0)
    expect(randomIndex).toBeLessThanOrEqual(5)
})

test('get random type film or tv', () => {
    const randomType = ['tv', 'movie']
    expect(randomType).toContain(getRandomType())
})