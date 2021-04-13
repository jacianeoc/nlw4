import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import { Proflie } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css';
import { createContext } from 'react';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps{
    level: number,
    currentExperience : number,
    challengesCompleted : number

}
export default function Home(props) {
  return (
    <ChallengesProvider
    level={props.level}
    currentExperience ={props.currentExperience}
    challengesCompleted ={props.challengesCompleted }>
      <div className={styles.container}>
      <Head>
        <title>inicio Move.it</title>
      </Head>
      <ExperienceBar/>
      <CountdownProvider>
        <section>
          <div>
            <Proflie/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
      
    </div>
    </ChallengesProvider>
    

  )
}


// com isso aqui, dá para passar da camada do next para a camada frontend(react)
//a funcao precisa ter esse nome e ser assincrona
export const getServerSideProps : GetServerSideProps = async (ctx) =>{
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return {
    props : {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)}

  }

}