import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [message, setMessage] = useState("Chargement...");

  useEffect(() => {
    // Appel à ton serveur backend
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Erreur de connexion au serveur 😢"));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Test communication Front ↔ Back</h1>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default App;
