import { useState } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPerson, setFilteredPerson] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
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
  }

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
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addDetails={addName}/>
      <h2>Numbers</h2>
      <Person persons={filteredPerson}/>
    </div>
  );
};

export default App;
