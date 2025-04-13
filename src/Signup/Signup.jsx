import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const log = () => {
    fetch('http://localhost:8000/api/data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: username,   
        passw: password  
      })
    })
      .then(response => {
        if (response.ok) {
          setMessage('✅ Signup successful!');
          setUsername('');
          setPassword('');
          navigate('/App'); 
        } else {
          setMessage('❌ Signup failed!');
        }
        return response.json();
      })
      .then(data => {
        console.log('Server response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('❌ Server error');
      });
  };

  return (
    <div className={styles.log}>
      <div className={styles.head}>
        <h1>Signup</h1>
      </div>
      <div className={styles.form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          /><br />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </form>
        <button onClick={log}>SignUP</button>
        <br />
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Signup;
