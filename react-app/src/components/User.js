import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FollowButton from "../components/FollowButton"
import '../styles/layout.css'
import UserVideoFeed from "./UserVideoFeed";

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      const followersJson = await fetch(`/api/follow/${userId}/followers`);
      const followers = await followersJson.json();
      setFollowers(followers.length)
      const followingJson = await fetch(`/api/follow/${userId}/follows`);
      const following = await followingJson.json();
      setFollowing(following.length)

    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  function renderUserVideoFeed(id){
    if(id){
      console.log(id)
      return(
        <UserVideoFeed user_id={id} />
      )
    }else{
      return
    }
  }

  return (
    <>
      <div className='user-header'>
        <h1>{user.username}</h1>
        <FollowButton target_id={user.id} />
      </div>
      <div className='user-email'>
        <strong>Email: </strong> {user.email}
      </div>
      <ul className='user-details'>
        <div>
          <strong>Followers: </strong> {followers}
        </div>
        <div>
          <strong>Following: </strong> {following}
        </div>
      </ul>
      <h3>Videos</h3>
      {renderUserVideoFeed(user.id)}
    </>
  );
}
export default User;
