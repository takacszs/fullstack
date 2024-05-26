import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import Error from "./components/Error";
import Filter from "./components/Filter";
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [NotiMsg, SetNotiMsg] = useState(null);
  const [ErrorMsg, SetErrorMsg] = useState(null);
  const [filteredName, setFilteredName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = { name: newName, number: newNumber };
    if (!persons.find((person) => person.name === newPerson.name)) {
      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        SetNotiMsg(`${returnedPerson.name} was added :)`)
        setTimeout(()=>{SetNotiMsg(null)},5000)
      }).catch(error=>{
        SetErrorMsg(error.response.data.error);
        setTimeout(()=>{SetErrorMsg(null)},5000)
      });
    } else {
      alert(newPerson.name + " already exists in the phonebook");
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeleteClick = (id) => {
    const personForName = persons.find(person=>person.id ===id)
    if(window.confirm(`Do you really wanna delete ${personForName.name} ?`)){
    personsService.remove(id).then((personObject)=>{
        const toDelete = personObject
        const newPersonsList = persons.filter((person) => {
          return person.id !== toDelete.id
        })
        setPersons(newPersonsList)
      })
    }
  }

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value);
  };

  useEffect(() => {
    personsService.getAll().then((personsBeforeFilter) => {
      setPersons(personsBeforeFilter);
    });
  }, []);


  // if there is a filter set persons to accordingly else leave it as is 
  const personsToShow = filteredName !== "" ? persons.filter((person) => person.name.toLowerCase().includes(filteredName.toLowerCase())) : persons;

    
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filteredName={filteredName}
        handleFilteredNameChange={handleFilteredNameChange}
      />

      <h3> Add a new phone number: </h3>

      <Notification message={NotiMsg}/>
      <Error message={ErrorMsg}/>
      <Form
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default App;