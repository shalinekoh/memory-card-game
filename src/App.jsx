import React, { useEffect, useState } from 'react'
import Header from './components/header'
import ScoreBoard from './components/scoreBoard';
import GameBoard from './components/gameBoard';
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

  return (
    <>
      <Header/>

      <ScoreBoard score={score} highScore={highScore} />

      <GameBoard
        pokemon={pokemon}
        setPokemon={setPokemon}
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />

    </>
  );
}

export default App
