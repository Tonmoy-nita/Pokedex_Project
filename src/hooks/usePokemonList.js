import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
        nextUrl: "",
        prevUrl: "",
        type : '',
      });

    async function downloadPokemons() {

      // setIsLoading(true);
      // setPokemonListState({ ...pokemonListState, isLoading: true });
      setPokemonListState((state) => ({
        ...state,
        isLoading: true,
      }));
      // const response = await axios.get(pokedexUrl); //this download list of 20 pokemons
      const response = await axios.get(pokemonListState.pokedexUrl); //this download list of 20 pokemons
      const pokemonResults = response.data.results; // this get the array of pokemons from result(include name and url of details)
      // console.log(response.data.pokemon);
      // setNextUrl(response.data.next);
      // setPokemonListState({
      //   ...pokemonListState,
      //   nextUrl: response.data.next,
      //   prevUrl: response.data.previous,
      // });
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));
      // setPrevUrl(response.data.previous);
      // setPokemonListState({
      //   ...pokemonListState,
      //   nextUrl: response.data.previous
      // });

      //iterating over the array of pokemo, and using their url to create an array of promisses
      //that's will download those 20 pokemons
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      //passing that promise array to axios.all
      const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
      // console.log(pokemonData);

      //now iterate on the data of each pokemon, and extract id ,name , image
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });
      // console.log(pokeListRes);
      // setPokemonList(pokeListRes);
      // setPokemonListState({
      //   ...pokemonListState,
      //   pokemonList: pokeListResult,
      //   isLoading: false,
      // });
      setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
       }));
       // setIsLoading(false);
      }
      useEffect(() => {
        downloadPokemons();
      }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState]
}
  
export default usePokemonList;