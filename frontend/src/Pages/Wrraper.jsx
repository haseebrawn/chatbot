import React, { useState } from 'react';
import Chat from './chat';
import '../Wrraper.css';
import Login from './login';
import Header from './Header';
import '../App.css';

const WrapperComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Your authentication logic here
    console.log('Logging in...');
    setIsLoggedIn(true);

    console.log('Logged in successfully.');
  };

  return (

    <>
      <Header isLoggedIn={isLoggedIn}/>
  
    
    <div className="wrapper">

    {!isLoggedIn ? (
      <div className="login-container">
        <Login handleLogin={handleLogin} />
      </div>
    ) : (
      <div className="chat-container">
        <Chat/>
      </div>
    )}
  </div>
  </>

  );
};

export default WrapperComponent;
