import axios from "axios";
import { useEffect, useState } from "react";
import ShownCountryDetails from "./components/ShownCountryDetails";
import DetailCountry from "./components/DetailCountry";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showCountry, setShowCountry] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  const handleSearchFilter = (event) => {
    setShowCountry([]);
    setSearch(event.target.value);
    setShowCountry(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };
  return (
    <>
      <div>
        search query: <input value={search} onChange={handleSearchFilter} />
        {showCountry.length > 10 ? (
          <p>Too Many matches, Specify another filter</p>
        ) : showCountry.length === 1 ? (
          <ShownCountryDetails details={showCountry[0]} />
        ) : (
          showCountry.map((country) => (
            <DetailCountry key={country.name.common} country={country} setShowCountry={setShowCountry} />
          ))
        )}
      </div>
    </>
  );
};

export default App;
