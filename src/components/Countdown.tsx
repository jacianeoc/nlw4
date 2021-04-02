import { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import{CountdownContext} from '../contexts/CountdownContext';


export function Countdown() {
  const {minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown} = useContext(CountdownContext);

  //esta formatando um dado, por isso que não fica no context, já que é no layout
  //e não na regra de negocio
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


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