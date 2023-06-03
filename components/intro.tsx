import { CMS_NAME } from '../lib/constants'
import BlinkingPoint from './Blink'
import StartButton from './StartButton'

const Intro = ({ startQuiz }) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center mt-16 mb-16 md:mb-12">
      <div className="text-center">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
          Quizz <BlinkingPoint/>
        </h1>
        <StartButton onClick={startQuiz} />
      </div>
    </section>
  );
};

export default Intro;
