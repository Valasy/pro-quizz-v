import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import db from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import BlinkingPoint from './Blink';
import Loading from './loading';
import AiResponseComponent from './AIResponse'
import Typewriter from 'typewriter-effect';

type FormData = {
  nombre: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string;
  respuesta5: string;
  respuesta6: string;
  respuesta7: string;
  respuesta8: string;
  respuesta9: string;
  respuesta10: string;
  respuesta11: string;
  respuesta12: string;
  respuesta13: string;
  respuesta14: string;
  respuesta15: string;
  respuesta16: string;
  respuesta17: string;
  respuesta18: string;
  respuesta19: string;
  respuesta20: string;
};

const staticMessageParts = [
  "Mi nombre es ", // pregunta 1
  "Mi color favorito es ", // pregunta 2
  "Mi película favorita es ", // pregunta 3
  "La comida que más me gusta es ", // pregunta 4
  "Si tuviera que ir a una isla me llevaría ",
  "Si tuviera que viajar a un país, iría a ",
  "Mi serie favorita es ",
  "Mi libros favoritos son ",
  "El genero de musica que mas me gusta es ",
  "Los sabores que deben tener un pastel son ",
  "Mi estación favorita es ",
  "La comida que no me gusta o me cae mas es ",
  "Lo que mas me gusta hacer en mi tiempo libre es ",
  "Marcas de belleza o ropa que me gustan son ",
  "La frase que me describe es "

];

const quizData = [
  { pregunta: '¿Nombre?', emocion: ':D', descripcion: 'Hola!.' },
  { pregunta: '¿Color favorito?', emocion: ':)', descripcion: 'Un gusto' },
  { pregunta: '¿Pelicula favorita?', emocion: ':<', descripcion: 'Me  gusta Yo robot,porque...' },
  { pregunta: '¿La comida que te gusta más', emocion: ':P', descripcion: 'La carambola' },
  { pregunta: '¿Que te llevarías a una isla?', emocion: ':O', descripcion: 'Piensa bien porque podrías aparecer ahí' },
  { pregunta: '¿Qué pais te gustaría visitar?', emocion: 'OwO', descripcion: 'Til Norge billettene!' },
  { pregunta: '¿Serie favorita?', emocion: 'c:', descripcion: 'A ver...' },
  { pregunta: '¿Que libros te gustan?', emocion: ':°', descripcion: 'O un diario...' },
  { pregunta: '¿Género de musica?', emocion: '>_>', descripcion: 'También pueden ser bandas o cantantes' },
  { pregunta: '¿Que sabores deben tener un pastel?', emocion: 'pwp', descripcion: 'También se dice torta' },
  { pregunta: '¿Estación favorita?', emocion: '*-*', descripcion: 'Team invierano' },
  { pregunta: '¿Comida que odies o te haga mal?', emocion: 'DX', descripcion: 'Cuidado con las alergías!' },
  { pregunta: '¿Qué es lo que más te gusta hacer en tu tiempo libre?', emocion: ':D!', descripcion: 'Motion Sickness' },
  { pregunta: 'Marcas de belleza o ropa que te gusten?', emocion: ':B', descripcion: 'Gucci' },
  { pregunta: '¿Chocolate favorito?', emocion: ':P', descripcion: 'Costa Rama' },
  { pregunta: '¿Alguna flor que te guste?', emocion: 'n.n', descripcion: 'Violet Evergarden' },
  { pregunta: 'Modelos de crema o perfume', emocion: ':o', descripcion: 'Perfume Gucci? Crema Nivea...' },
  { pregunta: '¿Talla de ropa?', emocion: ':B', descripcion: 'Zapatos, Jeans,Poleras, ¿anillos?' },
  { pregunta: '¿Restaurante o Marca de comida rapida favorita?', emocion: ':D', descripcion: 'El bar de Moe' },
  { pregunta: 'Que frase que te describe', emocion: 'uwu', descripcion: '...' },
];

