import { FormEvent, useRef, useState } from "react";
import "./App.css";

function App() {
  const [inputPokemon, setInputPokemon] = useState("");
  const pokeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (pokeRef.current !== null) {
      console.log('pokeRef !== null')
      setInputPokemon(pokeRef.current.value);
    }
  }

  return (
    <>
      <div className="mb-3" onSubmit={handleSubmit}>
        <p>The pokemon you selected : {inputPokemon.toUpperCase()}</p>
        <form>
          <input
            className="form-control"
            type="text"
            placeholder="Pokemon's name"
            ref={pokeRef}
          />
          <button className="btn btn-primary my-2" type="submit">
            Search
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
