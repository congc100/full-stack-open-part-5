import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.sort((a, b) => b.likes - a.likes))
}

const create = async (blogObject, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (blogObject, blogId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  axios.put(`${baseUrl}/${blogId}`, blogObject, config)
}

const remove = async (blogId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, create, update, remove }