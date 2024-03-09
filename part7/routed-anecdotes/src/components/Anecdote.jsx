const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <div>has {anecdote.votes}</div>
      <button onClick={handleClick}>vote</button>
    </div>
  );
};

export default Anecdote;
