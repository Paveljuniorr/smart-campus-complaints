
import React, { useState } from 'react';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

export default function App(){ 
  const [admin, setAdmin] = useState(!!localStorage.getItem('token'));
  return (
    <div style={{fontFamily: 'Arial, sans-serif', padding: 20}}>
      <h1>Campus Complaints</h1>
      <div style={{display:'flex', gap:20}}>
        <div style={{flex:1}}>
          <ComplaintForm />
        </div>
        <div style={{flex:1}}>
          <h3>View Your Complaints</h3>
          <ComplaintList />
        </div>
      </div>
      <hr />
      <div style={{marginTop:20}}>
        {!admin ? <Login onLogged={()=>setAdmin(true)} /> : <AdminDashboard />}
      </div>
    </div>
  );
}
