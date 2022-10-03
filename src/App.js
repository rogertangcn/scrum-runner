import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";

import Page from './component/Page';
import ErrorPage from "./component/ErrorPage";
import './App.css';

const queryClient = new QueryClient();

function Main() {
  let { team } = useParams();
  team = team ?? "access-cert";

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

  const teamMembers = data.filter(user => (user.team || []).includes(team));
  return (
    <Page candidates={teamMembers}/>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/scrum-runner",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/scrum-runner/:team",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  );
}