import React from 'react';
import { GlobalStyle } from './AppStyle';
import Router from "./routes/Router";


function App() {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
}

export default App;
