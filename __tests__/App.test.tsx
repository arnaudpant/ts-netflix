import { expect, test } from 'vitest'
import "@testing-library/jest-dom";
import {render, screen, waitForElementToBeRemoved} from './test-utils'
import App  from '../src/App'
import React from 'react';

test('Affichage du Loader', async () => {
    render(<App />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await waitForElementToBeRemoved(()=> screen.getByRole('alert'))
    expect(screen.queryByRole('alert')).toBeNull()

    screen.debug();
})

test('affichage titre accueil', async () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Les plus gros succès français et internationaux. Le tout dès 5,99€/i })).toBeInTheDocument()
})