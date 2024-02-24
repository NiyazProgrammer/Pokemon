import React, { useEffect, useState } from 'react';
import './styles/Pokemon_page.css'
import ButtonAbilities from './ButtonAbilities';
import HeaderContentPage2 from './HeaderContentPage2';


const CharacterPokemonPage = (props) => {
    const [data, setData] = useState([])
    const [pokemonType, setpokemonType] = useState([])
    async function getInfo(){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
        const data = await response.json()
        setData(data)
        // console.log(data.moves[0].move.name)
        console.log(data)
        const types = data.types.map(type => type.type.name);
        setpokemonType(types)
    }
    useEffect(() =>{
        getInfo()
    }, [])
    const getStatisticInfo = (type) => {
        const hpStat = data?.stats?.find(object => object?.stat?.name === type);
        
        if (hpStat) {
            return hpStat?.base_stat;
        }
        
        return ""; 
    }
    return (
        <div>
            <HeaderContentPage2/>
            <div className='content_block'>
                <div className='characters_pokemon'>
                    <div className='header_pokemon_character'>
                        <div className='container_id_name'>
                            <p style={{color: 'gray', fontSize: 18}}>#00{data?.id}</p>
                            <br></br>
                            <h1 className='name_pokemon' style={{color: 'darkblue',}}>{data?.name}</h1>
                        </div>
                        <div className='button_abilities_container'>
                            {pokemonType.map( type =>
                                <ButtonAbilities type={type} className="abilities_button">{type}</ButtonAbilities>
                            )}
                        </div>
                    </div>
                    <div className='body_character_container'>
                        <div className='statistic_container'>
                            <div className='hp_container'>
                                <p>HP</p>
                                <div className='hp_level'>
                                    <div style={{width: getStatisticInfo('hp') +'%'}} className='attached_level_block'></div>
                                </div>
                            </div>  
                            <div className='attack_container'>
                                <p>Attack</p>
                                <div className='attack_level'>
                                    <div style={{width: getStatisticInfo('attack') +'%'}} className='attached_attack_block'></div>
                                </div>
                            </div>  
                            <div className='defense_container'>
                                <p>Defense</p>
                                <div className='defense_level'>
                                    <div style={{width: getStatisticInfo('defense') +'%'}} className='attached_defense_block'></div>
                                </div>
                            </div>  
                            <div className='speed_container'>
                                <p>Speed</p>
                                <div className='speed_level'>
                                    <div style={{width: getStatisticInfo('speed') +'%'}} className='attached_speed_block'></div>
                                </div>
                            </div>    
                        </div>
                        <div className='image_pokemon'>
                            <img src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${data?.id}.svg`} alt={data?.name}></img>
                        </div>
                    </div>
                </div>    
                <div className='breeding_container'>
                    <p style={{fontSize: '32px', marginLeft: '25px'}}>Breeding</p>
                    <div className='container_height_weight'>
                        <div className='container_height'>
                            <p>Height</p>
                            <div className='container_statistic_height'>
                                <p>0.{data?.height}m</p>
                            </div>
                        </div>
                        <div className='container_weight'>
                            <p>Weight</p>
                            <div className='container_statistic_weight'>
                                <p>{data?.weight}kg</p>
                            </div>
                        </div>
                    </div>
                </div>  
                    <div className='moves_container'>
                        <p>Moves</p>
                        <div className='cards_container'>
                            {data?.moves?.map(move => 
                                <div  className='moves_card'>
                                <p>{move.move.name}</p>
                            </div>)}
                        </div>
                    </div> 
                </div>


            {/* <h3>ID: {data?.id}</h3>
            <h3>Name: {data?.name}</h3>
            <h4>Height: {data?.height}</h4>
            <h4>Weight: {data?.weight}</h4> */}
        </div>
    );
};

export default CharacterPokemonPage;