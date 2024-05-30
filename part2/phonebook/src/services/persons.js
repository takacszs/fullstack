import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((resp) => {return resp.data});
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((resp) => {return resp.data});
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((resp) => {return resp.data});
};

const update = (person, newPhone) => {
  person.number = newPhone;
  return axios.put(`${baseUrl}/${person.id}`, person).then((resp) => {return resp.data});
};

export default {
  getAll,
  create,
  remove,
  update
};
