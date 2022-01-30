import React from "react";
import { useState, useContext } from "react";
import {
	BsHouse,
	BsShop,
	BsPerson,
	BsPersonPlus,
	BsGear,
	BsDoorClosed,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Search from "../forms/Search";

function Header() {
	const [current, setCurrent] = useState("home");
	const { user, logout } = useContext(AuthContext);

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand fw-bolder fst-italic " to="/">
						WEREWOLF GADGETS
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
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
							<li className="nav-item ms-2">
								<Link
									className={
										"nav-link " + (current === "home" ? "active" : null)
									}
									aria-current="page"
									to="/shop"
									onClick={e => setCurrent("home")}>
									<BsShop className="me-1" /> Shop
								</Link>
							</li>
						</ul>
						<span className="navbar-nav me-2 mb-2 mb-lg-0">
							<Search />
						</span>

						{user ? (
							<ul className={"navbar-nav ms-2 me-5 mb-2 mb-lg-0 "}>
								<li className="nav-item dropdown ms-2">
									<Link
										className={"nav-link dropdown-toggle "}
										to="/"
										id="navbarDropdownMenuLink"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false">
										<BsGear className=" me-1" />{" "}
										{user ? user.username : "username"}
									</Link>
									<ul
										className="dropdown-menu dropdown-menu-end"
										aria-labelledby="navbarDropdownMenuLink ">
										<li>
											{user && user.role === "user" && (
												<Link className="dropdown-item" to="/user/history">
													Dashboard
												</Link>
											)}
											{user && user.role === "admin" && (
												<Link className="dropdown-item" to="/admin/dashboard">
													Dashboard
												</Link>
											)}
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
							</ul>
						) : (
							<ul
								className={
									"navbar-nav ms-auto me-5 mb-2 mb-lg-0 " +
									(!user ? "" : "d-none")
								}>
								<li className="nav-item ms-2">
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
						)}
					</div>
				</div>
			</nav>
		</>
	);
}

export default Header;
