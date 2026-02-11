import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvide } from './Context/MetricsContext';
import { UIProvide } from './Context/Ui-Context';
import { Test_context_Provider } from './Context/Test-context';

const fontHref = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap";
const link = document.createElement("link");
link.href = fontHref;
link.rel = "stylesheet";
document.head.appendChild(link);

const style = document.createElement("style");
style.innerHTML = `* {font-family: "Inter", sans-serif !important;}`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <UserProvide>
    <UIProvide>
      <Test_context_Provider> <App /></Test_context_Provider>

    </UIProvide>
  </UserProvide>

);

reportWebVitals();
