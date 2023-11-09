import { useCallback, useEffect, useState } from "react";
import api from "./api.ts";
import "./App.css";
import { Pokemon } from "./types.ts";
import { AnswerSection } from "./components/AnswerSection.tsx";
import { GuessingSection } from "./components/GuessingSection.tsx";
import { PlayAgainButton } from "./components/PlayAgainButton.tsx";
import { Score } from "./components/Score.tsx";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>({
    id: 0,
    name: "",
    image: "",
  });
  const [pokemonName, setPokemonName] = useState<string>("");
  const [guessing, setGuessing] = useState<Boolean>(true);
  const [answer, setAnswer] = useState<"right" | "wrong" | "">("");
  const [score, setScore] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    randomPokemon();
    loadScoreFromLocalStorage();
  }, []);

  useEffect(() => {
    if (score[0] > 0 || score[1] > 0) {
      saveScoreToLocalStorage();
    }
  }, [score]);
  const randomPokemon = async (): Promise<Pokemon | void> => {
    try {
      setPokemon(await api.random());
    } catch (error) {
      console.error(error);
    }
  };

  const saveScoreToLocalStorage = (): void => {
    localStorage.setItem("score", JSON.stringify([score[0], score[1]]));
  };

  const loadScoreFromLocalStorage = (): void => {
    const score = localStorage.getItem("score");
    if (!score) return;
    setScore(JSON.parse(score));
  };

  const onChangePokemonName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPokemonName(event.target.value);
    },
    []
  );

  const guessPokemon = useCallback((): void => {
    if (!pokemonName) return;
    const cleanPokemonName = clearPokemonName(pokemonName);
    setGuessing(false);

    let newScore: [number, number] = [...score];
    if (cleanPokemonName === pokemon.name) {
      setAnswer("right");
      newScore[0] += 1;
    } else {
      setAnswer("wrong");
      newScore[1] += 1;
    }
    setScore(newScore);
    saveScoreToLocalStorage();

    setPokemonName("");
  }, [score, pokemonName, pokemon.name]);

  const clearPokemonName = (pokemonName: string): string => {
    return pokemonName
      .replace(/[^a-zA-Z\\s+\-]/g, "")
      .toLowerCase()
      .trim();
  };

  const playAgain = useCallback((): void => {
    setGuessing(true);
    setAnswer("");
    randomPokemon();
  }, []);

  return (
    <div className="container">
      <section>
        <h1>Who's that Pokemon?</h1>
        {!guessing && <p>It's {pokemon.name.toUpperCase()}!</p>}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="pokemon-image"
          style={{
            filter: guessing ? "brightness(0) saturate(0%)" : "none",
          }}
        />
        <AnswerSection answer={answer} name={pokemon.name} />
        <div className="guessSection">
          {guessing ? (
            <GuessingSection
              onChangePokemonName={onChangePokemonName}
              pokemonName={pokemonName}
              guessPokemon={guessPokemon}
            />
          ) : (
            <PlayAgainButton playAgain={playAgain} />
          )}
        </div>
        <Score score={score} />
      </section>
    </div>
  );
}

export default App;
