import * as React from 'react';
import {Tooltip, Avatar, Stack} from "@mui/material";

export default function CandidateList(prop) {
  let candidates = prop.candidates.map((candidate, index) =>
      <Tooltip title={candidate.name} key={index}>
        <Avatar alt={candidate.name} src={candidate.avatar} key={candidate.name} />
      </Tooltip>
  );

  return (
    <Stack direction="row" spacing={2}>
      { candidates }
    </Stack>
  );
}