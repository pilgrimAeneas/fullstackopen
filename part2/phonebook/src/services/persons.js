import axios from 'axios'

const URL = "http://localhost:3001/persons"

const getAll = () =>
  axios
    .get(URL)
    .then(response => response.data)

const create = (newPerson) =>
  axios
    .post(newPerson)
    .then(response => response.data)

const update = (id, newPerson) =>
  axios
    .put(`${URL}/${id}`, newPerson)
    .then(response => response.data)

export default { getAll, create, update }