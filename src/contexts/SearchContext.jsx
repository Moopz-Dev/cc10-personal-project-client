import { createContext, useState } from "react";

const SearchContext = createContext();
const initialState = {
	text: "",
};

function SearchContextProvider({ children }) {
	const [search, setSearch] = useState(initialState);
	return (
		<SearchContext.Provider value={{ search, setSearch }}>
			{children}
		</SearchContext.Provider>
	);
}

export default SearchContextProvider;

export { SearchContext };
