import { FormEvent, useRef, useState } from "react";
import "./App.css";

function App() {
  // Nous utilisons le hook state pour définir des données qui peuvent changer au fil du temps
  // Similaire 2-way binding dans Angular
  const [pokemon, setPokemon] = useState("");

  // Nous utilisons le hook Ref pour obtenir les données de l'élément Input
  const pokeRef = useRef<HTMLInputElement>(null);

  // Cette méthode sera exécutée lorsque le bouton Submit est cliqué
  const handleSubmit = (event: FormEvent) => {

    // Par défaut, React actualise la page lorsque le bouton Submit est cliqué
    // Ce code annulera l'actualisation par défaut
    event.preventDefault();

    // Lorsque les données de l'input ne sont pas vides, nous affectons la valeur à pokemon
    if (pokeRef.current !== null) {
      console.log('pokeRef !== null')
      setPokemon(pokeRef.current.value);
    }
  }

  return (
    <>
      {/* Nous activons la méthode d'événement handleSubmit lorsque le bouton Submit est cliqué */}
      <div className="mb-3" onSubmit={handleSubmit}>
        <p>The pokemon you selected : {pokemon.toUpperCase()}</p>
        <form>
          <input
            className="form-control"
            type="text"
            placeholder="Pokemon's name"
            
            // N'oubliez pas d'affecter le hook Ref à l'attribut ref
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
