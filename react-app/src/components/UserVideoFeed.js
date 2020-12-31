import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../styles/layout.css'

const UserVideoFeed = (user) => {
  const [videos, setVideos] = useState([])
  const user_id = user.user_id

  useEffect(() => {
    async function fetchVideos(id) {
      console.log('id??: ', id)
      const res = await fetch(`/api/video/user/${id}`)
      if (res.ok) {
        const resVids = await res.json()
        setVideos(resVids)
        return resVids
      }
    }
    if (user_id) {
      fetchVideos(user_id);
    }
  }, [user_id])

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
            </div>
          </Link>
        )
      })
    }
  }


  return (
    <>
      <div>
        {renderList(videos)}
      </div>
    </>
  )
}

export default UserVideoFeed;