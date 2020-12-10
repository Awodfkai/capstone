import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import User from './User';

const Upload = () => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [url ,setUrl] = useState()
  const [file, setFile] = useState()
  const { user } = useContext(UserContext)

  const uploadVData = async (title, description, user_id, url) => {
    const response = await fetch(`/api/video/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        user_id,
        url
      }),
    });
    return await response.json();
  }

  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("user_file", file);

    const response = await fetch('/api/video/upload', {
      method: 'POST',
      body: formData
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const newVideo = await uploadVideo(
     file
    )

    console.log("newVideo returns: ", newVideo)
    console.log("how do I parse the url from that return")


    // if (newVideo.ok) {
    //   const newVideo = await uploadVData(
    //     title,
    //     description,
    //     user_id = user.id,
    //     url,
    //   )
    // } else {
    //   setErrors(newVideo.errors)
    // }
  }

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={onSubmit}>
        <label>
          Upload Your Video
          <br/>
          <input type="file" name="user_file" onChange={setFile} />
        </label>
        <label>
          Title
          <input type="text" name="title" onChange={setTitle} />
        </label>
        <label>
          Description
          <input type="text" name="description" onChange={setDescription} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </>
  )
}

export default Upload;