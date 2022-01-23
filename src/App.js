import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import { ErrorContext } from "./contexts/ErrorContext";
import { ToastContext } from "./contexts/ToastContext";
import { LoadingContext } from "./contexts/LoadingContext";
import Spinner from "./utils/Spinner";

function App() {
	const { error } = useContext(ErrorContext);
	const { message } = useContext(ToastContext);
	const { loading } = useContext(LoadingContext);
	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (message) {
			toast.success(message);
		}
	}, [error, message]);
	return (
		<>
			{loading && <Spinner />}
			<Header />
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</>
	);
}

export default App;
