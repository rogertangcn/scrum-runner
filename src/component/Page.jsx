import * as React from 'react';

import Avatars from './CandidateList';
import Spinner from './Spinner';
import { useTeam } from './TeamProvider';

import Button from '@mui/material/Button';

export default function Page(props) {
  const Candidates = useTeam();
  const [candidate, setCandidate] = React.useState(null);

  const interval = 100; //in millisec
  let lastNum = -1;

  function selectCandidate(times) {
    let num = Math.floor(Math.random() * Candidates.length);
    setCandidate(Candidates[num]);

    if (times < 40) {
      setTimeout(selectCandidate, interval, times + 1);
    } else if (num === lastNum) {
      // ensure the last selected one is not selected in the next spin
      setTimeout(selectCandidate, interval, times + 1);
    } else {
      lastNum = num;
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
        <p><Spinner candidate={candidate}/></p>
        <Avatars candidates={Candidates}/>
        <p />
        <Button variant="contained" color="success" onClick={handleClick}>
          <b>Spin it up!</b>
        </Button>
      </header>
    </div>
  );
}