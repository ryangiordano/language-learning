import { CompositionModel } from "../../services/client";

export default function CompositionPreview({
  composition,
}: {
  composition: CompositionModel;
}) {
  return <>{composition.content}...</>;
}
