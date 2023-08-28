import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSignup(event) {
        event.preventDefault();
        if (email == "" && password == "") {
            alert("Please enter your email and password");
        } else {
            const url = process.env.BACKEND_URL + "/api/signup";
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
                        alert("Signup failed");
                    } else {
                        alert("Signup successful");
                        navigate("/login");
                    }
                }
                );
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <h1>Signup</h1>
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
                        onClick={handleSignup}
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
};
