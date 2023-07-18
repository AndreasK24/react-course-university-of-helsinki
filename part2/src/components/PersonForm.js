import { useState } from "react";
import personService from "../services/persons";
import Notification from "../components/Notification";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
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
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with the new one?`
        )
      ) {
        const filteredElement = filter[0];
        filteredElement.number = newNumber;
        personService
          .update(filteredElement.id, filteredElement)
          .then((res) => console.log(res))
          .catch((error) => {
            setErrorMessage(
              `Information of  ${filteredElement.name} has already been removed from server`
            );
            setError(true);
          });
        const updatedPerson = persons.map((p) =>
          p.id === filteredElement.id ? filteredElement : p
        );
        console.log("Updated person array", updatedPerson);
        setPersons(updatedPerson);
        setNewName("");
        setNewNumber("");
      } else {
      }
    } else {
      const nameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      setErrorMessage(`Added ${nameObject.name}`);
      personService.create(nameObject).then((returnedPerson) => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
      });
    }
  };
  return (
    <div>
      {errorMessage && <Notification error={error} message={errorMessage} />}
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
    </div>
  );
};

export default PersonForm;
