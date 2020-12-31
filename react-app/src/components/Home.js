import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import User from './User';
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