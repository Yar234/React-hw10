import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { signIn } from '../../services/firebase';
import { auth } from '../../store/profile/actions';

import styles from './SignIn.module.css'

export function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [inputs, setInputs] = useState({ login: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(inputs.email, inputs.password)
      dispatch(auth(true))
      navigate('/chats')
    } catch (error) {
      setError(error.message)
      setInputs({ email: '', password: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor={inputs.email}>Email:</label>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size='medium'
            type="text"
            name="email"
            value={inputs.email}
            onChange={(e) => setInputs((prev) =>
              ({ ...prev, [e.target.name]: e.target.value }))}
          />
          <label htmlFor="outlined-adornment-password">Password:</label>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              size='medium'
              name="password"
              value={inputs.password}
              onChange={(e) => setInputs((prev) =>
                ({ ...prev, [e.target.name]: e.target.value }))}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>Sign In</Button>
        </form>
      </Box>
      {
        loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )
      }
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}