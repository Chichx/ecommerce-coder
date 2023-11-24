import App from "./App.jsx";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDU0O5x27P3m6vAq85BOKnpoRmCtOkuhkk",
  authDomain: "hallowed-air-323619.firebaseapp.com",
  projectId: "hallowed-air-323619",
  storageBucket: "hallowed-air-323619.appspot.com",
  messagingSenderId: "78489857887",
  appId: "1:78489857887:web:bf533f45c77744976750ea",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
