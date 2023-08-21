const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return <div className={error ? "error" : "noError"}>{message}</div>;
};

export default Notification;
