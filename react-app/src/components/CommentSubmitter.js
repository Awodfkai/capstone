import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import UserContext from '../context/UserContext';
import '../styles/layout.css'

const CommentSubmitter = () => {
  const { user } = useContext(UserContext)
  const [comment, setComment] = useState([])
  const { vid } = useParams()

  const sendComment = async () => {
    const res = await fetch(`api/video/${vid}/comment`, {
      method: 'POST',
    })
    if(res.ok){
      
    }
  }

  if(!user){
    return;
  }
  return (
    <div className='CommentSubmit'>
      <h3>{user.username}</h3>
      <input onChange={setComment} type="text" name='text' className="form-control" />
    </div>
  )
}

export default CommentSubmitter;