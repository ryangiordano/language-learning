import { useState } from "react";
import OpenAICorrector, { Correction } from "../../services/OpenAi";

const corrector = new OpenAICorrector();

export default function Composer({
  onChange,
}: {
  onChange: (corrections: Correction[]) => void;
}) {
  const [composition, setComposition] = useState("");

  return (
    <>
      <label htmlFor="me">Foreign Language Composition</label>
      <textarea
        id="me"
        onChange={(e) => setComposition(e.target.value)}
        value={composition}
      />
      <button
        type="button"
        onClick={async () => {
          try {
            const corrections = await corrector.correctComposition(
              composition,
              "Chinese"
            );
            if (corrections) {
              setComposition("");
              onChange(corrections);
            }
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Submit
      </button>
    </>
  );
}
