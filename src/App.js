import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import Page from './component/Page';

import './App.css';

const queryClient = new QueryClient();

function Main() {
  const { isLoading, error, data } = useQuery(['appData'], () =>
    fetch('data.json',{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const teamMembers = data.filter(user => (user.team || []).includes("access-cert"));

  return (
    <Page candidates={teamMembers}/>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}