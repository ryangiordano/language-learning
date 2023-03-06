import { useNavigate } from "react-router-dom";

import Composer from "../composition/components/Composer";
import { saveCorrection } from "../services/OpenAi";

export default function ComposePage() {
  const navigateTo = useNavigate();
  return (
    <>
      <Composer
        onChange={(correction) => {
          //TODO: This will be a servercall;
          const key = new Date().getTime();
          saveCorrection(correction, key);
          navigateTo(`/composition/${key}`);
        }}
      />
    </>
  );
}
