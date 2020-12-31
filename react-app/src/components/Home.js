import React from 'react';
import VideoFeed from '../components/VideoFeed';
import FollowedVideoFeed from './FollowedVideoFeed';

const Home = () => {

  return (
    <>
      <div className='home-layout'>
        <FollowedVideoFeed />
        <VideoFeed />
      </div>
    </>
  )
}

export default Home;