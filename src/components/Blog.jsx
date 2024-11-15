import { useState } from 'react'

const Blog = ({ blog, updateBlogLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onUpdateLike = () => {
    const { author, title, url, id } = blog
    const user = blog.user.id
    const likes = blog.likes + 1
    updateBlogLike({ user, likes, author, title, url }, id)
  }

  const onRemove = () => {
    const { author, title, id } = blog
    if(window.confirm(`Remove blog ${title} by ${author}`)) {
      removeBlog(id)
    }
  }

  const [detailVisible, setDetailVisible] = useState(false)

  return <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} &nbsp;
      <button onClick={() => setDetailVisible(!detailVisible)}>
        {detailVisible ? 'hide' : 'view'}
      </button>
    </div>
    {detailVisible && <div>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={() => onUpdateLike()}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <div>
        <button onClick={() => onRemove()}>remove</button>
      </div>
    </div>}
  </div>  
}

export default Blog