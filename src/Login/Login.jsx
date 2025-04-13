import React, { useEffect } from 'react'
import styles from './Login.module.css';

import { useState } from 'react';
import { Link, Links, useNavigate } from 'react-router';
import App from '../App'
function Login() {
 
const navigate = useNavigate();
const [cred, setCred] = useState([]);
  // const cred = [
  //   {
  //     user: 'hari',
  //     pass: '1234'
  //   }
  // ];
  
    useEffect(() => {
      fetch('http://localhost:8000/api/data/')
        .then(response => response.json())
        .then(data => {
          setCred(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },[]);
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const log = () => {
    const isValid = cred.some(c => c.user === username && c.passw === password);
if (isValid) {
  setMessage('✅ Login successful!');
  navigate('/App');
} else if (username === "Mcet" && password === "mcet") {
  setMessage('✅ Login successful as Admin!');
  navigate('/App');}
 
    else {
      setMessage('❌ Invalid credentials');
    }
  };

  return (
    <>
      <div className={styles.log}>
        <div className={styles.head}>
          <h1>Login</h1>
        </div>
        <div className={styles.form}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder='Username' 
              onChange={(e) => setUsername(e.target.value)} 
            /><br />
            <input 
              type="password" 
              placeholder='Password' 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </form>
          <button  onClick={log}>Login</button>
          <br />
<label style={{ marginRight: '30px', paddingTop: '10px' }}>New User?</label>
          <Link style={{textDecoration:'none'}} to="/signup">Signup</Link>
        
    
          <p>{message}</p>

         <br/>
          <span>Default username & password : Mcet-mcet </span>
      
        </div>
      </div>
    </>
  );
};
export default Login;


