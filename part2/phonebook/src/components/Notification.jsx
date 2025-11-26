const Notification = ({ notification: { type, message } }) => {

  const notification = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "fitContent",
  }

  const success = {
    color: "green",
  }

  const failure = {
    color: "red",
  }

  if (message === null) {
    return null
  }

  return (
    <div style={type === null ? { ...notification } : type ? { ...notification, ...success } : { ...notification, ...failure }} >
      {message}
    </div >
  )
}

export default Notification