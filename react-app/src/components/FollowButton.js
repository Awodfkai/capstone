import React, { useState, useContext, useEffect } from "react";
import UserContext from '../context/UserContext'

export default function FollowButton(target) {
  const { user } = useContext(UserContext)
  const [text, setText] = useState('Follow')
  let target_id = target.target_id

  useEffect(() => {
    console.log(target)
    async function fetchFollow(target_id) {
      const res = await fetch(`/api/follow/${user.id}/${target_id}/get`)
      if (res.ok) {
        const followStatus = await res.json()
        console.log('followStatus: ', followStatus)
        setText(followStatus)
      }
    }
    if(target_id){
      fetchFollow(target_id)
    }
    
  }, [target_id])

  const onUpdate = async (e) => {
    e.preventDefault()
    const followed = await followUser(target_id, user.id)
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
    // const res = await fetch(`/api/follow`, {
    //   method: action,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user_id,
    //     target_id,
    //   }),
    // });
  }

  const renderErrors = (errors) => {
    if (errors) {
      return errors.map(error => {
        console.log(error)
        return <div className='material-error'>{error}</div>
      })
    }
  }

  if (!user) return null;
  return (
    <button onClick={onUpdate}>{text}</button>
  )
}