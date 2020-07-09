import React from 'react';

import { GlobalStyles, ThemeProvider } from '@mott-macdonald/smi-react-ui-kit';

import { Header } from '../Header';
import { Welcome } from '../Welcome';
import { ResizablePanel } from '../ResizablePanel';

import './App.scss';

const App = () => (
  <ThemeProvider>
    <>
      <GlobalStyles />
      <div className="App">
        <Header />
        <div className="App-Body">
          <Welcome />
          <ResizablePanel />
        </div>
      </div>
    </>
  </ThemeProvider>
);

export default App;

