import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import '../styles/layout.css'

const VideoFeed = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function fetchVideos(){
      const res = await fetch(`/api/video/`)
      if(res.ok){
        const resVids = await res.json()
        console.log('fetched videos: ', resVids)
        setVideos(resVids)
        return resVids
      }
    }
    fetchVideos();
  }, [])

  const renderList = (list) => {
    if(list){
      return list.map(item => {
        return (
          <Link style={{ textDecoration: 'none'}} to={`/videos/${item.id}`} key={item.id} >
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
      <h1>Videos</h1>
      <div>
        {renderList(videos)}
      </div>
    </>
  )
}

export default VideoFeed;