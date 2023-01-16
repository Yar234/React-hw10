import PropTypes from 'prop-types'
import { useState } from 'react'
import { AUTHOR } from '../../../constants'
import { addMessageWithReply } from '../../../store/messages/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { push } from 'firebase/database'
import { getMessageListById } from '../../../services/firebase';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import styles from './Form.module.css'

export function Form() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { chatId } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    //todo...
    if (text === '') {
      return
    } else {
      dispatch(addMessageWithReply(chatId, {
        author: AUTHOR.user,
        text
      }))
    }
    push(getMessageListById(chatId), {
      author: AUTHOR.user,
      text
    })

    setText('')
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <TextField fullWidth id="fullWidth"
            type='text'
            value={text}
            onChange={(event) => setText(event.target.value)}
            inputRef={input => input?.focus()}
            noValidate
            autoComplete="off"
            placeholder='input message'
            size="small"
          />
          <Button className={styles.button} type='submit' size="medium"
            variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </form>
    </>
  )
}

Form.propTypes = {
  addMessage: PropTypes.func
}