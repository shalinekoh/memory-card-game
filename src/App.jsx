import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)


  useEffect(() => {
    const fetchImage = async() => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();

        // Fetch details for each Pokémon using their URLs
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokeResponse = await fetch(pokemon.url);
            const pokeData = await pokeResponse.json();
            return {
              name: pokeData.name,
              imageUrl: pokeData.sprites.front_default,
              id: crypto.randomUUID(),
              clicked: false,
            };
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchImage();
  }, []);

  const gameOver = () => {
    console.log("GAME OVER")
    checkHighScore();
    setScore(0);
    setPokemon((currentPoke) =>
      currentPoke.map((poke) => poke.clicked = false))
  }

  const checkHighScore = () => {
    if (score > highScore) {
      setHighScore(score)
      setScore(0)
    }
  }

  const shufflePokemon = (id) => {
    const checkClick = (arr, id) => {
      const clickedPoke = arr.find((poke) => poke.id === id)
      if (clickedPoke.clicked === true){
        gameOver();
      }
      else {
        setPokemon((currentPoke) =>
          currentPoke.map((poke) => poke.id === id ? poke.clicked = true : poke
        ))
        setScore(score + 1)
      }
    }

    const shuffleArray = arr => {
      const newArr = arr.slice();
      for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    }
    checkClick(pokemon, id)
    setPokemon(shuffleArray(pokemon));
  }

  return (
    <>
      <header>
        <h1>Amphibia Memory Game</h1>
        <p>Get points by clicking on an image but don't click on any image more than once!</p>
      </header>

      <div className="score-board">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>

      <div className="game-board">
        {pokemon.map((poke) => (
          <div key={poke.id} className="pokemon-item" onClick={e => shufflePokemon(poke.id)}>
            <img src={poke.imageUrl} alt={poke.name}/>
            <p>{poke.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App
