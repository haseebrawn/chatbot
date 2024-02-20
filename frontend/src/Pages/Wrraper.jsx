import React, { useState } from "react";
import Chat from "./chat";
import "../Wrraper.css";
import Login from "./login";
import Header from "./Header";
import "../App.css";
import { Container } from "@mui/material";
import { CCol, CContainer, CRow } from "@coreui/react";

const WrapperComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Your authentication logic here
    console.log("Logging in...");
    setIsLoggedIn(true);

    console.log("Logged in successfully.");
  };

  return (
    <CContainer>
    
        <CRow>
          <CCol xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <Header isLoggedIn={isLoggedIn} />
          </CCol>
          <CCol xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <div className="wrapper">
              {!isLoggedIn ? (
                <div className="login-container">
                  <Login handleLogin={handleLogin} />
                </div>
              ) : (
                 <CCol xs={12}  lg={12}>
                 <div className="chat-container">
                  <Chat />
                </div>
                 </CCol>
                 
              )}
            </div>
          </CCol>
        </CRow>
  </CContainer>
  );
};

export default WrapperComponent;
