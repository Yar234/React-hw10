import uuid from 'react-uuid';
import PropTypes from 'prop-types';

export function MessageList({ messages }) {

  return (
    <>
      <h1>MessageList</h1>
      <ul>
        {messages.map((message) => (
          <li key={uuid()}>
            {message.author} : {message.text}
          </li>
        ))}
      </ul>
    </>
  )
}

MessageList.propTypes = {
  messages: PropTypes.array
}