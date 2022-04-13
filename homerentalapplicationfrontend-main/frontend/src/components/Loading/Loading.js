import React from "react";
import "./Loading.css";

function Loading() {
    return (
        <div className="wrapper" style={{ marginTop: "60px" }}>
            <h3>Loading... Please wait</h3>
            <div className="loader">
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__ball" />
            </div>
        </div>
    );
}

export default Loading;
