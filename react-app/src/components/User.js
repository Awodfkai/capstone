import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FollowButton from "../components/FollowButton"
import '../styles/layout.css'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1>{user.username}</h1>
      <ul>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <div className='user-followButton'>
        <FollowButton target_id={user.id} />
      </div>
    </>
  );
}
export default User;
