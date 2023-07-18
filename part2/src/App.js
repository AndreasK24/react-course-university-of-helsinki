import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    console.log("effect");

    const eventHandler = (response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    };

    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []);
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
