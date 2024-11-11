import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({ title, author, url }, user.token)
      notice('info', `a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log('create new OK')
      blogService.getAll().then(blogs => setBlogs(blogs))
      console.log('blogs fetched after create')
    } catch (exception) {
      console.log('create new failed')
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
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
}

export default App