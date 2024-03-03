import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getAnecdotes, updateAnecdote } from "../requests";
import { useSetNotification } from "../NotificationContext";

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
  const queryClient = useQueryClient();

  const dispatch = useSetNotification();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });
  //console.log(JSON.parse(JSON.stringify(result)));

  const filter = useSelector(({ filter }) => filter);

  const updateNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  if (result.isLoading) {
    return <div>app is loading</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to server problems</div>;
  }

  const anecdotes = result.data;

  const filteredAnecdotes = (anecdotes, filter) => {
    if (!filter) {
      return anecdotes;
    }
    const replace = `${filter}`;
    const regex = new RegExp(replace, "g");

    return anecdotes.filter((anecdote) => regex.test(anecdote.content));
  };

  const handleClick = (anecdote) => {
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: "CHANGE",
      payload: `you voted '${anecdote.content}'`,
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);
  };

  return (
    <ul>
      {filteredAnecdotes(anecdotes, filter).map((anecdote) => (
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
