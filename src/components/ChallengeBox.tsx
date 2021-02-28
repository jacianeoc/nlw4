import styles from '../styles/components/ChallengeBox.module.css';
import{ChallengesContext} from '../contexts/ChallengeContext';
import { useContext } from 'react';

export function ChallengeBox() {

  const {activeChallenge, resetChallenge} = useContext(ChallengesContext);


  return (
    <div className= {styles.ChallengeBoxContainer}>
      {activeChallenge? (
        <div className= {styles.ChallengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button type='button'
              className={styles.challengeFailedButton}
              onClick={resetChallenge}
            >
              Falhei
              </button>
            <button type='button'
              className={styles.challengeSuccededButton} 
            >
              Completei
            </button>
          </footer>

        </div>
      ): (
        <div className= {styles.ChallengeNoActive}>
          <strong>Finalize um ciclo e receba um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up"/>
            Avance de level completando desafios
          </p>
        </div>
      )}
      
    </div>
  );
}