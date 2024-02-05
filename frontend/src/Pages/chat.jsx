import React, { useState, useEffect } from "react";
import "../Wrraper.css";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import UserStatus from "./UserStatus";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Enter key without Shift pressed, send message
      e.preventDefault(); // Prevents the default behavior of the Enter key
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const sendMessage = async () => {
    try {
    
      // Assuming the data is stored in localStorage as 'LogedUser'
      const storedData = localStorage.getItem("LogedUser");
      // Parse the stored string to an object
      const parsedResponse = JSON.parse(storedData);

      // Retrieve individual values
      const username = parsedResponse.username;
      const email = parsedResponse.email;
      const user_id = parsedResponse._id;
      const response = await axios.post("http://localhost:10000/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: inputMessage,
          },
        ],
        username: username,
        email: email,
        id: user_id,
      });
      // console.log(response);
      // Extract the bot response from the API response
      const botResponse = response.data.reply;
      console.log(botResponse);

      // Split the bot response into paragraphs
      const paragraphs = botResponse.split("\n");

      // Remove empty paragraphs
      const filteredParagraphs = paragraphs.filter(
        (paragraph) => paragraph.trim() !== ""
      );

      // Prepare the data to send to the backend for storage
      const chatData = {
        query: inputMessage,
        response: botResponse,
        username: username,
        id: user_id,
        email: email,
      };

      // Send the chat data to the backend for storage
      localStorage.setItem("chatData", JSON.stringify(chatData));

      // Create a new array of message objects
      const botMessages = [
        {
          text: `${inputMessage}`,
          type: "user",
        },
        {
          text:
            filteredParagraphs.length > 0 ? (
              <>
                <div className="paragraph-div">{filteredParagraphs[0]} </div>
                {filteredParagraphs.slice(1).map((paragraph, index) => (
                  <div key={index} className="paragraph-div">
                    {paragraph}
                  </div>
                ))}
              </>
            ) : (
              // Handle the case where there is no bot response
              "No response from the bot."
            ),
          type: "bot",
        },
      ];

      // Update the messages state with the new messages
      setMessages([...messages, ...botMessages]);

      setInputMessage("");
    } catch (error) {
      console.error("An Error occurred:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  const handleSubmit = async () => {
    await sendMessage();
  };

  const calculateRowCount = () => {
    const lineHeight = 20; // Adjust this based on your textarea's line-height
    const minRows = 1;
    const maxRows = 4;

    const textareaRows = Math.min(
      maxRows,
      Math.max(minRows, Math.ceil(inputMessage.length / 30))
    ); // Adjust the character count as needed

    return textareaRows;
  };

  return (
    <div>
      <div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`} id="msg_text">
              {msg.type === "user" ? (
                <strong>User:</strong>
              ) : (
                <strong>ChatBot:</strong>
              )}
              <br />
              {msg.text}
            </div>
          ))}
        </div>
        {/* Conditionally render the input field based on login status */} 
          <div className="input-container">
            <textarea
              className="Chat_textArea"
              type="text"
              placeholder="Search"
              value={inputMessage}
              rows={calculateRowCount()}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit} className="btnSubmit">
              <FaArrowUp />
            </button>
          </div>
       
      </div>
    </div>
  );
};

export default Chat;
