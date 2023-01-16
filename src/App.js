import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import { defaultContext, ThemeContext } from './utils/ThemeContext'
import { persistor } from './store'
import { auth } from './store/profile/actions'
import { firebaseAuth, messagesRef } from './services/firebase'
import { onValue } from "firebase/database";

import { Header } from './components/presentations/Header/Header'
import { MainPage } from './pages/MainPage/MainPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { AboutWithConnect } from './pages/AboutPage/AboutPage'
import { ChatsPage } from './pages/ChatsPage/ChatsPage'
import { ChatList } from './components/containers/ChatList/ChatList'
import { Articles } from './pages/Articles/Articles'
import { GistsList } from './pages/Gists/Gists'
import { SignIn } from './pages/SignIn/SignIn'
import { SignUp } from './pages/SignUp/SignUp'
import { PrivateRoute } from './utils/PrivateRoute'
import { PublicRoute } from './utils/PublicRoute'

import './App.css'

export function App() {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState(defaultContext.theme)
  const [messageDB, setMessageDB] = useState({})
  const [chats, setChats] = useState([])
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(auth(true))
      } else {
        dispatch(auth(false))
      }
    })
    return unsubscribe
  })

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()

      const newChats = Object.entries(data).map((item) => ({
        name: item[0],
        messages: item[1].messageList
      }))

      setMessageDB(data)
      setChats(newChats)
    })
  }, [])

  return (
    <>
      <PersistGate persistor={persistor}>
        <ThemeContext.Provider value={{
          theme,
          toggleTheme
        }}>
          <Routes>
            <Route path='/' element={<Header />}>
              <Route index element={<MainPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="about" element={<AboutWithConnect />} />
              <Route path="chats" element={<PrivateRoute />}>
                <Route
                  index
                  element={<ChatList chats={chats} messageDB={messageDB} />}
                />
                <Route
                  path=":chatId"
                  element={<ChatsPage chats={chats} messageDB={messageDB} />}
                />
              </Route>
              <Route path="articles" element={<Articles />} />
              <Route path="gists" element={<GistsList />} />
              <Route path="signin" element={<PublicRoute component={<SignIn />} />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            <Route path="*" element={<h2>404 Page not FOUND</h2>} />
          </Routes>
        </ThemeContext.Provider>
      </PersistGate>
    </>
  )
}