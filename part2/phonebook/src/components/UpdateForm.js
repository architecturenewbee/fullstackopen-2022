const UpdateForm = ({ valuePerson, handleEdit }) => {
    console.log(valuePerson);
    return <>
        <div>
            {
                valuePerson.map(p => <input value={p.name} name={p.id} key={p.id} onChange={ handleEdit}/>)
            }
    </div>
    </>
};

export default UpdateForm;