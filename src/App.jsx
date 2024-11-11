import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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
      console.log('login failed')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListLogin')
    setUser(null)
  }

  return user === null ?
    <div>
      <h2>log in to application</h2>
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
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
}

export default App