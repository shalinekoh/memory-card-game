import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

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

  const shufflePokemon = () => {
    const shuffleArray = arr => {
      const newArr = arr.slice();
      for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    }
    setPokemon(shuffleArray(pokemon));
  }


  return (
    <>
      {pokemon.map((poke, index) => (
        <div key={index} className="pokemon-item">
          <img src={poke.imageUrl} alt={poke.name} onClick={shufflePokemon}/>
          <p>{poke.name}</p>
        </div>
      ))}
    </>
  );
}

export default App


// character?limit=100
