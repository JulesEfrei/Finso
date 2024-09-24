import axios from "axios";

const API_URL = "http://localhost:3001/api/todos";

export default {
  getTodos() {
    return axios.get(API_URL);
  },
  addTodo(todo) {
    return axios.post(API_URL, todo);
  },
  deleteTodo(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
