import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";

  async function downloadPokemons() {
    const responce = await axios.get(POKEDEX_URL); //this download list of 20 pokemons
    const pokemonResults = responce.data.results; // this get the array of pokemons from result(include name and url of details)
    console.log(responce.data);

    //iterating over the array of pokemo, and using their url to create an array of promisses
    //that's will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    //passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
    // console.log(pokemonData);

    //now iterate on the data of each pokemon, and extract id ,name , image
    const pokeListRes = pokemonData.map((pokeData) => {
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
    setPokemonList(pokeListRes);
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      <div>Pokemon List</div>
      {isLoading
        ? " Loading... "
        : pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} />
          ))}
    </div>
  );
}
export default PokemonList;
