import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";//hme Id mil gyi h
import './PokemonDetail.css';
import usePokemonList from "../../hooks/usePokemonList";
import usePokemonDetails from "../../hooks/usePokemonDetails";

//Same state which is in usePokemonDetail use ke rhe the
function PokemonDetails() {
    const { id } = useParams();
    const [pokemon] = usePokemonDetails(id);

    return (
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image} alt="" />
            <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
            <div className="pokemon-details-name">Height : {pokemon.height}</div>
            <div className="pokemon-details-name">Weight : {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}

            </div>

            {
                pokemon.types && pokemon.similarPokemons &&
                <div>
                    more {pokemon.types[0]} type pokemons

                    <ul>
                            {pokemon.similarPokemons.map((p) => (
                                <li key={p.pokemon.id}>{p.pokemon.name}</li>
                            ))}
                     </ul>

                </div>
            }
        </div>
    );

}

export default PokemonDetails;