const QuizForm = ({ setQuizStarted }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const respuestaKeys: (keyof FormData)[] = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4', 'respuesta5', 'respuesta6', 'respuesta7', 'respuesta8', 'respuesta9', 'respuesta10', 'respuesta11', 'respuesta12', 'respuesta13', 'respuesta14', 'respuesta15', 'respuesta16', 'respuesta17', 'respuesta18', 'respuesta19', 'respuesta20'];

  const watchQuestion = watch(respuestaKeys[questionIndex]);

  // Agrega un nuevo estado para almacenar todas las respuestas
  const [allAnswers, setAllAnswers] = useState({});
  const [personality, setPersonality] = useState(null);

  const [aiResponse, setAiResponse] = useState(null);

  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState('translate-y-0');
  const [scrolling, setScrolling] = useState('overflow-auto');



  const onSubmit = async (data: FormData) => {
    // Combina las respuestas anteriores con la nueva respuesta
    const newAnswers = { ...allAnswers, ...data };

    if (questionIndex < 19) {
      setDirection('translate-y-full');
      setTransitioning(true);
      setScrolling('overflow-hidden'); // Desactiva el scroll bar
      setTimeout(() => {
        setAllAnswers(newAnswers);
        setQuestionIndex(questionIndex + 1);
        setDirection('-translate-y-full');
      }, 400);
      setTimeout(() => {
        setTransitioning(false);
        setDirection('translate-y-0');
        setScrolling('overflow-auto'); // Reactiva el scroll bar
      }, 650);
    } else {
      setLoading(true);
      // Construye el mensaje a partir de las respuestas y las partes estáticas
      let message = "";
      for (let i = 0; i < staticMessageParts.length; i++) {
        message += staticMessageParts[i] + newAnswers[respuestaKeys[i]] + ". ";
      }

      const finalMessage = ". Con esta elabora un perfil descriptivo de mi persona, utilizando mis gustos para inferir parte de mi personalidad y carácter, además de comentar detalles sobre mis gustos trata de mencionarlos a medida que desarrollas tu respuesta también mencionando debilidades pero agradables ante la gente, trata de realizar conjetura en cuanto a mis respuestas sobre mi personalidad, sé amable y gentil con tus palabras también divertido y animado, mezcla personalidad y analisis de las respuestas, la conversación termina aquí sin ninguna otra duda, no te despidas tu mensaje termina cuando terminas de describir la personalidad, todo en 400 palabras";
      // Agrega finalMessage al final de message
      message += finalMessage;
      const encodedMessage = encodeURIComponent(message);
      const res = await fetch(`/api/get-ai-response?link=${encodedMessage}`);
      const data = await res.json();
      const text = data['choices'][0]['message']['content'];
      setAiResponse(text);
      setLoading(false);

      try {
        const docRef = await addDoc(collection(db, "quizzes"), newAnswers);
        console.log("Document written with ID: ", docRef.id);
        //setQuizStarted(false); // Reinicia el quiz
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      setLoading(false);

    }
  };


  useEffect(() => {
    if (questionIndex > 0) {
      reset({ ...allAnswers, [respuestaKeys[questionIndex]]: '' }); // Reset the field whenever questionIndex changes
    }
  }, [questionIndex]);

  useEffect(() => {
    setValue('nombre', 'Nombre del usuario');
  }, [setValue]);

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (aiResponse) {
    return <AiResponseComponent response={aiResponse} />
  }

  const goBack = () => {
    if (questionIndex > 0) {
      const newAnswers = { ...allAnswers };
      delete newAnswers[respuestaKeys[questionIndex]]; // Elimina la respuesta de la pregunta actual
      setAllAnswers(newAnswers); // Actualiza las respuestas
      setQuestionIndex(questionIndex - 1); // Disminuye el índice de la pregunta
    }
  };

  //{questionIndex + 1} de {quizData.length}
  return (
    <div className={scrolling}>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col items-center justify-center h-screen mt-[-8%] ${transitioning ? 'opacity-0' : 'opacity-100'} ${direction} transition-all duration-500`}>
      <h3 className="text-sm font-light mb-1">{questionIndex + 1} | {quizData.length}</h3>
      <h1 className="text-8xl font-bold mb-3">{quizData[questionIndex].emocion} <BlinkingPoint /></h1>
      <div className="text-xl font-light mb-12">
        <Typewriter
          options={{
            delay: 70, // Configura la velocidad de la escritura aquí
            strings: [quizData[questionIndex].descripcion],
            autoStart: true,
            deleteSpeed: Infinity
          }}
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">{quizData[questionIndex].pregunta}</h2>
      <input {...register(respuestaKeys[questionIndex], { required: "Este campo es requerido" })} className="mb-4 py-2 px-4 border-2 border-black rounded-lg" />
      {errors[respuestaKeys[questionIndex]] && (
        <span className="text-xs text-red-500 mb-2">Tienes que responder D:</span>
      )}

      <div className="flex justify-center gap-4">
        {questionIndex > 0 && (
          <button type="button" onClick={goBack} className="py-2 px-4 border-2 border-black bg-transparent text-black rounded hover:bg-gray-200">Volver atrás</button>
        )}
        <button type="submit" className="py-2 px-4 border-2 border-black bg-transparent text-black rounded hover:bg-gray-200">Siguiente</button>
      </div>

    </form>
    </div>


  );
};

export default QuizForm;


