import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { signUp } from '../../services/firebase'

import styles from './SignUp.module.css'

export function SignUp() {
  const [inputs, setInputs] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(inputs.email, inputs.password)
      navigate('/signin')
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
        <h1>Sign Up</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor={inputs.email}>Email:</label>
          <TextField
            id={inputs.email}
            variant="outlined"
            size='medium'
            type="email"
            name="email"
            placeholder='Enter your email'
            value={inputs.email}
            onChange={(e) => setInputs((prev) =>
              ({ ...prev, [e.target.name]: e.target.value }))}
          />
          <label htmlFor={inputs.password}>Password</label>
          <TextField
            id={inputs.password}
            variant="outlined"
            size='medium'
            type="text"
            name="password"
            placeholder='Enter your password'
            value={inputs.password}
            onChange={(e) => setInputs((prev) =>
              ({ ...prev, [e.target.name]: e.target.value }))}
          />
          <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        </form>
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}