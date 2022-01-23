import React from "react";
import { useState, useContext } from "react";
import {
	BsHouse,
	BsPerson,
	BsPersonPlus,
	BsGear,
	BsDoorClosed,
} from "react-icons/bs";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

function Header() {
	const [current, setCurrent] = useState("home");
	const { logout } = useContext(AuthContext);
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Werewolf Gadgets
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav d-flex align-center">
							<li className="nav-item ms-2">
								<Link
									className={
										"nav-link " + (current === "home" ? "active" : null)
									}
									aria-current="page"
									to="/"
									onClick={e => setCurrent("home")}>
									<BsHouse className="me-1" /> Home
								</Link>
							</li>
							<li className="nav-item dropdown ms-2">
								<Link
									className={"nav-link dropdown-toggle "}
									to="/"
									id="navbarDropdownMenuLink"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									<BsGear className=" me-1" /> Username
								</Link>
								<ul
									className="dropdown-menu"
									aria-labelledby="navbarDropdownMenuLink">
									<li>
										<Link className="dropdown-item" to="/">
											Action
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="/">
											Another action
										</Link>
									</li>
									<li>
										<Link
											className="dropdown-item"
											to="/"
											role="button"
											onClick={e => {
												e.preventDefault();
												logout();
											}}>
											<BsDoorClosed className=" me-1" /> Logout
										</Link>
									</li>
								</ul>
							</li>
							<li className="nav-item ms-2 float-right">
								<Link
									className={
										"nav-link " + (current === "login" ? "active" : null)
									}
									to="/login"
									onClick={e => setCurrent("login")}>
									<BsPerson className="me-1" /> Login
								</Link>
							</li>
							<li className="nav-item ms-2">
								<Link
									className={
										"nav-link " + (current === "register" ? "active" : null)
									}
									to="/register"
									onClick={e => setCurrent("register")}>
									<BsPersonPlus className="me-1" /> Register
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Header;
