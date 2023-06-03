import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import db from '../lib/firebase';  
import { collection, addDoc } from 'firebase/firestore';
import BlinkingPoint from './Blink';

type FormData = {
  nombre: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string;
  respuesta5: string;
};

const quizData = [
  { pregunta: '¿Nombre?', emocion: ':D', descripcion: 'Hola!.' },
  { pregunta: '¿Color favorito?', emocion: ':)', descripcion: 'Un gusto' },
  { pregunta: '¿Pelicula favorita?', emocion: ':<', descripcion: 'Me  gusta Blade Runner' },
  { pregunta: 'La fruta que te gusta más', emocion: ':P', descripcion: 'La carambola' },
  { pregunta: 'Que te llevarías a una isla?', emocion: ':O', descripcion: 'Piensa bien porqué podrías aparecer ahí' }
];

const QuizForm = ({setQuizStarted }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const { register, handleSubmit, setValue, reset, watch } = useForm<FormData>();
  
  const respuestaKeys: (keyof FormData)[] = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4', 'respuesta5'];

  const watchQuestion = watch(respuestaKeys[questionIndex]);

  const onSubmit = async (data: FormData) => {
    if (questionIndex < 4) {
      setQuestionIndex(questionIndex + 1);
    } else {
      try {
        const docRef = await addDoc(collection(db, "quizzes"), data);
        console.log("Document written with ID: ", docRef.id);
        setQuizStarted(false); // Reinicia el quiz
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  useEffect(() => {
    if(questionIndex > 0){
      reset({ ...watch, [respuestaKeys[questionIndex]]: '' }); // Reset the field whenever questionIndex changes
    }
  }, [questionIndex]);

  useEffect(() => {
    setValue('nombre', 'Nombre del usuario');  
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-screen mt-[-10%] ">
      <h1 className="text-6xl font-bold mb-4">{quizData[questionIndex].emocion} <BlinkingPoint/></h1>
      <h3 className="text-xl font-light mb-12">{quizData[questionIndex].descripcion}</h3>
      <h2 className="text-2xl font-bold mb-4">{quizData[questionIndex].pregunta}</h2>
      <input {...register(respuestaKeys[questionIndex])} className="mb-4 py-2 px-4 border-2 border-black rounded-lg" />
      <button type="submit" className="py-2 px-4 border-2 border-black bg-transparent
      text-black rounded hover:bg-gray-200">Siguiente</button>
    </form>

  );
};

export default QuizForm;


