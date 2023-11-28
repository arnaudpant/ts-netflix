import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "../theme/theme";
import { HistoryMovieProvider } from "./HistoryMovieContext";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // useErrorBoundary: false,
            refetchOnWindowFocus: false,
            retryDelay: 500,
        },
        mutations: {
            retryDelay: 500,
            retry: 1,
            useErrorBoundary: false
        }
    }
})

const AppProvider = ({ children }: any) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <HistoryMovieProvider>
                    {children}
                </HistoryMovieProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default AppProvider;