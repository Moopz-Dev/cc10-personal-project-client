import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

import { setToken, clearToken, getToken } from "../services/localStorage";
import { ToastContext } from "./ToastContext";
import { ErrorContext } from "./ErrorContext";
import { LoadingContext } from "./LoadingContext";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	const { setMessage } = useContext(ToastContext);
	const { setError } = useContext(ErrorContext);
	const { setLoading } = useContext(LoadingContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (getToken()) {
			axios
				.get("/user/me")
				.then(res => setUser(res.data.user))
				.catch(err => {
					console.log(err);
					clearToken();
				});
		}
	}, []);

	const roleBasedRedirect = res => {
		if (res.data.user.role === "admin") {
			navigate("admin/dashboard");
		} else {
			navigate("user/history");
		}
	};

	const login = async (emailOrPhoneNumber, password) => {
		try {
			setLoading(true);
			const res = await axios.post("/login", {
				emailOrPhoneNumber,
				password,
			});
			setMessage("Login successful");
			setToken(res.data.token);
			setUser(res.data.user);

			setLoading(false);
			roleBasedRedirect(res);
			// window.location.reload();
		} catch (error) {
			console.log(error);
			setError("invalid email, phone number or password");
			setLoading(false);
		}
	};

	const logout = () => {
		clearToken();

		setUser(null);
		setMessage("You are logged out");
		navigate("/login");
	};

	const updateUser = value => {
		setUser(prev => ({ ...prev, ...value }));
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;

export { AuthContext };
