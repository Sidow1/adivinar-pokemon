export const Score = ({ score }: { score: [number, number] }) => {
  return (
    <p className="score">
      Score: (✅) {score[0]} - {score[1]} (❌)
    </p>
  );
};
