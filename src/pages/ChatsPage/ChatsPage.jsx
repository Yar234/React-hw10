import { useParams, Navigate } from 'react-router-dom'

import { Form } from '../../components/containers/Form/Form'
import { MessageList } from '../../components/presentations/MessageList/MessageList'
import { ChatList } from '../../components/containers/ChatList/ChatList'

import { WithClasses } from '../../HOC/WithClasses'
import { useSelector } from 'react-redux'
import { selectMessage } from '../../store/messages/selectors'

import styles from './ChatsPage.module.css'

export function ChatsPage({ chats, messageDB }) {
  const { chatId } = useParams()
  const messages = useSelector(selectMessage)

  const MessagesListWithClass = WithClasses(MessageList)

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />
  }

  return (
    <>
      <div className={styles.center}>
        <h1>Welcome to chat!</h1>
        <ChatList chats={chats} messageDB={messageDB} />
        <MessagesListWithClass
          messages={chatId ? messages[chatId] : []}
          classes={styles.border} />
        <Form />
      </div>
    </>
  )
}