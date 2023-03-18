import { useParams } from "react-router-dom";
import Composition from "../composition/components/Composition";
import { getComposition } from "../services/composition/composition";
import { useEffect, useState } from "react";
import type { CompositionModel, CorrectionModel } from "../services/client";
import { getCorrectionsForCompositionId } from "../services/correction/correction";

export default function CompositionPage() {
  const { key } = useParams();

  // Use React Query...
  const [composition, setComposition] = useState<CompositionModel | null>(null);
  const [corrections, setCorrections] = useState<CorrectionModel[]>([]);

  useEffect(() => {
    async function queryComposition() {
      if (!key) {
        return;
      }
      console.log(key);
      const composition = await getComposition(key);
      if (composition) {
        setComposition(composition);
      }
    }
    queryComposition();
  }, [key]);

  useEffect(() => {
    async function queryCorrections() {
      if (!key || !composition) {
        return;
      }
      const corrections = await getCorrectionsForCompositionId(key);
      console.log(corrections)
      if (corrections?.data?.length) {
        setCorrections(corrections.data);
      }
    }
    queryCorrections();
  }, [key, composition]);
  if (composition) {
    return <Composition composition={composition} corrections={corrections} />;
  }
  return <></>;
}
