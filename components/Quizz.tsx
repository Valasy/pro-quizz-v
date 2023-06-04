import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import db from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import BlinkingPoint from './Blink';
import Loading from './Loading';

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
};

const quizData = [
  { pregunta: '¿Nombre?', emocion: ':D', descripcion: 'Hola!.' },
  { pregunta: '¿Color favorito?', emocion: ':)', descripcion: 'Un gusto' },
  { pregunta: '¿Pelicula favorita?', emocion: ':<', descripcion: 'Me  gusta Yo robot,porque...' },
  { pregunta: 'La comida que te gusta más', emocion: ':P', descripcion: 'La carambola' },
  { pregunta: 'Que te llevarías a una isla?', emocion: ':O', descripcion: 'Piensa bien porque podrías aparecer ahí' },
  { pregunta: 'Qué pais te gustaría visitar?', emocion: 'OwO', descripcion: 'Til Norge billettene!' },
  { pregunta: 'Serie favorita?', emocion: 'c:', descripcion: 'A ver...' },
  { pregunta: 'Que libros te gustan?', emocion: ':°', descripcion: 'O un diario...' },
  { pregunta: 'Género de musica?', emocion: '>_>', descripcion: 'También pueden ser bandas o cantantes' },
  { pregunta: 'Que sabores deben tener un pastel?', emocion: 'pwp', descripcion: 'También se dice torta' },
  { pregunta: 'Golosinas? Galletas?', emocion: '*-*', descripcion: 'Comer con moderación' },
  { pregunta: 'Comida que odies o te haga mal?', emocion: 'DX', descripcion: 'También pueden ser bandas o cantantes' },
  { pregunta: 'Cuál es tu canción favorita para darlo todo en el karaoke?', emocion: ':D!', descripcion: 'Motion Sickness' },
  { pregunta: 'Marcas de belleza o ropa que te gusten?', emocion: ':B', descripcion: 'Gucci' },
  { pregunta: '¿Tangananica o Tanganana?', emocion: 'uwu', descripcion: '...' },
];

const QuizForm = ({ setQuizStarted }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const { register, handleSubmit, setValue, reset, watch } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const respuestaKeys: (keyof FormData)[] = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4', 'respuesta5', 'respuesta6', 'respuesta7', 'respuesta8', 'respuesta9', 'respuesta10', 'respuesta11', 'respuesta12', 'respuesta13', 'respuesta14', 'respuesta15'];

  const watchQuestion = watch(respuestaKeys[questionIndex]);

  // Agrega un nuevo estado para almacenar todas las respuestas
  const [allAnswers, setAllAnswers] = useState({});
  const [personality, setPersonality] = useState(null);


  const onSubmit = async (data: FormData) => {
    // Combina las respuestas anteriores con la nueva respuesta
    const newAnswers = { ...allAnswers, ...data };

    if (questionIndex < 14) {
      setAllAnswers(newAnswers); // Guarda las respuestas hasta ahora
      setQuestionIndex(questionIndex + 1);
    } else {
      setLoading(true);
      try {
        const docRef = await addDoc(collection(db, "quizzes"), newAnswers);
        console.log("Document written with ID: ", docRef.id);
        setQuizStarted(false); // Reinicia el quiz
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
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

  // Esta función será manejadora del evento click del botón "Volver atrás"
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-screen mt-[-10%] ">
      <h3 className="text-sm font-light mb-1">{questionIndex + 1} | {quizData.length}</h3>
      <h1 className="text-7xl font-bold mb-3">{quizData[questionIndex].emocion} <BlinkingPoint /></h1>
      <h3 className="text-xl font-light mb-12">{quizData[questionIndex].descripcion}</h3>

      <h2 className="text-2xl font-bold mb-4">{quizData[questionIndex].pregunta}</h2>
      <input {...register(respuestaKeys[questionIndex])} className="mb-4 py-2 px-4 border-2 border-black rounded-lg" />

      <div className="flex justify-center gap-4"> {/* Ajusta el estilo aquí */}
        {questionIndex > 0 && (
          <button type="button" onClick={goBack} className="py-2 px-4 border-2 border-black bg-transparent
        text-black rounded hover:bg-gray-200">Volver atrás</button>
        )}
        <button type="submit" className="py-2 px-4 border-2 border-black bg-transparent
      text-black rounded hover:bg-gray-200">Siguiente</button>
      </div>
      {personality ? <div>
        <h2>Tu personalidad analizada</h2>
        <p>{personality}</p>
      </div> : <></>}
    </form>

  );
};

export default QuizForm;


