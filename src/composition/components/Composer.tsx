import { useCallback, useState } from "react";
import OpenAICorrector, { Correction } from "../../services/OpenAi";

const corrector = new OpenAICorrector();

export default function Composer({
  onChange,
}: {
  onChange: (corrections: Correction[]) => void;
}) {
  const [composition, setComposition] = useState("");

  const handleSubmit = useCallback(async () => {
    if (!composition.length) {
      return;
    }
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
  }, [composition, onChange]);

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="me">
        Foreign Language Composition
      </label>
      <textarea
        className="form-control"
        id="me"
        style={{ height: 500 }}
        onChange={(e) => setComposition(e.target.value)}
        value={composition}
      />
      <br />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}
