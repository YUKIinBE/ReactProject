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
      console.log(pokemons);
    }
  };

  // const render = (selectedType: string, pokemons: Pokemon[]) => {
  //   let html = ''
  //   if (!selectedType)
  //     pokemons.map(poke => html += <p key={poke.id}>{poke.name}</p>)
  //   else{
  //     const filteredPokemons = pokemons.filter(poke => poke.types
  //       .map(type => type.type.name === selectedType))
  //     filteredPokemons.map(poke => html += <p key={poke.id}>{poke.name}</p>)
  //   }
  //   return html;
  // }

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
        {!type &&
          pokemons.map((poke) => (
            <>
              <img src={poke.sprites.other.dream_world.front_default} />
              <p>{poke.name}</p>
            </>
          ))}
        
        {/* <div>{render(type, pokemons)}</div> */}

        {/* {!type && pokemons.map((poke) => <p key={poke.id}>{poke.name}</p>)}
        {type && pokemons.map((poke) =>
        poke.types.map(item => item.type.name == type && <p key={poke.id}>{poke.name}</p>)
        )} */}
      </div>
    </>
  );
}

export default App;
