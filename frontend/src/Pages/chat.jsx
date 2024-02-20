import React, { useState, useEffect, useRef } from "react";
import "../Wrraper.css";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import UserStatus from "./UserStatus";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const chatContainerRef = useRef();

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // sendMessage(inputMessage);
      handleSubmit();
      setInputMessage("");
    }
  };

  const sendMessage = async () => {
    try {
      setIsLoading(true);

      const storedData = localStorage.getItem("LogedUser");
      const parsedResponse = JSON.parse(storedData);
      const username = parsedResponse.username;
      const email = parsedResponse.email;
      const user_id = parsedResponse._id;

      const response = await axios.post(
        "https://be93-2400-adc5-10a-e400-ec1b-fb69-e147-1d4c.ngrok-free.app/completions",

        {
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
        }
      );

      const botResponse = response.data.reply;

      const paragraphs = botResponse.split("\n");
      const filteredParagraphs = paragraphs.filter(
        (paragraph) => paragraph.trim() !== ""
      );

      const chatData = {
        query: inputMessage,
        response: botResponse,
        username: username,
        id: user_id,
        email: email,
      };

      localStorage.setItem("chatData", JSON.stringify(chatData));

      const botMessages = [
        {
          text: inputMessage,
          type: "user",
        },
        {
          text:
            filteredParagraphs.length > 0 ? (
              <>
                {filteredParagraphs.map((paragraph, index) => (
                  <div key={index} className="paragraph-div">
                    {paragraph}
                  </div>
                ))}
              </>
            ) : (
              "No response from the bot."
            ),
          type: "bot",
        },
      ];

      setMessages([...messages, ...botMessages]);
    } catch (error) {
      console.error("An Error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    setButtonDisabled(e.target.value.trim() === '');
  };

  const handleSubmit = async () => {
    try {
      if (inputMessage.trim() === "") {
        return;
      }

      const storedData = localStorage.getItem("LogedUser");
      const parsedResponse = JSON.parse(storedData);
      const userMessage = [
        {
          text: inputMessage,
          type: "user",
        },
      ];

      setMessages([...messages, ...userMessage]);
      setInputMessage("");
      await sendMessage(); 
    } catch (error) {
      console.error("An Error occurred:", error);
    }
  };

  const calculateRowCount = () => {
    const lineHeight = 20;
    const minRows = 1;
    const maxRows = 4;

    const textareaRows = Math.min(
      maxRows,
      Math.max(minRows, Math.ceil(inputMessage.length / 30))
    );

    return textareaRows;
  };

  return (
    <div>
      <div ref={chatContainerRef} className="messages-container">
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
          {isLoading && (
            <div className="message bot">
              <div className="paragraph-div">
                <img src="images/load-32_128.gif"  width={15} height={20}/>
              </div>
            </div>
          )}
        </div>
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
          <button onClick={handleSubmit}
           className="btnSubmit"
           disabled={buttonDisabled}
           >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;


