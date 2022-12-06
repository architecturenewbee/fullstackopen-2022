import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addNewPersons = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  //   return axios.delete(`${baseUrl}/${id}`).then(() => getAllPersons());
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((resposne) => resposne.data);
};

const updateNumber = (id, object) => {
  const request = axios.put(`${baseUrl}/${id}`, object);
  return request.then((response) => response.data);
};
export default { getAllPersons, addNewPersons, deletePerson, updateNumber };
