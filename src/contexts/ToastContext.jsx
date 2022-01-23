import { createContext, useState } from "react";

const ToastContext = createContext();

function ToastContextProvider({ children }) {
	const [message, setMessage] = useState("");
	return (
		<ToastContext.Provider value={{ message, setMessage }}>
			{children}
		</ToastContext.Provider>
	);
}

export default ToastContextProvider;

export { ToastContext };
