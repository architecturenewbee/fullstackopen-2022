const PersonForm = ({
  newName,
  newNumber,
  newPerson,
  handleNameChange,
  handleNumberChange,
  handleNewPerson,
  addDetails,
}) => {
  return (
    <>
      <form onSubmit={addDetails}>
        <h2>add a new</h2>
        <div>
          name: <input name="name" value={newPerson.name} onChange={handleNewPerson} />
        </div>
        <div>
          number: <input name="number" value={newPerson.number} onChange={handleNewPerson} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
