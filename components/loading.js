// Loading.js
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import Typewriter from 'typewriter-effect';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading({ loading }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BeatLoader color="#000000" loading={loading} css={override} size={20} />
      <Typewriter
        options={{
          strings: ['Pensando...', 'Puede tardar', 'Un momento por favor', 'Calculando a la velocidad de la luz', 'Sabías que...', 'Ya casi', 'Está casi', '99.999%'],
          autoStart: true,
          loop: true,
          delay: 80,
        }}
      />  
    </div>
  );
}

export default Loading;
