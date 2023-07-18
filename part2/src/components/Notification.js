const Notification = ({ message, error }) => {
  return <div className={error ? "error" : "success"}>{message}</div>;
};

export default Notification;
