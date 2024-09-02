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



  return (
    <>
      {pokemon.map((poke, index) => (
        <div key={index} className="pokemon-item">
          <img src={poke.imageUrl} alt={poke.name} />
          <p>{poke.name}</p>
        </div>
      ))}
    </>
  );
}

export default App


// character?limit=100
