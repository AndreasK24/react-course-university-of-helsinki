import { createContext, useReducer, useContext } from "react";

const initialState = "";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return action.payload;
    case "REMOVE":
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const useSetNotification = (message, time) => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
