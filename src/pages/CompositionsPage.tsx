import { Link } from "react-router-dom";
import CompositionPreview from "../composition/components/CompositionPreview";
import { useEffect, useState } from "react";
import {
  deleteComposition,
  getCompositions,
} from "../services/composition/composition";
import { CompositionModel } from "../services/client";

export default function CompositionsPage() {
  // TODO: Get generated types from the server
  const [compositions, setCompositions] = useState<CompositionModel[]>([]);

  // TODO: Replace with react query
  useEffect(() => {
    async function queryCompositions() {
      const compositions = await getCompositions();
      if (compositions?.data.length) {
        setCompositions(compositions.data);
      }
    }
    queryCompositions();
  }, []);

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
      {compositions.map((composition, index, arr) => (
        <div key={composition._id}>
          <CompositionPreview composition={composition} />
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/composition/${composition._id}`}>
              <button className="btn btn-secondary">View</button>
            </Link>
            <button
              className="btn btn-dark"
              onClick={() => {
                deleteComposition(composition._id);
                // setCompositions(getCompositions());
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
