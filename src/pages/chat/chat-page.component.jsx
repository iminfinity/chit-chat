import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.utils";
import { db } from "../../firebase/firebase.utils";

import "./chat-page.styles.scss";
const Chat = () => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getCurrentUser() {
      let currentUser = await auth().currentUser;
      setUser(currentUser);
      setEmail(currentUser.email);
    }

    getCurrentUser();
  }, [user]);

  useEffect(() => {
    setReadError(null);
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chatAll = [];
        snapshot.forEach((snap) => {
          chatAll.push(snap.val());
        });
        setChats(chatAll);
      });
    } catch (error) {
      setReadError({ readError: error.message });
      console.log("Read Error:", readError);
    }
  }, [readError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWriteError(null);
    try {
      await db.ref("chats").push({
        message,
        timestamp: Date.now(),
        uid: user.uid,
        email,
      });
      setMessage("");
    } catch (error) {
      setWriteError({ writeerror: error.message });
    }
  };

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };

  return (
    <div className="chat-page">
      <div className="chats">
        {chats.map((chat) => {
          return (
            <p key={chat.timestamp} className="message">
              {chat.message}
              <span> {chat.email}</span>
              <span>{formatTime(chat.timestamp)}</span>
            </p>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        ></input>
        {writeError ? <p>{writeError}</p> : null}
        <button type="submit">Send</button>
      </form>
      <div className="chat-bottom">
        Logged in as: <strong>{email}</strong>
      </div>
    </div>
  );
};
export default Chat;
