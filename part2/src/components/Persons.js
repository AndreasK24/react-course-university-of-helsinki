import personService from "../services/persons";

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.eliminate(id).then((res) => console.log(res));
      const updatedPerson = persons.filter((p) => p.id !== id);
      console.log("Updated person array without deleted person", updatedPerson);
      setPersons(updatedPerson);
    } else {
    }
  };
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            {" "}
            delete{" "}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
