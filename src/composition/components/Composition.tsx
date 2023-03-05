import { Correction } from "../../services/OpenAi";

function CompositionLineItem({ correction }: { correction: Correction }) {
  const hasCorrection = correction.reason.length > 0;

  return (
    <>
      <div>{correction.originalText}</div>
      {hasCorrection ? <div>{correction.correctedText}</div> : <></>}
      {hasCorrection ? <i>{correction.reason}</i> : <></>}
      <br />
      <br />
    </>
  );
}

export default function Composition({
  corrections,
}: {
  corrections: Correction[];
}) {
  return (
    <>
      {corrections.map((correction) => (
        <div key={correction.originalText}>
          <CompositionLineItem correction={correction} />
        </div>
      ))}
    </>
  );
}
