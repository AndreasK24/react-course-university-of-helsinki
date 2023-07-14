import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040-1234567" },
  ]);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons}></Filter>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons}></Persons>
    </div>
  );
};

export default App;
