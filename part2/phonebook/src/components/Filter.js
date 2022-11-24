const Filter = ({filterName, handleFilterName }) => {
  return (
    <>
      <div>
        filter show with:
        <input value={filterName} onChange={handleFilterName} />
      </div>
    </>
  );
}; 

export default Filter;