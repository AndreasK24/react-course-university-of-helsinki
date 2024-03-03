import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useSetNotification } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useSetNotification();

  const newAnecdotesMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries("anecdotes");
      dispatch({
        type: "CHANGE",
        payload: `you created '${data.content}'`,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        type: "CHANGE",
        payload: `'${error.response.data.error}'`,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdotesMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
