import { CompositionModel, CorrectionModel } from "../../services/client";

function CompositionLineItem({ correction }: { correction: CorrectionModel }) {
  const hasCorrection = correction.reason.length > 0;

  return (
    <>
      <div>{correction.originalContent}</div>
      {hasCorrection ? <div>{correction.correctedContent}</div> : <></>}
      {hasCorrection ? <i>{correction.reason}</i> : <></>}
      <br />
      <br />
    </>
  );
}

export default function Composition({
  corrections,
  composition,
}: {
  composition: CompositionModel;
  corrections: CorrectionModel[];
}) {
  console.log(corrections);
  return (
    <>
      <div>{composition.content}</div>
      <hr />
      {corrections.map((correction) => (
        <div key={correction.originalContent}>
          <CompositionLineItem correction={correction} />
        </div>
      ))}
    </>
  );
}
