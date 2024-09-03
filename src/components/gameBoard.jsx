import React, { useEffect, useState } from 'react'
import BoardItem from './boardItem'
import '../styles/gameBoard.css'

function GameBoard({ score, setScore, highScore, setHighScore }){
    const [pokemon, setPokemon] = useState([]);

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
        <BoardItem
            pokemon={pokemon}
            setPokemon={setPokemon}
            score={score}
            setScore={setScore}
            highScore={highScore}
            setHighScore={setHighScore}
        />
    )
}

export default GameBoard;
