import React, { useState } from 'react'
import '../styles/gameBoard.css'

function BoardItem( {pokemon, setPokemon, score, setScore, highScore, setHighScore} ) {

    const checkHighScore = () => {
        if (score > highScore) {
            setHighScore(score);
            setScore(0);
        }
    }

    const gameOver = () => {
        checkHighScore();
        setScore(0);
        setPokemon((currentPoke) =>
            currentPoke.map((poke) => ({ ...poke, clicked: false }))
            );
    };

    const checkClick = (arr, id) => {
        const clickedPoke = arr.find((poke) => poke.id === id)
        if (clickedPoke.clicked === true){
        gameOver();
        }
        else {
        setPokemon((currentPoke) =>
            currentPoke.map((poke) => poke.id === id ? { ...poke, clicked: true} : poke
        ))
        setScore(score + 1);
        }
    }

    const shufflePokemon = arr => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    const handleClick = (id) => {
        checkClick(currentPoke, id);
        // we must use an updater since we are updating the state multiple times
        // react batches the state updates, here it only gets re-render once
        // when a callback is passed to setState, it ensures that the latest state is passed in
        setPokemon((currentPoke) => {
            const updatedPokemon = shufflePokemon(currentPoke);
            return updatedPokemon;
        });
    };


    return (
        <div className="game-board">
            {pokemon.map((poke) => (
            <div
                key={poke.id}
                className='pokemon-item'
                onClick={e => handleClick(poke.id)}
            >
                <img src={poke.imageUrl} alt={poke.name}/>
                <p>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</p>
            </div>
            ))}
        </div>
    )
}

export default BoardItem;
