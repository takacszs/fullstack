const Persons = ({ persons,handleDeleteClick }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number} <button onClick={()=>handleDeleteClick(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
