import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

interface results {
  results: simplePokemon[];
}

interface simplePokemon {
  name: string;
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  sprites: Other;
}

interface Type {
  type: {
    name: string;
  };
}

interface Other {
  front_default: string;
  other: Dream_world;
}

interface Dream_world {
  dream_world: { front_default: string };
}

function App() {
  const types = [
    "Bug",
    "Dragon",
    "Electric",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Water",
  ];
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [type, setType] = useState("");
  const typeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    axios
      .get<results>("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((results) => {
        let temp: Pokemon[] = [];
        results.data.results.map((simplePokemon) =>
          axios.get<Pokemon>(simplePokemon.url).then((pokemon) => {

            //! Ce qui est commenté était ce que je voulais faire au départ, mais comme ça ne marche pas, j'utilise « let temp: Pokemon[] »
            //! Quand j'ai utilisé « setPokemon([pokemon.data, ...pokemons]) », React a stocké chaque fois UN SEUL pokemon et quand une nouvelle donnée arrive, il écrase l'ancien
            //! J'aimerais utiliser ceci mais je ne comprends pas pourquoi ça écrase...
            // setPokemons([pokemon.data, ...pokemons])
            temp.push(pokemon.data);
          })
        );
        setPokemons(temp);
      });
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (typeRef.current !== null) {
      setType(typeRef.current.value);
    }
    console.log(pokemons);
  };

  return (
    <>
      <h1 className="mb-3">PokeDex</h1>
      <div className="mb-" onSubmit={handleSubmit}>
        <form>
          <select className="form-select" ref={typeRef}>
            <option value="">Select a type</option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
          <button className="btn btn-primary my-3" type="submit">
            Search
          </button>
        </form>
      </div>
      <div>
        {type && <p>Here's {type.toUpperCase()} pokemons : </p>}
        
        {/* //! Apparement React essaie de render html avant que la réponse de API est complètement revenue.
        //! MAIS comme « pokemons » est un State Hook, il est censé render chaque fois quand il y a un changement
        //! Qunad je selectionne un type, comme ça fait un re-render, tous les pokemons seront présents
        */}        
        <div className="pokemons-container">
          {pokemons.map((poke) => (
            <div className="pokemon-grid" key={poke.id}>
              <img src={poke.sprites.front_default} />
              <p>{poke.name}</p>
            </div>
          ))}
          </div>
      </div>
    </>
  );
}

export default App;
