import React, { useState, useEffect } from "react";
import "../Wrraper.css";
import axios from "axios";

const Chat = ({ isLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async () => {
    try {

        // Check if the user is logged in before sending a message
        if (!isLoggedIn) {
          console.log("User not logged in. Cannot send message.");
          return;
        }

      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "http://localhost:10000/completions",

        {
          model: "gpt-3.5-turbo", // Model name as per your backend requirement
          messages: [
            {
              role: "system",
              content: inputMessage,
            },
          ],
          username: username,
          email: email,
        }
      );
      const botResponse = JSON.stringify(response.data.reply);
      // console.log(botResponse);
      // Prepare the data to send to the backend for storage
      const chatData = {
        query: inputMessage,
        response: botResponse,
        username: username,
        email: email,
      };
      // Send the chat data to the backend for storage
      localStorage.setItem("chatData", JSON.stringify(chatData));
      setMessages([
        ...messages,
        {
          text: `User:
           ${inputMessage}`,
          type: "user",
        },
        {
          text: `Chatbot:
           ${botResponse}`,
          type: "bot",
        },
      ]);
      setInputMessage("");
    } catch (error) {
      console.error("An Error occured:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  const handleSubmit = async () => {
    await sendMessage();
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-window-header default-theme-window-header">
          <div
            className="right-chat-window-header"
            id="chat-window-background2"
          >
            <p id="chatWindowHeaderText2" className="previewText">
              Welcome To REVE Chat
            </p>
            <div className="icons chat-close-button waiting-window-chat-close">
              <a href="#" className="tooltips">
                <i className="icon-Close-Chat-new"></i>
                <span>Close Chat</span>
              </a>
            </div>
            <div className="icons minimize_button">
              <a href="#" className="tooltips">
                <i className="icon-chevron-down"></i>
                <span>Minimize</span>
              </a>
            </div>
          </div>
          <div id="voice-panel-module">
            <div className="voice-call-div">
              <div className="agent-info-wrapper">
                <div className="agent-profile-img"></div>
                <div className="agent-profile-img-modern">
                  <div className="profile-img-content">
                    <div className="profile-img"></div>
                  </div>
                </div>
                <div className="agent-info-text">
                  <div className="agent-info-details">
                    <p className="support-agent-name">REVE Chatbot</p>
                    <span className="support-agent-designation">
                      Provelopers
                    </span>
                  </div>
                  <ul className="topbar-icon-list">
                    <li className="icons chat-close-button">
                      <a href="#" className="tooltips">
                        <i className="icon-Close-Chat-new"></i>
                        <span>Close Chat</span>
                      </a>
                    </li>
                    <li className="icons minimize_button">
                      <a href="#" className="tooltips">
                        <i className="icon-chevron-down"></i>
                        <span>Minimize</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="company-logo-img"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`} id="msg_text">
              {msg.text}
            </div>
          ))}
        </div>
        {/* Conditionally render the input field based on login status */}
      {isLoggedIn && (
        <div className="input-container">
          <textarea
            type="text"
            placeholder="Search"
            value={inputMessage}
            cols="40"
            rows="1.4"
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button onClick={handleSubmit} className="btnSubmit">
            Send
          </button>
        </div>
      )}
        {/* <div className="input-container">
          <textarea
            type="text"
            placeholder="Search"
            value={inputMessage}
            cols="40"
            rows="1.4"
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button onClick={handleSubmit} className="btnSubmit">
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Chat;
