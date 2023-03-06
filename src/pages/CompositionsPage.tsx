import Composition from "../composition/components/Composition";
import { getCompositions } from "../services/OpenAi";

export default function CompositionsPage() {
  const compositions = getCompositions();
  return (
    <>
      {Object.keys(compositions).map((key, index, arr) => (
        <div key={key}>
          <Composition corrections={compositions[key]} />
          {index >= arr.length - 1 ? <></> : <hr />}
        </div>
      ))}
    </>
  );
}
