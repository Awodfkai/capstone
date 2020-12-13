import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import User from './User';

const VideoFeed = () => {
  const { user } = useContext(UserContext)
  const user_id = user.id
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
    const resVids = fetchVideos();
  }, [])

  const renderList = (list) => {
    console.log("list inside renderList: ",list)
    if(list){
      return list.map(item => {
        return (
          <div key={item.id} className='VideoFeed-member'>
            <h3>
              {item.title}
            </h3>
            <p>
              {item.description}
            </p>
            <div>
              {item.views}
            </div>
            <div>
              {item.user_id}
            </div>
            <div>
              {item.url}
            </div>
          </div>
        )
      })
    }
  }


  return (
    <>
      <h1>Videos</h1>
      <div>
        <p>
          Put Video Feed Here
        </p>
        {renderList(videos)}
      </div>
    </>
  )
}

export default VideoFeed;