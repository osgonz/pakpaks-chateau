import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App.tsx';
import CharacterHome from './pages/CharacterHome.tsx';
import CharacterLogForm from './pages/CharacterLogForm.tsx';
import Home from './pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { 
        path: "characters/:characterId",
        element: <CharacterHome />,
      },
      {
        path: "characters/:characterId/logs/new",
        element: <CharacterLogForm />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
