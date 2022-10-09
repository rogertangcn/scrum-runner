import { useQuery } from '@tanstack/react-query';
import React, { useContext, createContext } from 'react';
import { useGoogleToken } from './GoogleTokenProvider';

const TeamContext = createContext(undefined);

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}

const DATA_FILE = 'https://www.googleapis.com/drive/v3/files/12JOoJeSMQeOkjAVvBqpjS9hAsrnKeiCo?alt=media';

export function TeamProvider({ children }) {
  let token = useGoogleToken();

  // NOTE: github react app hosting doesn't support client-side. Have to use query param
  // https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
  let tag = new URLSearchParams(window.location.search).get('tag') || "ac";

  const { isLoading, error, data } = useQuery(['appData'], () =>
    fetch(DATA_FILE,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.access_token}`
      }
    }).then(
      res => res.json()
    )
  )

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const contextValue = data.filter(user => (user.tags || []).includes(tag));

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  );
}
