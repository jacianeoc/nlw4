import { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import{ChallengesContext} from '../contexts/ChallengeContext';

//é uma variavel global, para saber qual é o formato
let countdownTimeout:NodeJS.Timeout; 

export function Countdown() {
  const {startNewChallenge} = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1*60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    //fazendo com que o setTimeout, não execute uma vez
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1*60);
  }

  //useEffect é uma função para disparar efeitos colaterais
  //quando algo mudar/acontecer, vai dispará ele 
  //ela vai rodar isso todas as vezes que active mudar
  useEffect(()=>{
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{
        setTime(time-1)}, 1000);

    } else if(isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false);
      startNewChallenge();
      
    }
  }, [isActive, time])

  return(
    <div>
      <div className={styles.CountdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled 
        className= {styles.CountdownButton}
        >
          Ciclo encerrado <span><img src="icons/verifica.svg" alt="completo"/></span>
        </button>
      ): ( 
        <>
          { isActive ? (
            <button onClick={resetCountdown}
            type="button"
            className={`${styles.CountdownButton} ${styles.CountdownButtonActive}` }>
            Abandonar ciclo
            </button>

          ) : (
            <button onClick={startCountdown}
            type="button"
            className={styles.CountdownButton}>
            Iniciar um ciclo
            </button>
          )  }
        </>
      )}
      
      

      
    </div>
  );
  
}