import { useState } from "react";

const Filter = ({ persons }) => {
  const [filteredPersons, setFilteredPersons] = useState([]);

  const filterF = (value, comp) => {
    for (let i = 0; i < value.length; i++) {
      if (value[i].toUpperCase() !== comp[i].toUpperCase()) {
        return false;
      }
    }
    return true;
  };
  const handleFilterName = (event) => {
    const filter = persons.filter((person) =>
      filterF(event.target.value, person.name)
    );
    console.log("Filtered Persons:", filter);
    setFilteredPersons(filter);
  };

  return (
    <div>
      <div>
        filter shown with
        <input onChange={handleFilterName} />
      </div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default Filter;
