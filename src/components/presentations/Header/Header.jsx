import { Outlet, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';

import { logOut } from '../../../services/firebase'

import styles from './Header.module.css'

export const navigates = [
  {
    id: 1,
    name: 'Main',
    to: '/'
  },
  {
    id: 2,
    name: 'Profile',
    to: '/profile'
  },
  {
    id: 3,
    name: 'Chat',
    to: '/chats'
  },
  {
    id: 4,
    name: 'About',
    to: '/about'
  },
  {
    id: 5,
    name: 'Articles',
    to: '/articles'
  },
  {
    id: 6,
    name: 'Gists',
    to: '/gists'
  },
  {
    id: 7,
    name: 'SignIn',
    to: '/signin'
  },
  {
    id: 8,
    name: 'SignUp',
    to: '/signup'
  },
]

export function Header() {
  const navigate = useNavigate()

  const name = useSelector((store) => store.profile.name)
  const isAuth = useSelector((store) => store.profile.isAuth)

  const handleLogin = () => {
    navigate('/signin')
  }
  const handleSignUp = () => {
    navigate('/signup')
  }
  const handleLogout = async () => {
    await logOut()
  }

  return (
    <>
      <header>
        <nav className={styles.header}>
          <p>{name}</p>
          <ul>
            {navigates.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.to}
                  style={({ isActive }) => ({
                    color: isActive ? 'white' : '#e3e7e7f3'
                    // #e3e7e7f3 #0be7e7
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.elements}>
            {!isAuth && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleLogin}
                  className={styles.login}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSignUp}
                  className={styles.logout}
                >
                  Sign up
                </Button>
              </>
            )}
            {isAuth && (
              <>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleLogout}
                  className={styles.logout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}