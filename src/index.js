import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Import bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
// Import Axios
import axios from 'axios';
import { RecoilRoot } from 'recoil';

// Base url default backend
axios.defaults.baseURL = "http://localhost:8085/api/"
// Global config Axios untuk Authorisasi Bearer Token
axios.interceptors.request.use((config) => {
  // Masukkan token ke header untuk authorisasi yang di ambil token dari localStorage browser
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  // Return config
  return config
})

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
