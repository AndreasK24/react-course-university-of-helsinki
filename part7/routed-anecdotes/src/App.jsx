import { useState } from "react";
import Notification from "./components/Notification";
import Menu from "./components/Menu";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import { Routes, Route, useMatch } from "react-router-dom";
const App = () => {
  const [notification, setNotification] = useState("");

  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const changeNotification = async (message, time) => {
    await setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, time);
  };

  const handleClick = (anecdote) => {
    vote(anecdote.id);

    changeNotification(`you voted '${anecdote.content}'`, 5000);
  };
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
      <Notification notification={notification} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={
            <Anecdote
              anecdote={anecdote}
              handleClick={() => handleClick(anecdote)}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateNew
              anecdotes={anecdotes}
              setAnecdotes={setAnecdotes}
              setNotification={setNotification}
            />
          }
        />
        {/* <Route path="/users" element={<Users />} /> */}
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      ;
      <Footer />
    </div>
  );
};

export default App;
