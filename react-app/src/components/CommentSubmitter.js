import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import UserContext from '../context/UserContext';
import '../styles/layout.css'

const CommentSubmitter = () => {
  const { user } = useContext(UserContext)
  const [comment, setComment] = useState([])
  const { vid } = useParams()
  const user_id = user.id

  const updateComment = (e) => {
    setComment(e.target.value)
  }

  const sendComment = async (e) => {
    e.preventDefault()
    const text = comment
    const res = await fetch(`/api/video/${vid}/comment`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        text,
      }),
    });
    if(res.ok){
      return await res.json()
    }
  }

  if(!user){
    return;
  }
  return (
    <div className='CommentSubmit'>
      <h3>{user.username}</h3>
      <form onSubmit={sendComment}>
        <input onChange={updateComment} type="text" name='text' className="form-control" />
      </form>
    </div>
  )
}

export default CommentSubmitter;