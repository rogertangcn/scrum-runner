import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function CandidateList(prop) {
  let candidates = prop.candidates.map(candidate => <Avatar alt={candidate.name} src={candidate.avatar} key={candidate.name} />);
  return (
    <Stack direction="row" spacing={2}>
      { candidates }
    </Stack>
  );
}