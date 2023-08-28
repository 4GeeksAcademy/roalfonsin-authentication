import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";


export const Navbar = () => {

	const { store, actions } = useContext(Context);

	function logout(){
		actions.setToken(null);
		alert("You have been logged out");
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
		<div className="container-fluid">
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link active" aria-current="page" to="/">Home</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/signup">Signup</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/private">Private</Link>
				</li>
				<li className="nav-item">
					<button className="btn btn-primary" onClick={logout}>Logout</button>
				</li>
			</ul>
			</div>
		</div>
		</nav>
	);
};
