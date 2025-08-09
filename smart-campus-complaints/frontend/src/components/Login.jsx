
import React, { useState } from 'react';
import API from '../services/api';

export default function Login({ onLogged }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function doLogin(){
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    onLogged();
  }
  return (
    <div>
      <h3>Admin Login</h3>
      <input placeholder='admin email' value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder='password' type='password' value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button onClick={doLogin}>Login</button>
    </div>
  )
}
