import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import SimpleStorage from './SimpleStorage'
// import { Web3ReactProvider } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";

// function getLibrary(provider) {
//   const library = new Web3Provider(provider, "any");
//   return library;
// }
//const getLibrary = (provider) => new Web3Provider(provider);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    // <SimpleStorage/>
  //</Web3ReactProvider>
);

