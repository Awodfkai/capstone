import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import User from './User';

const Upload = () => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [url ,setUrl] = useState()
  const { user } = useContext(UserContext)

  const onSubmit = async (e) => {
    const newVideo = await uploadVideo(
      title,
      description,
      user_id = user.id,
      url,
    )


    // if (!newHabit.errors) {
      
    //   setDescription()
    // } else {
    //   setErrors(newHabit.errors)
    // }
  }

  return (
    <>
      <h1>Upload</h1>
      <form action="/api/video/upload" method="POST" encType="multipart/form-data">
        <label>
          Upload Your Video
          <br/>
          <input type="file" name="user_file" />
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