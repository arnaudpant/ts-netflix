import { useQuery } from "react-query";
import { clientAPI } from "../api/apiMovieDB";


export const useSearchMovies = (query: string) => {
    const { data } = useQuery(`search/multi?query=${query}`, () => clientAPI(`search/multi?query=${query}`))
    if (data) {
        return data.data.results
    } else {
        return  []
    }
};

