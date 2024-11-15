import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <button>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>}
  </div>  
}

export default Blog