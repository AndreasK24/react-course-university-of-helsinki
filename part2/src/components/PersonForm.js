import { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    const filter = persons.filter((person) => newName === person.name);
    console.log("Filter:", filter);
    if (filter.length !== 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      console.log("nameObject:", nameObject);
      const newPersons = persons.concat(nameObject);
      console.log("newPersons:", newPersons);
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
