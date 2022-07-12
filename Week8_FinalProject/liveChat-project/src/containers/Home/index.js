import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateMessage, getConversations } from "../../actions";

const User = (props) => {
  //userlistesi
  const { user, onClick, isSelected } = props;
  
  return (
    <div
      style={{
        backgroundColor: isSelected ? "#fff" : "#19A4F9",
      }}
      onClick={() => onClick(user)}
      className="displayName"
    >
      <div className="displayPic">
        <img
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "white",
          }}
          src="https://firebasestorage.googleapis.com/v0/b/livechat-ba1a4.appspot.com/o/person-512.webp?alt=media&token=68f0d13a-09fb-4f63-89ef-d742720aab0d"
          alt="user"
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <span style={{ fontWeight: 500, color: isSelected ? "#000" : "#fff" }}>
          {user.firstName} {user.lastName}
        </span>
        <span
          className={user.isOnline ? `onlineStatus` : `onlineStatus off`}
        ></span>
      </div>
    </div>
  );
};

const HomePage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {
    unsubscribe = dispatch(getUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);

  const initChat = (user) => {
    //chat başlatılıyor
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);

    console.log(user);

    dispatch(getConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };

  const submitMessage = (e) => {
    //mesaj gönder
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage("");
      });
    }

    //console.log(msgObj);
  };

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {user.users.length > 0
            ? user.users.map((user) => {
                return (
                  <User
                    isSelected={
                      chatUser === `${user.firstName} ${user.lastName}`
                    }
                    onClick={initChat}
                    key={user.uid}
                    user={user}
                  />
                );
              })
            : null}
        </div>

        <div className="chatArea">
          <div className="chatHeader">
            {chatStarted ? chatUser : "Select a user to start a chat"}
          </div>
          <div className="messageSections">
            {chatStarted
              ? user.conversations.map((con) => (
                  <div
                    key={con.user_uid_1}
                    style={{
                      width: "100%",
                      color: "#000",
                      textAlign: con.user_uid_1 === auth.uid ? "right" : "left",
                    }}
                  >
                    <p className="messageStyle">{con.message}</p>
                  </div>
                ))
              : null}
          </div>
          {chatStarted ? (
            <div className="chatControls">
              <textarea
                className="messageInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write Message"
              />
              <button className="btn btn-primary" onClick={submitMessage}>
                Send
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
