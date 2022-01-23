import * as React from 'react';

import Avatars from './component/CandidateList';
import Spinner from './component/Spinner';
import Candidates from './candidates.json';
import Button from '@mui/material/Button';

import './App.css';

function App() {
  const [candidate, setCandidate] = React.useState(null); 

  const interval = 100; //in millisec

  function selectCandidate(times) {
    let min = 0, max = Candidates.length - 1;
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    setCandidate(Candidates[num]);

    if (times < 40) {
      setTimeout(selectCandidate, interval, times + 1);
    }
  }
  
  function handleClick(e) {
    e.preventDefault();
  
    setCandidate(null);
    
    setTimeout(selectCandidate, interval, 0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p><Spinner candidate={candidate} /></p>
        <Avatars candidates={Candidates} />
        <p>
          Edit <code>src/candidates.json</code> and reload
        </p>
        <Button variant="contained" color="success" onClick={handleClick}>
          <b>Spin it up!</b>
        </Button>
      </header>
    </div>
  );
}

export default App;
