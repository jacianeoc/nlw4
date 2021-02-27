import styles from '../styles/components/Profile.module.css';

export function Proflie() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/jacianeoc.png" alt="eu"/>
      <div>
        <strong>Jaciane</strong>
        <p>
          <img src="icons/level.svg" alt=""/>
          Level 1
          </p>
      </div>
    </div>
  );
  
}