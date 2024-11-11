const Notification = ({ msg }) => {
  const color = msg && msg.type === 'error' ? 'red' : 'green'
  return msg && <div style={{
    color: color,
    borderColor: color,
    borderWidth: '2px',
    borderStyle: 'solid',
    backgroundColor: '#eee',
    margin: '5px',
  }}>{msg.content}</div>
}

export default Notification