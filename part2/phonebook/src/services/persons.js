import axios from 'axios'

const URL = "http://localhost:3001/persons"

const getAll = () =>
  axios
    .get(URL)
    .then(response => response.data)

const create = (newPerson) =>
  axios
    .post(URL, newPerson)
    .then(response => response.data)

const update = (id, newPerson) =>
  axios
    .put(`${URL}/${id}`, newPerson)
    .then(response => response.data)

const remove = id =>
  axios
    .delete(`${URL}/${id}`)
    .then(response => response.data)


export default { create, getAll, update, remove }