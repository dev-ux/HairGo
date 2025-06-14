import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Remplacez ces valeurs par vos propres valeurs de configuration Firebase
  apiKey: "AIzaSyBKq6OLlMrZ7F36xolZXVqrVbLTPpr6YJc",
  authDomain: "hairgo-3825b.firebaseapp.com",
  projectId: "hairgo-3825b",
  storageBucket: "hairgo-3825b.firebasestorage.app",
  messagingSenderId: "864045888299",
  appId: "1:864045888299:ios:57dacb4c73906c8fb90b6e"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
