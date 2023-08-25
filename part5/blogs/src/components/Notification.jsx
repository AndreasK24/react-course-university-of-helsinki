const Notification = ({ message, error }) => {
  //console.log(message);
  if (message === null) {
    return null;
  }

  return <div className={error ? "error" : "noError"}>{message}</div>;
};

export default Notification;
