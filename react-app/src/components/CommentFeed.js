import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import '../styles/layout.css'

const CommentFeed = () => {
  const [comments, setComments] = useState([])
  const { vid } = useParams()

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`/api/video/${vid}/comments`)
      if (res.ok) {
        const resComments = await res.json()
        console.log('fetched comments: ', resComments)
        setComments(resComments)
        return resComments
      }
    }
    fetchComments();
  }, [vid])

  const renderList = (list) => {
    if (list) {
      return list.map(item => {
        return (
            <div className='CommentFeed-member' key={item.id} >
              <div className='Comment-info'>
                <h4>
                  {item.username}
                </h4>
                <p>
                  {item.created_at}
                </p>
              </div>
              <p>
                {item.text}
              </p>
            </div>
        )
      })
    }
  }


  return (
    <div className='CommentFeed'>
      <h3>Comments</h3>
      <div>
        {renderList(comments)}
      </div>
    </div>
  )
}

export default CommentFeed;