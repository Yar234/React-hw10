import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addChat } from '../../../store/messages/actions';

import { push, set, remove } from 'firebase/database'
import { messagesRef, getChatById, getMessageListById } from '../../../services/firebase';

import styles from './ChatList.module.css'

export function ChatList({ messageDB, chats }) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addChat(value))
    setValue('')

    set(messagesRef, {
      ...messageDB,
      [value]: {
        name: value
      }
    })

    push(getMessageListById(value), {
      text: 'Chat has been created',
      author: 'Admin'
    })
  }

  const handleDeleteChat = (chatId) => {
    remove(getChatById(chatId))
  }

  return (
    <>
      <h1 className={styles.title}>ChatList</h1>
      <ul>
        {chats.map((chat) => (
          <li key={nanoid()}>
            <Link to={`/chats/${chat.name}`}>
              {chat.name}
            </Link>
            <IconButton
              type='submit'
              onClick={() => dispatch(handleDeleteChat(chat.name))}
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </li>
        ))}
      </ul>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <TextField fullWidth id="fullWidth"
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputRef={input => input?.focus()}
            noValidate
            autoComplete="off"
            placeholder='input chat'
            size="small"
          />
          <Button className={styles.button} type='submit' size="medium"
            variant="contained">
            Create Chat
          </Button>
        </div>
      </form>
    </>
  )
}