import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Page from './component/Page';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TeamProvider } from './component/TeamProvider';
import { GoogleTokenProvider } from './component/GoogleTokenProvider';
import './App.css';

const queryClient = new QueryClient();

const GAPI_CLIENT_ID = "394003123742-2chg6ap79srfciv8pb6cc17lks5uiebd.apps.googleusercontent.com";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GAPI_CLIENT_ID}>
      <GoogleTokenProvider>
        <QueryClientProvider client={queryClient}>
          <TeamProvider >
            <Page />
          </TeamProvider>
        </QueryClientProvider>
      </GoogleTokenProvider>
    </GoogleOAuthProvider>
  );
}