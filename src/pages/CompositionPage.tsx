import { useParams } from "react-router-dom";
import Composition from "../composition/components/Composition";
import { getComposition } from "../services/OpenAi";

export default function CompositionPage() {
  const { key } = useParams();
  const composition = getComposition(Number(key));
  if (composition) {
    return <Composition corrections={composition} />;
  }
  return <>Unable to find composition with key {key}</>;
}
