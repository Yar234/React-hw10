import { useContext, useState } from 'react'
import { ThemeContext } from '../../utils/ThemeContext'
import { connect } from 'react-redux'
import { changeName, toggleProfile } from '../../store/profile/actions'

import styles from './AboutPage.module.css'

export function AboutPage(props) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [value, setValue] = useState('')

  return (
    <div className={styles.center}>
      <h1 className={styles.title}>About Page</h1>
      <p>{theme === 'light' ? '🌞' : '🌙'}</p>
      <button onClick={toggleTheme}>Change theme</button>
      <hr className={styles.line} />
      <h2>{props.name}</h2>
      <input type="checkbox" value={setValue} checked={props.visible} readOnly />
      <button onClick={() => props.toggle()} >change visible</button>
      <br />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => props.changeName(value)}>Change name</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  name: state.profile.name,
  visible: state.profile.visible
})

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(toggleProfile()),
  changeName: value => dispatch(changeName(value))
})

export const AboutWithConnect = connect(mapStateToProps, mapDispatchToProps)(AboutPage)