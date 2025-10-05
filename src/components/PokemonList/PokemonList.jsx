import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";

function PokemonList() {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const [pokedexUrl, setPokedexUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  // const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // setIsLoading(true);
    // setPokemonListState({ ...pokemonListState, isLoading: true });
    setPokemonListState((state) => ({
      ...state,
      isLoading: true,
    }));
    // const responce = await axios.get(pokedexUrl); //this download list of 20 pokemons
    const responce = await axios.get(pokemonListState.pokedexUrl); //this download list of 20 pokemons
    const pokemonResults = responce.data.results; // this get the array of pokemons from result(include name and url of details)
    console.log(responce.data);
    // setNextUrl(responce.data.next);
    // setPokemonListState({
    //   ...pokemonListState,
    //   nextUrl: responce.data.next,
    //   prevUrl: responce.data.previous,
    // });
    setPokemonListState((state) => ({
      ...state,
      nextUrl: responce.data.next,
      prevUrl: responce.data.previous,
    }));
    // setPrevUrl(responce.data.previous);
    // setPokemonListState({
    //   ...pokemonListState,
    //   nextUrl: responce.data.previous
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

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? " Loading... "
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl === null}
          onClick={() =>
            // setPokemonListState({
            //   ...pokemonListState,
            //   pokedexUrl: pokemonListState.prevUrl,
            // })
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: pokemonListState.prevUrl,
            }))
          }
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl === null}
          onClick={() =>
            // setPokemonListState({
            //   ...pokemonListState,
            //   pokedexUrl: pokemonListState.nextUrl,
            // })
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: pokemonListState.nextUrl,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;
