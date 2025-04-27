import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App.tsx';
import CharacterHome from './pages/CharacterHome.tsx';
import CharacterForm from './pages/CharacterForm.tsx';
import CharacterLogForm from './pages/CharacterLogForm.tsx';
import CharactersMenu from './pages/CharactersMenu.tsx';
import DMLogHome from './pages/DMLogHome.tsx';
import DMLogForm from './pages/DMLogForm.tsx';
import MagicItemForm from './pages/MagicItemForm.tsx';
import StoryAwardForm from './pages/StoryAwardForm.tsx';
import Home from './pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "characters",
        element: <CharactersMenu />,
      },
      {
        path: "characters/new",
        element: <CharacterForm />,
      },
      { 
        path: "characters/:characterId",
        element: <CharacterHome />,
      },
      {
        path: "characters/:characterId/edit",
        element: <CharacterForm />,
      },
      {
        path: "characters/:characterId/magic-items/new",
        element: <MagicItemForm />
      },
      {
        path: "characters/:characterId/magic-items/:magicItemId",
        element: <MagicItemForm />
      },
      {
        path: "characters/:characterId/magic-items/:magicItemId/edit",
        element: <MagicItemForm />
      },
      {
        path: "characters/:characterId/logs/new",
        element: <CharacterLogForm />
      },
      {
        path: "characters/:characterId/logs/:logId",
        element: <CharacterLogForm />
      },
      {
        path: "characters/:characterId/logs/:logId/edit",
        element: <CharacterLogForm />
      },
      {
        path: "characters/:characterId/story-awards/new",
        element: <StoryAwardForm />
      },
      {
        path: "characters/:characterId/story-awards/:storyAwardId",
        element: <StoryAwardForm />
      },
      {
        path: "characters/:characterId/story-awards/:storyAwardId/edit",
        element: <StoryAwardForm />
      },
      {
        path: "dm-logs",
        element: <DMLogHome />,
      },
      {
        path: "dm-logs/new",
        element: <DMLogForm />,
      },
      {
        path: "dm-logs/:logId",
        element: <DMLogForm />,
      },
      {
        path: "dm-logs/:logId/edit",
        element: <DMLogForm />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
