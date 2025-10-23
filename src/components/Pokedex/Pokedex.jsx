import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";

//CSS import
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import "./Pokedex.css";

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="pokedex-wrapper">
      <Search updateSearchTerm={setSearchTerm} />
      {/* {searchTerm} */}
      {!searchTerm ? (
        <PokemonList />
      ) : (
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
      )}
    </div>
  );
}

export default Pokedex;
