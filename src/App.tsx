import './App.css';
import {useRef, useEffect, useState} from "react";
import { MarginProps, NodeMap } from './map';
import AboutPage from './About';
import Contact from './Contact';
import SignIn from './signin';
import axios from 'axios';
import LandingPage from './LandingPage';

function App() {
  const [showing, setShowing] = useState<string>('landing')
  const [articles, setArticles] = useState([])

  const margins: MarginProps = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
  }

  const setClassHeaderOptions = (e: string) => {
    if (e == showing) {
      return 'headerOptionsSelected'
    } else {
      return 'headerOptions'
    }
  }

  useEffect(() => {
    const fetchNews = async () => {

      try {
        const query = 'vancouver'
        const response = await fetch(
          `https://api.goperigon.com/v1/all?apiKey=${process.env.REACT_APP_GP_API_KEY}&content=${query}&sortBy=pubDate&page=10`
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data.articles)
        setArticles(data.articles);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="allContainer">
      {/* <div className='header'>
        <img className='logoImage' src={require('./assets/tracelogotransparent.png')}></img>
        <input className='headerSearchBox' placeholder='https://some-news-article' disabled={showing != 'home'}/>
        <text className={setClassHeaderOptions('home')} onClick={() => setShowing('home')}>Home</text>
        <text className={setClassHeaderOptions('about')} onClick={() => setShowing('about')}>About</text>
        <text className={setClassHeaderOptions('contact')} onClick={() => setShowing('contact')}>Contact</text>
        <text className={setClassHeaderOptions('signin')} onClick={() => setShowing('signin')}>Waitlist</text>
      </div> */}
      
        {showing == 'home' ? (
          <div className='traceCanvas'>
            <NodeMap width={500} height={500} margin={{top: 10, left: 10, right: 10, bottom: 10}} />
          </div>
        ) : showing == 'about' ? (
          <AboutPage />
        ) : showing == 'contact' ? (
          <Contact />
        ) :  showing == 'signin' ? (
          <SignIn />
        ) : showing == 'landing' ? (
          <LandingPage />
        ) : (null)
        }
    </div>
  );
}

export default App;
