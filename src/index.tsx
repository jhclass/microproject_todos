import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/App.css'
import App from './App';
import {RecoilRoot} from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';



ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
      
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

