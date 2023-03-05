import { useState } from "react";
import "./App.css";
import Composer from "./composition/components/Composer";
import Composition from "./composition/components/Composition";
import { LOCAL_STORAGE_COMPOSITION_KEY } from "./constants";
import { Correction } from "./services/OpenAi";

/** We will be saving the correction to local storage for now, but in the future we'd want them to be associated with a logged in user, and persist */
export function saveCorrection(correction: Correction[]) {
  let stored = localStorage.getItem(LOCAL_STORAGE_COMPOSITION_KEY) ?? "{}";

  stored = { ...JSON.parse(stored), [new Date().getTime()]: correction };
  localStorage.setItem(LOCAL_STORAGE_COMPOSITION_KEY, JSON.stringify(stored));
}

function App() {
  const [compositions, setCompositions] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMPOSITION_KEY) ?? "{}")
  );
  return (
    <div className="App">
      <section>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Composer
            onChange={(correction) => {
              saveCorrection(correction);
              setCompositions(
                JSON.parse(
                  localStorage.getItem(LOCAL_STORAGE_COMPOSITION_KEY) ?? "{}"
                )
              );
            }}
          />
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.keys(compositions).map((key, index, arr) => (
            <div key={key}>
              <Composition corrections={compositions[key]} />
              {index >= arr.length - 1 ? <></> : <hr />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
