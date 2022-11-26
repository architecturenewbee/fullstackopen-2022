import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
      setFilteredPerson(response.data);
    });
  };
  useEffect(hook, []);
  const addName = (event) => {
    event.preventDefault();
    const result = persons.some((person) => person.name === newName);
    if (result) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    let obj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(obj));
    setFilterName("");
    setNewName("");
    setNewNumber("");
    setFilteredPerson([...filteredPerson, obj]);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setNewName(value);
  };

  const handleNumberChange = (event) => {
    const value = event.target.value;
    setNewNumber(value);
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
    setFilteredPerson(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value)
      )
    );
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addDetails={addName}
      />
      <h2>Numbers</h2>
      <Person persons={filteredPerson} />
    </div>
  );
};

export default App;
