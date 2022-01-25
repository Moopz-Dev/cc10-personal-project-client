import React, { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/nav/Header";
import { ErrorContext } from "./contexts/ErrorContext";
import { ToastContext } from "./contexts/ToastContext";
import { LoadingContext } from "./contexts/LoadingContext";
import Spinner from "./utils/Spinner";
import UserRoute from "./routes/UserRoute";

function App() {
	const { error, setError } = useContext(ErrorContext);
	const { message, setMessage } = useContext(ToastContext);
	const { loading } = useContext(LoadingContext);

	useEffect(() => {
		if (error && error !== "") {
			toast.error(error);
			return setError("");
		}
	}, [error]);
	useEffect(() => {
		if (message && message !== "") {
			toast.success(message);
			return setMessage("");
		}
	}, [message]);
	return (
		<>
			{loading && <Spinner />}
			<Header />
			<ToastContainer />
			<UserRoute />
		</>
	);
}

export default App;
