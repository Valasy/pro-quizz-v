import BlinkingPoint from "./Blink";

const AiResponseComponent = ({ response }) => {
    return (
      <div className="m-16 mt-[-1%]"> {/* Agrega márgenes a todos los lados */}
      <h1 className="text-7xl font-bold mb-3"> c: <BlinkingPoint /></h1>
        <h1 className="text-lg mb-4"> {/* Hace el título un poco más pequeño y agrega margen inferior */}
          Buenas noticias! 
        </h1>
        <p className="text-sm"> {/* Hace el texto de la respuesta más pequeño */}
          {response}
        </p>
      </div>
    );
};

export default AiResponseComponent;

  