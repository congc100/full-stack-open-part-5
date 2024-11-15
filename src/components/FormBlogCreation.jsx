const FormBlogCreation = ({
  handleCreate,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  blogCreationVisible,
  setBlogCreationVisible,
}) => {
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

export default FormBlogCreation