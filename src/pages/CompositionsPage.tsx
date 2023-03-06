import { Link } from "react-router-dom";
import { deleteComposition, getCompositions } from "../services/OpenAi";
import CompositionPreview from "../composition/components/CompositionPreview";
import { useState } from "react";

export default function CompositionsPage() {
  const [compositions, setCompositions] = useState(getCompositions());
  const compositionKeys = Object.keys(compositions);
  if (!compositionKeys.length) {
    return (
      <>
        You do not have any compositions. <Link to="/">Write something!</Link>
      </>
    );
  }
  return (
    <>
      {Object.keys(compositions).map((key, index, arr) => (
        <div key={key}>
          <CompositionPreview composition={compositions[key]} />
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/composition/${key}`}>
              <button className="btn btn-secondary">View</button>
            </Link>
            <button
              className="btn btn-dark"
              onClick={() => {
                deleteComposition(key);
                setCompositions(getCompositions());
              }}
            >
              Delete
            </button>
          </div>

          {index >= arr.length - 1 ? <></> : <hr />}
        </div>
      ))}
    </>
  );
}
