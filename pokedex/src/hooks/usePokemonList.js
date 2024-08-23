import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
      })

      async function downloadPokemons() {
        //SetIsLoading(true)
        
            //Iterating over the array of Pokemnos and uding their url, to create an array of promises that will download those 20 pokemons
       
            setPokemonListState((state) =>({ ...state, isLoading: true }));//Jo abhi tk state me pda h use unpack krenge or fir isloading ko over write kerunga 
            const response = await axios.get(pokemonListState.pokedexUrl)  //This downloads  the List of 20 pokemons
        
            const pokemonResults = response.data.results;//we get the array of Pokemons from result
            //Is array m unka nam h or uki detail nikalne ke liya unka url h
        
            console.log("response ise",response.data.pokemon)
            console.log(pokemonListState)
            setPokemonListState((state) =>( {
              ...state,
              nextUrl: response.data.next,
              prevUrl: response.data.previous
            }));
        
            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        

            //passing that promise array to axios.all
            const pokemonData = await axios.all(pokemonResultPromise);// array of 20 pokemon detailed data
            console.log(pokemonData);
        
            // now iterate on the data of each pokemon and extract id , name, image and types
            const pokeListResult = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
            }));
            setPokemonListState((state)=>({
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
            }));
        
            //setIsLoading(false); 
 }

      useEffect(() =>{
        downloadPokemons(); 
      },[pokemonListState.pokedexUrl])

      return [pokemonListState, setPokemonListState];
}

export default usePokemonList;