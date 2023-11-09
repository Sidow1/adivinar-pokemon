export const PlayAgainButton = ({ playAgain }: { playAgain: () => void }) => {
  return (
    <button type="button" className="nes-btn is-error" onClick={playAgain}>
      Play Again
    </button>
  );
};
