import {createContext, useState,ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenge.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
  closeLevelUpModal: () => void;
}

//fazendo a tipagem 
interface ChallengesProviderProps{
  children:ReactNode;
  level: number,
  currentExperience : number,
  challengesCompleted : number

}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}:ChallengesProviderProps ) {
  const [level, setLevel] = useState(rest.level ?? 1);//se o rest não exitir, vai ser 1
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setactiveChallenge] = useState(null);

  const[isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

  const experienceToNextLevel= Math.pow((level+1)*4, 2);
  //quando o segundo paramentro do use effect for vazio
  //quer dizer que ele vai executar uma unica vez a função quando
  //o componente for exibido em tela 
  //pedindo permissão para receber notificação 
  useEffect(() => {
    Notification.requestPermission();
  
  }, []) 

  // usando a biblioteca js-cookie -> dá uma api mais amigavel
  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  
  }, [level, currentExperience, challengesCompleted]) 

  function levelUp() {
    setLevel(level + 1);
    setisLevelUpModalOpen(true);
  }
  
  function closeLevelUpModal() {
    setisLevelUpModalOpen(false);
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
      completeChallenge,
      closeLevelUpModal
      
      }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal/> }
      
    </ChallengesContext.Provider>
  );
  
}