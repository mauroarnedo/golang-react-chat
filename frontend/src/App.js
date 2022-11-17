import React from 'react';
import { connect, sendMsg } from './api';
import ChatHistory from './Components/ChatHistory/ChatHistory';
import ChatInput from './Components/ChatInput/ChatInput';
import Header from './Components/Header/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [ chat, setChat ] = React.useState([]);
  const [ name, setName ] = React.useState('');
  const usernameRef = React.useRef(null);

  const handlerSetUsername = () => {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }

    setName(value);

    localStorage.setItem("name", value);
  }

  React.useEffect(() => {
    if (!usernameRef) {
      usernameRef.current.value = localStorage.getItem('name') || "";
    }
    connect((msg) => {
      setChat(chat.concat(msg))
    })

  }, [ chat ])

  const ChangeUsername = () => {
    return (
      <div className='d-flex align-items-center'>
        <input className='me-3 form-control' placeholder="Username" ref={usernameRef} />
        <button className="btn btn-info" onClick={handlerSetUsername}>
          Enter
        </button>
      </div>
    )
  }

  const send = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      const msg = e.target.value;
      const obj = { name: name, body: msg }
      sendMsg(JSON.stringify(obj))
      e.target.value = "";
    }
  }

  return (
    <div>
      {!name && (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
          <ChangeUsername />
        </div>
      )}
      {name &&
        <div>
          <Header ChangeUsername={ChangeUsername} />
          <div className="">
            <ChatHistory chat={chat} />
            <ChatInput send={send} />
          </div>
        </div>}
    </div>
  )
}

export default App;
