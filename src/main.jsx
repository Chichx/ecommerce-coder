import App from "./App.jsx";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase/firebaseData.jsx";

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
