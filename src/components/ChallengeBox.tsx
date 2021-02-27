import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox() {
  const hasActiveChallenge= true;
  return (
    <div className= {styles.ChallengeBoxContainer}>
      {hasActiveChallenge? (
        <div className= {styles.ChallengeActive}>
          <header>Ganhe 400 xp</header>
          <main>
            <img src="icons/body.svg" alt=""/>
            <strong>Novo desafio</strong>
            <p>levante e faça uma caminhada</p>
          </main>
          <footer>
            <button type='button'
              className={styles.challengeFailedButton}
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