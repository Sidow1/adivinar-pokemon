type GuessingSectionProps = {
  onChangePokemonName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  guessPokemon: () => void;
  pokemonName: string;
};

export const GuessingSection = ({
  onChangePokemonName,
  pokemonName,
  guessPokemon,
}: GuessingSectionProps) => {
  return (
    <div className="nes-field is-inline">
      <input
        type="text"
        className="nes-input"
        id="pokemonName"
        name="pokemonName"
        onChange={onChangePokemonName}
        value={pokemonName}
      />
      <button
        type="button"
        className="nes-btn is-primary"
        onClick={guessPokemon}
      >
        Guess
      </button>
    </div>
  );
};
