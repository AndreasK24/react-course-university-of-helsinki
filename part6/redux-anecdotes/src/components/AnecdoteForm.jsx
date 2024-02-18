import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  notificationChange,
  notificationRemove,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(notificationChange(`you created ${content}`));
    setTimeout(() => {
      dispatch(notificationRemove());
    }, 5000);
  };

  return (
    <div>
      <h2>Create new Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
