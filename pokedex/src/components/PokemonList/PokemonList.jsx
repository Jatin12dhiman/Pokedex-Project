import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';


function PokemonList() {

  /**  const[pokemonList,setPokemonList]=useState([]);
   const [isLoading, setIsLoading]=useState(true);

   const [pokedexUrl , setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

   const [nextUrl,setNextUrl] = useState('');
   const [prevUrl,setPrevUrl] = useState('');
   */

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: '',
    prevUrl: ''
  })

  async function downloadPokemons() {
    //SetIsLoading(true)
    setPokemonListState((state) =>({ ...state, isLoading: true }));//Jo abhi tk state me pda h use unpack krenge or fir isloading ko over write kerunga 
    const response = await axios.get(pokemonListState.pokedexUrl)  //This downloads  the List of 20 pokemons

    const pokemonResults = response.data.results;//we get the array of Pokemons from result
    //Is array m unka nam h or uki detail nikalne ke liya unka url h

    console.log(response.data)
    setPokemonListState((state) =>( {
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous
    }));


    //Iterating over the array of Pokemnos and uding their url, to create an array of promises that will download those 20 pokemons
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


  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl])//Khali array ka mtlb -> ab ye kisi pr bhi dependent nhi h(UseEffect kisi pr bhi dependent nhi h), kisi state varaible ke change ko ye detect nhi kr rha 


  return <div className="pokemon-list-wrapper">
    <div className="pokemon-wrapper">
      {(pokemonListState.isLoading ? 'Loading....  ' : pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />))
      }
    </div>
    <div className="controls">
      <button disabled={pokemonListState.prevUrl == null} onClick={() => {
          const UrlToSet = pokemonListState.prevUrl;
         setPokemonListState({ ...pokemonListState, pokedexUrl:UrlToSet })
         }}> Prev </button>

      <button disabled={pokemonListState.nextUrl == null} onClick={() => {
          const UrlToSet = pokemonListState.nextUrl;
      setPokemonListState({ ...pokemonListState, pokedexUrl: UrlToSet })
      }}>Next</button>
    </div>
  </div>
}

export default PokemonList;