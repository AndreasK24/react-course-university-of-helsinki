import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  notificationChange,
  notificationRemove,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return anecdotes;
    }
    const replace = `${filter}`;
    const regex = new RegExp(replace, "g");

    return anecdotes.filter((anecdote) => regex.test(anecdote.content));
  });
  const handleClick = (anecdote) => {
    dispatch(vote(anecdote.id));

    dispatch(notificationChange(`you voted for ${anecdote.content}`));
    setTimeout(() => {
      dispatch(notificationRemove());
    }, 5000);
  };
  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
