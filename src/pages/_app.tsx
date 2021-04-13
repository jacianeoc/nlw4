
import '../styles/global.css';
import {ChallengesProvider, ChallengesContext} from '../contexts/ChallengeContext'
import { useState } from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
  return (
          <Component {...pageProps} />  
  );
}

export default MyApp
