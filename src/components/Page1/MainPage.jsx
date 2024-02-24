import React, { useEffect, useState } from 'react';
import '/Users/niyazrizvanov/pock/src/App.css';
import FormHeaderTitleAndSearchPokemon from '../FormHeaderTitleAndSearchPokemon';
import PokemonListCards from '../PokemonListCards'
const MainPage = () => {
    const [cards, setCards] = useState([])

    const [searchPokemons,setSearchPokemons] = useState([])

  const searchPokemonAction = (text) => {
   var newSearchPokemons =  cards.filter(card => card.name.toLowerCase().includes(text.toLowerCase()))
   setSearchPokemons(newSearchPokemons)
  }
  useEffect(() => {
    async function getPoks() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();
        console.log("aaaa")
        setCards(data.results);
        setSearchPokemons(data.results)
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }
    getPoks();
  }, []);

  const [pokTypes, setPokTypes] = useState([]);

  useEffect(() => {
    async function fetchPokemonTypes() {
      const types = await Promise.all(
        cards.map(async (card) => {
          const response = await fetch(card.url);
          const data = await response.json();
          return data.types.map(type => type.type.name);
        })
      );
      setPokTypes(types);
    }
    fetchPokemonTypes();
  }, [cards]);

    return (
        <div className='wrapper_main_page'>
            <header>
                <FormHeaderTitleAndSearchPokemon action={searchPokemonAction}/>
            </header>
            <main>
                <PokemonListCards cards={searchPokemons} types={pokTypes}/>
            </main> 
        </div>
    );
};

export default MainPage;