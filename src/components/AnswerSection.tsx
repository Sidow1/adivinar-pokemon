export const AnswerSection = ({
  answer,
  name,
}: {
  answer: "right" | "wrong" | "";
  name: string;
}) => {
  if (answer === "") return;
  return answer === "right" ? (
    <p>
      You're {answer}! The pokemon was {name}
    </p>
  ) : (
    <p>
      You're {answer}! The pokemon was {name}
    </p>
  );
};
