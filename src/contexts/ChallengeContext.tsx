import {createContext, useState,ReactNode, useEffect} from 'react';
import challenges from '../../challenge.json';

//contextos eles pegam informação de um componente para o outro
// e por ai vai , (vai armazenar dados de todo os contextos )
interface Challenge{
  type:'body'| 'eye';
  description:string;
  amount:number;
}

interface ChallengesContextData {
  level:number;
  currentExperience:number;
  challengesCompleted:number;
  experienceToNextLevel:number;
  activeChallenge: Challenge;
  levelUp:()=>void;
  startNewChallenge: ()=>void;
  resetChallenge: ()=> void;
  completeChallenge: ()=> void;
}

//fazendo a tipagem 
interface ChallengesProviderProps{
  children:ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}:ChallengesProviderProps ) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setactiveChallenge] = useState(null);

  const experienceToNextLevel= Math.pow((level+1)*4, 2);
  //quando o segundo paramentro do use effect for vazio
  //quer dizer que ele vai executar uma unica vez a função quando
  //o componente for exibido em tela 
  //pedindo permissão para receber notificação 
  useEffect(() => {
    Notification.requestPermission();
  
  }, []) 

  function levelUp() {
    setLevel(level+1);
  }

  function startNewChallenge() {
    const randowChallengeIndex= Math.floor(Math.random()*challenges.length)
    const challenge = challenges[randowChallengeIndex];

    setactiveChallenge(challenge)

    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted') {

    new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }

  }

  function resetChallenge() {
    setactiveChallenge(null);
  }
  
  function completeChallenge() {
    if(!activeChallenge){
      return;
    }
    const{amount} = activeChallenge;

    let finalExperience = currentExperience + amount; 

    if (finalExperience >= experienceToNextLevel) {
      finalExperience= finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setactiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return(
    <ChallengesContext.Provider 
      value= {{level, 
      currentExperience,
      challengesCompleted,
      experienceToNextLevel,
      activeChallenge,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge
      
      }}>
      {children}
    </ChallengesContext.Provider>
  );
  
}