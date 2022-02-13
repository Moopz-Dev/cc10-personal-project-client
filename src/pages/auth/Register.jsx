import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";

import { ErrorContext } from "../../contexts/ErrorContext";
import { ToastContext } from "../../contexts/ToastContext";
import { LoadingContext } from "../../contexts/LoadingContext";

function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { setError } = useContext(ErrorContext);
	const { setMessage } = useContext(ToastContext);
	const { setLoading } = useContext(LoadingContext);
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		setError("");

		if (!validator.isAlphanumeric(username, "en-US", { ignore: "_-" })) {
			console.log("Username must be alphanumeric");
			return setError(
				"Username must be alphanumeric; underscore allowed; whitespace not allowed"
			);
		}
		if (!validator.isEmail(email)) {
			console.log("Wrong email format");
			return setError("Wrong email format");
		}
		if (!validator.isMobilePhone(phoneNumber, "th-TH")) {
			console.log("Invalid phone number");
			return setError("Invalid phone number");
		}
		if (validator.isEmpty(password) || password.includes(" ")) {
			console.log("Password can't be empty, whitespace not allowed");
			return setError("Password can't be empty, whitespace not allowed");
		}
		if (password.length < 6) {
			console.log("Password is too short");
			return setError("Password is too short");
		}
		if (!validator.equals(password, confirmPassword)) {
			console.log("Passwords did not match");
			return setError("Passwords did not match");
		}

		try {
			setLoading(true);
			await axios.post("/register", {
				username,
				email,
				phoneNumber,
				password,
			});
			setMessage("Registration Successful, Please Login");
			setLoading(false);
			navigate("/");
		} catch (error) {
			setError(error.response.data.message);
			setLoading(false);
		}
	};
	return (
		<div className="container mt-5 p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Register</h4>
					<form onSubmit={handleSubmit} className="p-2 d-grid gap-2">
						<div className="mb-4">
							Please provide the required information for registration.
						</div>
						<div className="mb-1">
							<input
								type="text"
								className="form-control"
								placeholder="Username"
								autoFocus
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</div>
						<div className="mb-1">
							<input
								type="email"
								className="form-control"
								placeholder="Email address"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-1">
							<input
								type="text"
								className="form-control"
								placeholder="Mobile Phone Number"
								value={phoneNumber}
								onChange={e => setPhoneNumber(e.target.value)}
							/>
						</div>
						<div className="mb-1">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className="mb-1">
							<input
								type="password"
								className="form-control"
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
