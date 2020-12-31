import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext';
import '../styles/layout.css'

const FollowedVideoFeed = () => {
  const { user } = useContext(UserContext)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(`/api/video/${user.id}/following`)
      if (res.ok) {
        const resVids = await res.json()
        console.log('fetched followvideos: ', resVids)
        setVideos(resVids)
        return resVids
      }
    }
    if(user.id){
      fetchVideos();
    }
  }, [user])

  const renderList = (list) => {
    if (list) {
      return list.map(item => {
        return (
          <Link style={{ textDecoration: 'none' }} to={`/videos/${item.id}`} key={item.id} >
            <div className='VideoFeed-member'>
              <h3>
                {item.title}
              </h3>
              <p>
                {item.description}
              </p>
              <div>
                Views: {item.views}
              </div>
              <div>
                User: {item.user_id}
              </div>
            </div>
          </Link>
        )
      })
    }
  }


  return (
    <>
      <h1>Following</h1>
      <div>
        {renderList(videos)}
      </div>
    </>
  )
}

export default FollowedVideoFeed;