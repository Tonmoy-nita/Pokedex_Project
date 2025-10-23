import useDebounce from "../../hooks/useDebounce";
import "./Search.css";

function Search({ updateSearchTerm }) {
  const debounceCallback = useDebounce((e) => updateSearchTerm(e.target.value));

  return (
    <div className="serach-wrapper">
      <input
        type="text"
        placeholder="pokemon name ..."
        id="pokemon-name-search"
        onChange={debounceCallback}
      />
    </div>
  );
}
export default Search;
