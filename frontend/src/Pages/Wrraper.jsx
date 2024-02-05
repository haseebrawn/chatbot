import React, { useState } from 'react';
import Chat from './chat';
import '../Wrraper.css';
import Login from './login';

const WrapperComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Your authentication logic here
    console.log('Logging in...');
    setIsLoggedIn(true);

    console.log('Logged in successfully.');
  };

  return (
    <div className="wrapper">
      {!isLoggedIn && (
        <div className="login-container"  >
        <Login handleLogin={handleLogin}/>
        </div>
      )}
      {/* <div className="chat-container"> */}
        <Chat isLoggedIn={isLoggedIn}/>
      {/* </div> */}
    </div>
  );
};

export default WrapperComponent;
