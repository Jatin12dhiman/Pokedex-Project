import { useEffect, useState } from "react";
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

import './PokemonList.css';

function PokemonList(){

    const[pokemonList,setPokemonList]=useState([]);
    const [isLoading, setIsLoading]=useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL)  //This downloads  the List of 20 pokemons

        const pokemonResults = response.data.results;//we get the array of Pokemons from result
        //Is array m unka nam h or uki detail nikalne ke liya unka url h


        //Iterating over the array of Pokemnos and uding their url, to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url))

        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);// array of 20 pokemon detailed data
        console.log(pokemonData);

        // now iterate on the data of each pokemon and extract id , name, image and types
        const pokeListResult = (pokemonData.map((pokeData)=>{
                const pokemon =     pokeData.data;
                return {
                    id:pokemon.id,
                    name:pokemon.name , 
                    image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :pokemon.sprites.front_shiny,
                     types:pokemon.types}
        }));
        console.log(pokeListResult)
        setPokemonList(pokeListResultx);
        setIsLoading(false); 
    }

   
    useEffect(() => {
        downloadPokemons();
    },[])//Khali array ka mtlb -> ab ye kisi pr bhi dependent nhi h(UseEffect kisi pr bhi dependent nhi h), kisi state varaible ke change ko ye detect nhi kr rha 

  
    return <div className="pokemon-list-wrapper">
      <div> Pokemon List</div>
       {(isLoading ? 'Loading....  ': pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} />))}
    </div>
}

export default PokemonList;