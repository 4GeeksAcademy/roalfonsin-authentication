import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    function handleLogin(event) {
        event.preventDefault();
        if (email == "" && password == "") {
            alert("Please enter your email and password");
        } else {
            const url = process.env.BACKEND_URL + "/api/login";
            const body = { email: email, password: password };
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            };
            fetch(url, options)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        alert("Login failed");
                    } else {
                        alert("Login successful");
                        actions.setToken(data.access_token);
                        navigate("/private");
                    }
                }
                );
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <h1>Login</h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};