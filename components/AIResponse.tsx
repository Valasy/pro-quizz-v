import React from 'react';
import BlinkingPoint from "./Blink";
import Typewriter from 'typewriter-effect';

const AiResponseComponent = ({ response }) => {
  return (
    <><h1 className="text-5xl font-bold mb-5 mx-12">c: / Resultados / : <BlinkingPoint /></h1>
      <div className="card p-4 mx-12">
        <h1 className="text-lg mb-4">
          <Typewriter
            options={{
              delay: 70,
              strings: [
                'Buenas noticias',
                ':D',
                'Espero te guste',
                'c:',
                'Son gustos muy interesantes',
                '...',
                'Hecho con amor',
                ':O',
                'Con tecnología de la Nasa',
                'Hola Mundo :D',
                'owo',
                'Se aceptan sugerencias',
                '...'
              ],
              autoStart: true,
              loop: true
            }}
          />
        </h1>
        <p className="text-sm">{response}</p>
      </div>
    </>
  );
};

export default AiResponseComponent;
