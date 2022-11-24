const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addDetails,
}) => {
  return (
    <>
      <form onSubmit={addDetails}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
