const Notification = ({ notification: { type, message } }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${type === null ? "" : type ? "success" : "failure"}`}>
      {message}
    </div >
  )
}

export default Notification