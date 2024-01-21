import { useState,useEffect } from "react";
import axios from 'axios'
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  
    const handleNameChange = (event) => {
      setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
    };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = { name: newName, number: newNumber};
    if (!persons.find((person) => person.name === newPerson.name)) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(newPerson.name + " already exists in the phonebook");
    }
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then((res) => {
      setPersons(res.data)
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Form handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  );
};

export default App;
