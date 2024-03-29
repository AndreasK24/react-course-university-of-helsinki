import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={() => handleClick()}> {text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const points = {};
  for (let i = 0; i < anecdotes.length; i++) {
    points[i.toString()] = 0;
  }
  const [selected, setSelected] = useState(0);
  const [most, setMost] = useState(0);
  const [votes, setVotes] = useState(points);

  const nextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };
  const vote = () => {
    const copy = { ...votes };
    // increment the property 2 value by one
    copy[selected] += 1;
    setVotes(copy);
    let most = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (copy[most] < copy[i]) {
        most = i;
      }
    }
    setMost(most);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={vote} text={"Vote"}></Button>
      <Button handleClick={nextAnecdote} text={"Next Anecdote"}></Button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[most]}</p>
      <p>has {votes[most]} votes</p>
    </div>
  );
};

export default App;
