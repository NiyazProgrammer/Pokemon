import React from 'react';
import PokemonCard from './PokemonCard';
import '/Users/niyazrizvanov/pock/src/App.css'

const PokemonListCards = ({cards, types}) => {
    return (
        <div className='pokemon_list'>
            {cards.map((card, index) => 
                <PokemonCard index={index} card={card} types={types}/>
            )}
        </div>
    );
};

export default PokemonListCards;