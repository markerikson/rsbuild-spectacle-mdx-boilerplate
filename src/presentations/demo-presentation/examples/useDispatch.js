import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch()

  const onSavePostClicked = () => {
    dispatch( postAdded({title, content }) )
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        {/* omit form inputs */}
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}