import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import usePokemonList from "./usePokemonList";

//IS custom hook hmne simple si ciz likhe h iise ik id milegi or usi bade os is ID ki bases pr ek pokemon layega
function usePokemonDetails(id){

    const [pokemon, setPokemon] = useState({});
    let pokemonListHookResponse = [];

    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);//Pokemon kI Saari detail le aao
        const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`)//USSi ke base pr hm uske jaise similar pokemon le aayenge
        //detail aane ke baad Pokemon ki state actually set kr dena ->
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons:pokemonOfSameTypes.data.pokemon.slice(0,5)
        });
        console.log(response.data.types)
        setPokemonListState({...pokemonListState, type: response.data.types ? response.data.types[0].type.name : ''})
    }
    const [pokemonListState, setPokemonListState] = usePokemonList()
    

    useEffect(() => {
        downloadPokemon()
        console.log("list",pokemon.types,pokemonListState);
    }, [])

    return [pokemon]
}
export default usePokemonDetails;