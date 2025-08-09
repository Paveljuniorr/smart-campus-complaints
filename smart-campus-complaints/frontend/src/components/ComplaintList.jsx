
import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function ComplaintList(){
  const [list, setList] = useState([]);
  const [email, setEmail] = useState('');
  useEffect(()=>{ fetchList(); }, []);
  async function fetchList(){
    const res = await API.get('/complaints', { params: { email } }).catch(()=>({data:[]}));
    setList(res.data || []);
  }
  return (
    <div>
      <input placeholder='Enter your email to filter' value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={fetchList}>Fetch</button>
      <div>
        {list.map(c=>(
          <div key={c._id} style={{border:'1px solid #ddd', padding:10, margin:10}}>
            <strong>{c.title}</strong> — {c.status}<br/>
            {c.description}<br/>
            <small>{c.email} · {new Date(c.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
