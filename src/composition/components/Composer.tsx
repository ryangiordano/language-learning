import { useState } from "react";

export default function Composer({
  onSubmit,
}: {
  onSubmit: (composition: string) => void;
}) {
  const [composition, setComposition] = useState("");

  return (
    <form onSubmit={() => onSubmit(composition)}>
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
        onClick={() => onSubmit(composition)}
      >
        Submit
      </button>
    </form>
  );
}
