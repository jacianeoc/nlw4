import styles from '../styles/components/LevelUp.module.css';
export function LevelUpModal(){
  return(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>2</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>

        <button type="button">
          <img src="/icon/close.svg" alt="fechar modal"/>
        </button>
      </div>
    </div>
  )

}