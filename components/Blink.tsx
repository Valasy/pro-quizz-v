import { useState, useEffect } from 'react';

const BlinkingPoint = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 600); // Cambia el valor en milisegundos para ajustar la velocidad del parpadeo

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="text-6xl font-bold relative">
      <span
        className={`absolute top-0 left-4 animate-blink ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        _
      </span>
      <span></span>
    </span>
  );
};

export default BlinkingPoint;

