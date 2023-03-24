import React from "react";

export default function Navbar(props) {
    return (
        <nav className={props.dieDisplay ? "die-display" : "num-display"}>
            <p className="toggler--dice">Dice</p>
            <div className="toggler--slider" onClick={props.toggleDisplay}>
                <div className="toggler--slider--circle"></div>
            </div>
            <p className="toggler--numbers">Numbers</p>
        </nav>
    );
}
