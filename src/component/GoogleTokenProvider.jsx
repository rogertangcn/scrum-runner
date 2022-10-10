import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import React, { useContext, createContext } from 'react';
import Button from '@mui/material/Button';

const GoogleTokenContext = createContext(undefined);

export function useGoogleToken() {
  const context = useContext(GoogleTokenContext);
  if (context === undefined) {
    throw new Error('useGoogleToken must be used within a GoogleTokenProvider');
  }
  return context;
}

export function GoogleTokenProvider({ children }) {
  const [tokenResponse, setTokenResponse] = useState();

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      setTokenResponse(tokenResponse);
    },
    onError: errorResponse => {
      setTokenResponse(null);
      console.log(errorResponse);
    },
    scope: 'https://www.googleapis.com/auth/drive.file'
  });

  if (!tokenResponse) {
    return (
      <div className="App">
        <header className="App-header">
          <Button variant="contained" color="success" onClick={() => googleLogin()}>
            <b>Login with Okta Google Account 🚀</b>
          </Button>
        </header>
      </div>
    );
  }

  return (
    <GoogleTokenContext.Provider value={tokenResponse}>{children}</GoogleTokenContext.Provider>
  );
}
