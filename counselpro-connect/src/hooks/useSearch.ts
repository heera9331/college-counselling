import { useContext } from "react";
import SearchContext from "@/contexts/search-context";

const useSearchContext = () => {
    return useContext(SearchContext);
}

export default useSearchContext;
