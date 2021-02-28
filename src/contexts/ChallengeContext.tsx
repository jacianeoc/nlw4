import {createContext, useState,ReactNode} from 'react';
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

  function levelUp() {
    setLevel(level+1);
  }

  function startNewChallenge() {
    const randowChallengeIndex= Math.floor(Math.random()*challenges.length)
    const challenge = challenges[randowChallengeIndex];

    setactiveChallenge(challenge);
  }
  function resetChallenge() {
    setactiveChallenge(null);
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
      resetChallenge
      
      }}>
      {children}
    </ChallengesContext.Provider>
  );
  
}