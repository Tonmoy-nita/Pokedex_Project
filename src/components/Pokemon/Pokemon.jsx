import "./Pokemon.css";

function Pokemon({ name, image }) {
  return (
    <div className="pokemon">
      <div className="pokemon_name">{name}</div>
      <div>
        <img className="pokemon_image" src={image} alt="" />
      </div>
    </div>
  );
}
export default Pokemon;
