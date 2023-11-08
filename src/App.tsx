import { useEffect, useState } from "react";
import api from "./api.ts";

function App() {
  const [pokemon, setPokemon] = useState({
    id: 0,
    name: "",
    image: "",
  });
  async function randomPokemon() {
    try {
      setPokemon(await api.random());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    randomPokemon();
  }, []);

  return (
    <div className="container">
      <section>
        <h1>Quién es este pokemon?</h1>
        <img src={pokemon.image} alt={pokemon.name} />
        <div className="nes-field is-inline">
          <input type="text" id="name_field" className="nes-input" />
          <button type="button" className="nes-btn is-primary">
            Primary
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
