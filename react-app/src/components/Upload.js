import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

const Upload = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState()
  const [feedback, setFeedback] = useState('')
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

  const renderResponse = (res) => {
    if(res){
      return (
        <div>
          {res}
        </div>
      )
    }
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
      await uploadVData(
        title,
        description,
        user_id,
        url,
      )
      setFeedback('Upload Success')
    } else {
      setFeedback('An error occurred while uploading')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setFeedback('processing...')
    if(!file){
      setFeedback('no file selected')
    }
    const formData = new FormData();
    formData.append("user_file", file);
    asyncSubmit(formData)
  }

  return (
    <div className='upload'>
      <h1>Upload</h1>
      <div className='upload-response'>
        {renderResponse(feedback)}
      </div>
      <form onSubmit={onSubmit} className='upload-form'>
        <label>
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
    </div>
  )
}

export default Upload;