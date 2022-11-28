const ShownCountryDetails = ({ details }) => {
  return (
    <>
      <h1>{details.name.common}</h1>
      <p>capital {details.capital[0]}</p>
      <p>area {details.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.keys(details.languages).map((element) => 
          <li key={details.languages[element]}>{details.languages[element]}</li>
        )}
          </ul>
          <img src={details.flags['png']} alt="country-flag"/>
    </>
  );
};

export default ShownCountryDetails;
