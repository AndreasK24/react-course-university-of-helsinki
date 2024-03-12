import { useNavigate } from "react-router-dom";
import useField from "../hooks";

const CreateNew = ({ anecdotes, setAnecdotes, setNotification }) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const reset = () => {
    content.onChange("");
    author.onChange("");
    info.onChange("");
  };

  const changeNotification = async (message, time) => {
    await setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, time);
  };
  const addNew = async (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    await setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    changeNotification(`you created '${anecdote.content}'`, 5000);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default CreateNew;
