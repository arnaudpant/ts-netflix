import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";
import { render, screen, waitForElementToBeRemoved } from './test-utils'
import App from '../src/App'
import React from 'react';

test('Affichage du Loader', async () => {
    render(<App />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.getByRole('alert'))
    expect(screen.queryByRole('alert')).toBeNull()

    screen.debug();
})

test('affichage titre accueil', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Les plus gros succès français et internationaux. Le tout dès 5,99€/i })).toBeInTheDocument()

})

test('affichage message error si click sans entrer de email', async () => {
    render(<App />)
    expect(screen.queryByText(/Veuillez entrer un email/i)).toHaveClass('hidden')
    await userEvent.click(screen.getByRole('button', { name: /Commencer/i }))
    expect(screen.queryByText(/Veuillez entrer un email/i)).toHaveClass('block')
})

test('affichage ecran de connexion si click sur identifier', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /S'identifier/i }))
    expect(screen.queryByText(/Première visite sur Netflix ?/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Inscrivez-vous/i }))
    expect(screen.queryByText(/Abonnez-vous aujourd'hui. Annulez à tout moment./i)).toBeInTheDocument()
})
