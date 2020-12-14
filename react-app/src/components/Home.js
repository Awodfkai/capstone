import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import User from './User';
import VideoFeed from '../components/VideoFeed';

const Home = () => {

  return (
    <>
      <div className='home-layout'>
        <VideoFeed />

      </div>
    </>
  )
}

export default Home;