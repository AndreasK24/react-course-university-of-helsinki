import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id) => {
  const request = await axios.get(baseUrl);
  const anecdotes = request.data;
  const anecdoteToChange = anecdotes.find((n) => n.id === id);
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  };

  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  const updatedAnecdotes = anecdotes.map((anecdote) =>
    anecdote.id !== id ? anecdote : changedAnecdote
  );

  return updatedAnecdotes;
};
export default {
  getAll,
  vote,
  createNew,
};
