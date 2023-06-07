import Intro from '../components/intro'
import Layout from '../components/vLayout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import { useState } from 'react'
import QuizForm from '../components/Quizz'
import Footer from '../components/Footer'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  }

  return (
    <>
      <Head>
        <title>Un simple quizz</title>
      </Head>
      <Layout>
      {quizStarted ? <QuizForm setQuizStarted={setQuizStarted} /> : <Intro startQuiz={startQuiz} />}
      </Layout>
    </>
  )
}

//<Intro startQuiz={startQuiz}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
