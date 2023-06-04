// Loading.js
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading({ loading }) {
  return (
<Typewriter
      options={{
        strings: ['Pensando...', 'Puede tardar', 'Un momento por favor','Calculando a la velocidad de la luz','Sabías que...','Ya casi','Está saliendo del horno','99.999%'],
        autoStart: true,
        loop: true,
        delay: 80,
      }}
    />
  );
}

export default Loading;
