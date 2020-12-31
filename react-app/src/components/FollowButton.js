import React, { useState, useContext, useEffect } from "react";
import UserContext from '../context/UserContext'

export default function FollowButton(target) {
  const { user } = useContext(UserContext)
  const [text, setText] = useState('Follow')
  let target_id = target.target_id

  useEffect(() => {
    async function fetchFollow(target_id) {
      const res = await fetch(`/api/follow/${user.id}/${target_id}/get`)
      if (res.ok) {
        const followStatus = await res.json()
        console.log('followStatus: ', followStatus.text)
        console.log('follow: ', followStatus.follow)
        setText(followStatus.text)
      }
    }
    if(target.target_id){
      fetchFollow(target_id)
    }
    
  }, [target, target_id, user])

  const onUpdate = async (e) => {
    e.preventDefault()
    followUser(target_id, user.id)
  }

  const followUser = async (target_id, user_id) => {
    console.log('target_id: ', target_id);
    console.log('user_id: ', user_id);
    let action = "POST";
    if(text === "Following") action = "DELETE";
    const res = await fetch(`/api/follow/${user_id}/${target_id}`,
    {
      method: action,
    })
    if(res.ok){
      const followStatus = await res.json()
      setText(followStatus)
    }
  }

  if (!user) return null;
  if (target_id == user.id) return null;
  return (
    <button className='followButton' onClick={onUpdate}>{text}</button>
  )
}