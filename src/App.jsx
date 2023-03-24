import React, { Component } from "react";
import Die from "./components/Die";
import Navbar from "./components/Navbar";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    // States
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [gameStartTime, setGameStartTime] = React.useState(0);
    const [timeDifference, setTimeDifference] = React.useState(null);
    const [firstDieHeld, setFirstDieHeld] = React.useState(false);
    const [isRollDiceCalled, setIsRollDiceCalled] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        checkFirstDieHeld();

        if (allHeld && allSameValue) {
            const gameEndTime = new Date().getTime(); // Save current time when all dice are held and are the same value
            const difference = (gameEndTime - gameStartTime) / 1000; // Calculate how long it took to win game
            setTimeDifference(difference);
            saveHighScore(difference);
            setTenzies(true);
        }
    }, [dice]);

    React.useEffect(() => {
        saveHighScore();
    }, [tenzies]);

    // Set Die Face Display (dots or numerical)
    const [dieDisplay, setDieDisplay] = React.useState(true);

    // Create counterState
    const [counter, setCounter] = React.useState(0);

    // Toggler Function for dieDisplay
    function toggleDisplay() {
        setDieDisplay((prevDisplay) => !dieDisplay);
    }

    // Generate random new number for a die
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    // Create new array containing dice with random numbers
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }

        return newDice;
    }

    // Filter dice state array for all die objects with "isHeld: true"
    // If heldDice.length is equal to 1 OR rollDice() is called, setFirstDieHeld to true AND save current time as start of the game
    // else setFirstDieHeld to false

    function checkFirstDieHeld() {
        const heldDice = dice.filter((die) => die.isHeld === true);
        if (heldDice.length === 1 || isRollDiceCalled) {
            setFirstDieHeld(true);
            const gameStartTime = new Date().getTime();
            setGameStartTime(gameStartTime);
            console.log(gameStartTime);
        } else {
            return;
        }
        console.log(heldDice.length);
        console.log(isRollDiceCalled);
    }

    // Generate new die number if property .isHeld === false
    function rollDice() {
        setIsRollDiceCalled(true);
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld ? die : generateNewDie();
                })
            );
            setCounter((count) => count + 1);
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setCounter(0);
        }
    }

    // Keep number in state if isHeld === true
    function holdDice(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    // Save best time to localStorage
    function saveHighScore() {
        console.log(timeDifference);
        localStorage.setItem("highscore", timeDifference);
    }

    // Retrieve and update highScore based on localStorage
    const currentHighScore = localStorage.getItem("highscore");

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
            dieDisplay={dieDisplay}
        />
    ));

    return (
        <main>
            <div className="container">
                <Navbar dieDisplay={dieDisplay} toggleDisplay={toggleDisplay} />
                {tenzies && <Confetti />}
                <div className="game-container">
                    <h1 className="title">Tenzies</h1>
                    {tenzies ? (
                        ""
                    ) : (
                        <p className="instructions">
                            Roll until all dice are the same. Click each die to
                            freeze it at its current value between rolls.
                        </p>
                    )}
                    <div className="dice-container">{diceElements}</div>
                    {tenzies ? (
                        <h2 className="win-message">
                            You won and beat the game in {timeDifference}{" "}
                            seconds!
                        </h2>
                    ) : (
                        ""
                    )}
                    <div className="game-stats">
                        <p>Number of Rolls: {counter}</p>
                        <p>Best Time: {currentHighScore} </p>
                    </div>
                    <button className="roll-dice-button" onClick={rollDice}>
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                </div>
            </div>
        </main>
    );
}
