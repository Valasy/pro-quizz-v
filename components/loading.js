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
    <div className="flex flex-col items-center justify-center h-screen">
      <BeatLoader color="#000000" loading={loading} css={override} size={20} />
      <p className="text-2xl font-bold mt-4">Cargando...</p>
    </div>
  );
}

export default Loading;
