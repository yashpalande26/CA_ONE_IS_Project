import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';



function App(){
  return(
    <>
      <Navbar/>
      <h2>Welcome to our Furniture Shop</h2>
      <Footer/>
    </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
