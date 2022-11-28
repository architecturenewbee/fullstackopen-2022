
const DetailCountry = ({ country, setShowCountry }) => {
    return (
      <>
        <div>
          <p>
            {country.name.common}{" "}
            <button onClick={() => setShowCountry([country])}>Show</button>
          </p>
        </div>
      </>
    );
}

export default DetailCountry;