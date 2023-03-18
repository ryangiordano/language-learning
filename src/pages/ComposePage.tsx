import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Composer from "../composition/components/Composer";
import { createComposition } from "../services/composition/composition";

export default function ComposePage() {
  const navigateTo = useNavigate();

  const handleSubmit = useCallback(async (composition: string) => {
    if (!composition.length) {
      return;
    }
    const response = await createComposition(composition, "Chinese");
    console.log(response);
    // navigate to the page based on the id of the composition.
    // Ideally, we can kick off the correction of the composition asynchronously, and then send a message to the page via socket when the correction is ready.
    navigateTo(`/composition/${response._id}`);
  }, []);
  return (
    <>
      <Composer onSubmit={handleSubmit} />
    </>
  );
}
