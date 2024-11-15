import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import FormBlogCreation from './components/FormBlogCreation'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState(null)

  // check login token
  useEffect(() => {
    const blogListLogin = window.localStorage.getItem('blogListLogin')
    if (blogListLogin) {
      const parsed = JSON.parse(blogListLogin)
      setUser(parsed)
      console.log('logged in as', parsed.username)
    }
  }, [])

  // get blog list when logged in
  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs => setBlogs(blogs))
      console.log('blogs fetched')
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogListLogin', JSON.stringify(user)) 
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('login OK')
    } catch (exception) {
      notice('error', 'wrong username or password')
      console.log('login failed')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListLogin')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const { title, author, url } = blogObject
      await blogService.create({ title, author, url }, user.token)
      notice('info', `a new blog ${title} by ${author} added`)
      console.log('create new OK')
      blogService.getAll().then(blogs => setBlogs(blogs))
      console.log('blogs fetched after create')
    } catch (exception) {
      console.log('create new failed')
      notice('error', exception.response.data.error)
    }
  }

  const updateBlogLike = async (blogObject, blogId) => {
    try {
      await blogService.update(blogObject, blogId, user.token)
      console.log('update OK')
      // update display
      const blogList = [...blogs]
      const target = blogList.filter(b => b.id === blogId)[0]
      const index = blogList.indexOf(target)
      blogList[index] = { ...target, likes: blogObject.likes }
      setBlogs(blogList)
    } catch (exception) {
      console.log('update blog failed')
      notice('error', exception.response.data.error)
    }
  }

  const notice = (type, content) => {
    setMsg({ type, content })
    setTimeout(() => {
      setMsg(null)
    }, 2000)
  }

  return user === null ?
    <div>
      <h2>log in to application</h2>
      <Notification msg={msg} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
    :
    <div>
      <h2>blogs</h2>
      <Notification msg={msg} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <FormBlogCreation createBlog={createBlog} />
      {blogs.map(blog => <Blog
        key={blog.id}
        blog={blog}
        updateBlogLike={updateBlogLike}
      />)}
    </div>
}

export default App