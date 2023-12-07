import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { HistoryMovieProvider } from "../src/context/HistoryMovieContext";
import { render as renderreactTestingLib } from '@testing-library/react'
import React from "react";


const queryClient = new QueryClient()
const theme = createTheme()

function render(ui, { ...options } = {}) {
    const wrapper = ({ children }) => {
        return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <HistoryMovieProvider>
                        {children}
                    </HistoryMovieProvider>
                </ThemeProvider>
            </QueryClientProvider>
        )
    }
    return renderreactTestingLib(ui, { wrapper, ...options })
}

export * from '@testing-library/react'
export { render }