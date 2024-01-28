import { useState } from "react";

const NoteForm = ({ createNote, user }) => {
  const [newNote, setNewNote] = useState("");

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = async (event) => {
    event.preventDefault();
    await createNote({
      content: newNote,
      important: true,
      user,
    });

    setNewNote("");
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
          placeholder="write note content here"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
