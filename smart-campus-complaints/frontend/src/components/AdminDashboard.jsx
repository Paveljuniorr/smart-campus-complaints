
import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function AdminDashboard(){
  const [list, setList] = useState([]);
  const [stats, setStats] = useState(null);
  useEffect(()=>{ fetchAll(); fetchStats(); }, []);
  async function fetchAll(){ const res = await API.get('/complaints'); setList(res.data); }
  async function fetchStats(){ const res = await API.get('/complaints/stats/summary'); setStats(res.data); }
  async function updateStatus(id, status){ await API.put(`/complaints/${id}`, { status }); fetchAll(); }
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {stats && <div>Total: {stats.total} · Pending: {stats.pending} · Resolved: {stats.resolved}</div>}
      {list.map(c=> (
        <div key={c._id} style={{border:'1px solid #ccc', padding:10, margin:10}}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <small>{c.email} · {new Date(c.createdAt).toLocaleString()}</small>
          <div>
            <button onClick={()=>updateStatus(c._id, 'In Progress')}>In Progress</button>
            <button onClick={()=>updateStatus(c._id, 'Resolved')}>Resolved</button>
          </div>
        </div>
      ))}
    </div>
  )
}
