import { createContext, useState } from "react";

const SearchContext = createContext();
const initialState = {
	text: "",
	categoryId: [],
	brand: [],
	min: 0,
	max: 99999,
};

function SearchContextProvider({ children }) {
	const [search, setSearch] = useState(initialState);
	return (
		<SearchContext.Provider value={{ search, setSearch, initialState }}>
			{children}
		</SearchContext.Provider>
	);
}

export default SearchContextProvider;

export { SearchContext };
