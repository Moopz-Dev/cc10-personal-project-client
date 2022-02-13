import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import validator from "validator";
import { BsEnvelope } from "react-icons/bs";

import { ErrorContext } from "../../contexts/ErrorContext";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
	const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const { setError } = useContext(ErrorContext);
	const { login } = useContext(AuthContext);
	// const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		setError("");

		if (
			!validator.isEmail(emailOrPhoneNumber) &&
			!validator.isMobilePhone(emailOrPhoneNumber, "th-TH")
		) {
			console.log("Wrong email or phone number format");
			return setError("Wrong email or phone number format");
		}
		if (validator.isEmpty(password) || password.includes(" ")) {
			console.log("Password can't be empty, whitespace not allowed");
			return setError("Password can't be empty, whitespace not allowed");
		}
		login(emailOrPhoneNumber, password);
	};
	return (
		<div className="container  mt-5 p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Login</h4>
					<form onSubmit={handleSubmit} className="p-2 d-grid gap-2">
						<div className="mb-4">Please input your information.</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Email/Phone Number"
								value={emailOrPhoneNumber}
								onChange={e => setEmailOrPhoneNumber(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							disabled={
								!emailOrPhoneNumber || password.length < 6 ? true : false
							}
							className="btn btn-primary">
							<BsEnvelope className="me-4" /> Login with Email and Password
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
