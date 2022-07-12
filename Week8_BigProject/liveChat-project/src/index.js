import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store";

//firebase ayarları
const firebaseConfig = {
  apiKey: "AIzaSyAf4hX6aCYgtP-Q54AaJKgX7i6tu-epTvg",
  authDomain: "livechat-ba1a4.firebaseapp.com",
  projectId: "livechat-ba1a4",
  storageBucket: "livechat-ba1a4.appspot.com",
  messagingSenderId: "219724807706",
  appId: "1:219724807706:web:8e3768c057fbe47b759ba3",
  measurementId: "G-MQXTLDWRF4",
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
