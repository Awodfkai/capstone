import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

const Upload = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState()
  const { user } = useContext(UserContext)
  const user_id = user.id

  const updateTitle = (e) => {
    setTitle(e.target.value)
  }
  const updateDescription = (e) => {
    setDescription(e.target.value)
  }
  const updateFile = (e) => {
    setFile(e.target.files[0])
  }
  

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

  const uploadVideo = async (formData) => {
    const response = await fetch('/api/video/upload', {
      method: 'POST',
      body: formData
    });
    return await response.json()
  }

  const asyncSubmit = async (formData) => {
    const newVideo = await uploadVideo(
      formData
    )
    console.log("newVideo returns: ", newVideo)
    const url = newVideo
    console.log("url is what now?: ", url)
    if (url) {
      const newData = await uploadVData(
        title,
        description,
        user_id,
        url,
      )
      console.log('data upload return: ', newData)
    } else {
      console.log('returned url is not valid')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("user_file", file);
    console.log(file)
    asyncSubmit(formData)
  }

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={onSubmit}>
        <label>
          Upload Your Video
          <br/>
          <input type="file" name="user_file" onChange={updateFile} />
        </label>
        <label>
          Title
          <input type="text" name="title" onChange={updateTitle} />
        </label>
        <label>
          Description
          <input type="text" name="description" onChange={updateDescription} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </>
  )
}

export default Upload;