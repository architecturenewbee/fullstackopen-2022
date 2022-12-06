import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import personsService from "./service/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterName, setFilterName] = useState("");

  const hook = () => {
    personsService.getAllPersons().then((data) => {
      console.log(data);
      setPersons(data);
      setFilteredPerson(data);
    });
  };
  useEffect(hook, []);
  const addName = (event) => {
    event.preventDefault();
    const result = persons.some((person) => person.name === newPerson.name);
    if (result) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newPerson.name);
        console.log(person);
        const changedPerson = { ...person, number: newPerson.number };
        personsService
          .updateNumber(changedPerson.id, changedPerson)
          .then((data) => {
            let updatedPersons = persons.map((per) =>
              per.id !== changedPerson.id ? per : data
            );
            setPersons(updatedPersons);
            setFilteredPerson(updatedPersons);
          });
      }
      return;
    }
    let obj = {
      ...newPerson,
      // id: persons.length + 1,
    };
    personsService.addNewPersons(obj).then((data) => {
      setPersons(persons.concat(data));
    });
    setFilterName("");
    setNewPerson({ name: "", number: "" });
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

  const handleDelete = (id) => {
    console.log("handle delete called");
    personsService.deletePerson(id).then((data) => {
      setPersons(data);
      setFilteredPerson(data);
    });
  };

  const handleNewPerson = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };
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
      <Person persons={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
