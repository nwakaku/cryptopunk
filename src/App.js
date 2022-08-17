import './App.css';
import shape from './images/shape.png'
import Nav from './utils/Nav';
import { useState } from 'react';
import Body from './utils/Body';


function App() {
  const [animate, setAnimate] = useState(false);
  const [navv, setNavv] = useState(false);

  return (
    <div className="App">
      <main>
      <div className={`big-wrapper ${ animate ? ' light' : ' dark'} ${navv ? ' active' : null} `}>
        <img src={shape} alt="" className="shape" />

       <Nav navv = {navv} setNavv={setNavv}/>
       <Body animate={animate} setAnimate={setAnimate}/>

      </div>
    </main>
    </div>
  );
}

export default App;
