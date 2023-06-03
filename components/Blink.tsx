import { useState, useEffect } from 'react';

const BlinkingPoint = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 1200); // Cambia el valor en milisegundos para ajustar la velocidad del parpadeo

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="text-7xl font-bold relative">
      <span
        className={`absolute top-0 left-0 animate-blink ${
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

