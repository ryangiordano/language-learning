import { Correction } from "../../services/OpenAi";

export default function CompositionPreview({
  composition,
}: {
  composition: Correction[];
}) {
  return <>{composition[0].originalText}...</>;
}
