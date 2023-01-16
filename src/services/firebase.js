import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAzFZi9hR7offUYbR30KdN0XX9OU0MqBIU",
  authDomain: "application-react-dab16.firebaseapp.com",
  databaseURL: "https://application-react-dab16-default-rtdb.firebaseio.com",
  projectId: "application-react-dab16",
  storageBucket: "application-react-dab16.appspot.com",
  messagingSenderId: "1022880206639",
  appId: "1:1022880206639:web:d8a718e8f69257634a5bda"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)

export const signUp = async (email, password) => await createUserWithEmailAndPassword(firebaseAuth, email, password)

export const signIn = async (email, password) => await signInWithEmailAndPassword(firebaseAuth, email, password)

export const logOut = async () => await signOut(firebaseAuth)

const db = getDatabase(app)

export const userRef = ref(db, 'user')
export const messagesRef = ref(db, 'messages')

export const getChatById = (chatId) => ref(db, `messages/${chatId}`)

export const getMessageListById = (chatId) => ref(db, `messages/${chatId}/messageList`)