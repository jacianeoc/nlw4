import { useContext } from 'react';
import{ChallengesContext} from '../contexts/ChallengeContext';

import styles from '../styles/components/Profile.module.css';

export function Proflie() {
  const {level} = useContext(ChallengesContext);

  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/jacianeoc.png" alt="eu"/>
      <div>
        <strong>Jaciane</strong>
        <p>
          <img src="icons/level.svg" alt=""/>
          Level {level}
          </p>
      </div>
    </div>
  );
  
}