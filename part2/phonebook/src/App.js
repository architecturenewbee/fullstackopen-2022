import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personsService from "./service/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterName, setFilterName] = useState("");
  const [msg, setMessage] = useState(null);
  const hook = () => {
    personsService.getAllPersons().then((data) => {
      // console.log(data);
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
        // console.log(person);
        const changedPerson = { ...person, number: newPerson.number };
        personsService
          .updateNumber(changedPerson.id, changedPerson)
          .then((data) => {
            let updatedPersons = persons.map((per) =>
              per.id !== changedPerson.id ? per : data
            );
            setPersons(updatedPersons);
            setFilteredPerson(updatedPersons);
            setMessage("Number Updated");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            // console.log(error);
            setPersons(
              persons.filter((person) => person.id !== changedPerson.id)
            );
            setNewPerson({ name: "", number: "" });
            setMessage(
              `[ERROR] ${newPerson.name} was already deleted from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
      return;
    }
    let obj = {
      ...newPerson,
      // id: persons.length + 1,
    };
    personsService
      .addNewPersons(obj)
      .then((data) => {
        // console.log('added data', data)
        let updatedPersons = persons.concat(data);
        setPersons(updatedPersons);
        setFilteredPerson(updatedPersons);
        setMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage(`[ERROR] ${error.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        // console.log(error.response.data);
      });
    setFilterName("");
    setNewPerson({ name: "", number: "" });
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
    // console.log("handle delete called");
    // personsService.deletePerson(id).then((data) => {
    //   console.log({data})
    //   setPersons(data);
    //   setFilteredPerson(data);
    //   setSuccessMsg(`Deleted ${newPerson.name}`);
    //   setTimeout(() => {
    //     setMessage(null);
    //   }, 5000);
    // });

    personsService
      .deletePerson(id)
      .then((data) => {
        const personDelete = persons.filter((person) => person.id === id); // filter returns array
        const updatedPersons = persons.filter(
          (person) => person.id !== personDelete[0].id
        );
        setPersons(updatedPersons);
        setFilteredPerson(updatedPersons);
        setMessage(`${personDelete[0].name} deleted successfully`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage(`[ERROR] ${error.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        // console.log(error.response.data);
      });
  };

  const handleNewPerson = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} />
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
