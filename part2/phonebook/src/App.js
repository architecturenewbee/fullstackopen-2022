import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', number:''});
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
    const result = persons.some((person) => person.name === newPerson.name);
    if (result) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    let obj = {
      ...newPerson,
      id: persons.length + 1,
    };
    setPersons(persons.concat(obj));
    setFilterName("");
    setNewPerson({name:'',number:''})
    setFilteredPerson([...filteredPerson, obj]);
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
    setFilteredPerson(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value)
      )
    );
  };

  const handleNewPerson = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <PersonForm
        newPerson={newPerson}
        handleNewPerson={handleNewPerson}
        addDetails={addName}
      />
      <h2>Numbers</h2>
      <Person persons={filteredPerson} />
    </div>
  );
};

export default App;
