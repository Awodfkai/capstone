import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import CommentFeed from '../components/CommentFeed';
import CommentSubmitter from "./CommentSubmitter";
import '../styles/layout.css'
import FollowButton from "./FollowButton";

function VideoView() {
  const [vidFilePath, setVidFilePath] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [views, setViews] = useState()
  const [username, setUsername] = useState('')
  const [vidOwnerId, setVidOwnerId] = useState()
  const { vid } = useParams()

  useEffect(() => {
    async function fetchVideo(){
      await fetch(`/api/video/${vid}/watch`, {
        method: 'PUT',
      })
      const res = await fetch(`/api/video/${vid}`)
      if(res.ok){
        const data = await res.json()
        const video = data.video
        const user = data.user
        console.log('video in video view: ', video)
        setVidFilePath(video.url)
        setTitle(video.title)
        setDescription(video.description)
        setViews(video.views)
        setUsername(user.username)
        setVidOwnerId(user.id)
      }
    }
    fetchVideo()
  }, [])

  const renderFollowButton = (vidOwnerId) => {
    if(vidOwnerId){
      return (
        <FollowButton target_id={vidOwnerId} />
      )
    }
  }

  return (
    <div>
      <div className='VideoView'>
        <div className='VideoView-header'>
          <h2 className='VideoView-header'>{title} by {username}</h2>
          {renderFollowButton(vidOwnerId)}
        </div>
        <ReactPlayer url={vidFilePath} controls={true} />
        <div className='VideoView-info'>
          <div>Views: {views}</div>
          <p>{description}</p>
        </div>
      </div>
      <CommentFeed />
      <CommentSubmitter />
    </div>
  );
}

export default VideoView;
