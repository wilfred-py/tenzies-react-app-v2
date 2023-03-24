import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

const die_one = <FontAwesomeIcon icon={faDiceOne} />;
const die_two = <FontAwesomeIcon icon={faDiceTwo} />;
const die_three = <FontAwesomeIcon icon={faDiceThree} />;
const die_four = <FontAwesomeIcon icon={faDiceFour} />;
const die_five = <FontAwesomeIcon icon={faDiceFive} />;
const die_six = <FontAwesomeIcon icon={faDiceSix} />;

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    };
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            {/* If dieDisplay = true, display die_one through die_six */}
            {/* If dieDisplay = false, display numerical value of die */}
            {props.dieDisplay ? (
                <h2 className="die-num">
                    {props.value === 1 && die_one}
                    {props.value === 2 && die_two}
                    {props.value === 3 && die_three}
                    {props.value === 4 && die_four}
                    {props.value === 5 && die_five}
                    {props.value === 6 && die_six}
                </h2>
            ) : (
                <h2 className="die-num">{props.value}</h2>
            )}
        </div>
    );
}
