import Head from 'next/head'; 
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import { Proflie } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>inicio myOcean</title>
      </Head>
      <ExperienceBar/>
      <section>
        <div>
          <Proflie/>
          <CompletedChallenges/>
          <Countdown/>
        </div>
        <div>
          
        </div>
      </section>
    </div>

  )
}
