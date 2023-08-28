import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
    const {store, actions} = useContext(Context);
    if (!store.token) {
        return <Navigate to={"/login"}/>;
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <h1>Private</h1>
                        <p>This token gave you access</p>
                        <p>Token: {store.token}</p>
                    </div>
                </div>
            </div>
        );
    }
};