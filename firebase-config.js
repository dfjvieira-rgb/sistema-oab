// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB" + "..." , // Pegue sua chave API (Web API Key) no Console do Firebase > Configurações do Projeto
  authDomain: "masteroab-db5e1.firebaseapp.com",
  databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com",
  projectId: "masteroab-db5e1",
  storageBucket: "masteroab-db5e1.appspot.com",
  messagingSenderId: "620234160245",
  appId: "1:620234160245:web:..." // Pegue seu AppId no Console do Firebase
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco de dados (Realtime Database)
export const db = getDatabase(app);
