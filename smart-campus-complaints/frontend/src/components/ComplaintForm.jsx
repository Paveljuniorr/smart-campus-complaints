
import React, { useState } from 'react';
import API from '../services/api';

export default function ComplaintForm(){
  const [form, setForm] = useState({ title:'', description:'', category:'Electrical', email:'' });
  async function submit(){
    await API.post('/complaints', form);
    alert('Submitted!');
    setForm({ title:'', description:'', category:'Electrical', email:'' });
  }
  return (
    <div>
      <h2>Submit a Complaint</h2>
      <input placeholder='Title' value={form.title} onChange={e=>setForm({...form, title:e.target.value})} /><br/>
      <textarea placeholder='Description' value={form.description} onChange={e=>setForm({...form, description:e.target.value})}></textarea><br/>
      <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
        <option>Electrical</option>
        <option>Internet</option>
        <option>Furniture</option>
        <option>Other</option>
      </select><br/>
      <input placeholder='Your email' value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /><br/>
      <button onClick={submit}>Submit</button>
    </div>
  )
}
