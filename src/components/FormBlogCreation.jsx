import { useState } from 'react'
import PropTypes from 'prop-types'

const FormBlogCreation = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogCreationVisible, setBlogCreationVisible] = useState(false)

  const handleCreate = async (event) => {
    event.preventDefault()
    await createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogCreationVisible(false)
  }

  return blogCreationVisible
    ? <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type='text' value={title} name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text' value={author} name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text' value={url} name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
        <div>
          <button onClick={() => setBlogCreationVisible(false)}>cancel</button>
        </div>
      </form>
    </>
    : <>
      <button onClick={() => setBlogCreationVisible(true)}>new note</button>
    </>
}

FormBlogCreation.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default FormBlogCreation