import { createContext, useState } from "react";

const LoadingContext = createContext();

function LoadingContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
}

export default LoadingContextProvider;

export { LoadingContext };
