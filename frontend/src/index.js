import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, BrowserRouter } from 'react-router-dom'
import { CharacterProvider, DungeonProvider, EnemyProvider, UserProvider } from './components/context/userContext'
import { DragProvider} from './components/context/dragContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DragProvider>
    <DungeonProvider>
      <CharacterProvider>
        <EnemyProvider>
          <UserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserProvider>
        </EnemyProvider>
      </CharacterProvider>
    </DungeonProvider>
  </DragProvider>
);

reportWebVitals();
