import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
