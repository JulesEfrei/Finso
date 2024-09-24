<template>
  <div class="container mx-auto p-5">
    <h1 class="text-2xl mb-5">To-Do List</h1>
    <div>
      <input v-model="newTodo" placeholder="Add a new task" class="border p-2 mr-2">
      <button @click="addTodo" class="bg-blue-500 text-white px-4 py-2">Add</button>
    </div>
    <ul class="mt-5">
      <li v-for="todo in todos" :key="todo._id" class="flex justify-between mb-2">
        <span>{{ todo.title }}</span>
        <button @click="deleteTodo(todo._id)" class="bg-red-500 text-white px-2">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import TodoService from './services/TodoService';

export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  methods: {
    async fetchTodos() {
      const response = await TodoService.getTodos();
      this.todos = response.data;
    },
    async addTodo() {
      if (!this.newTodo) return;
      await TodoService.addTodo({ title: this.newTodo });
      this.newTodo = '';
      this.fetchTodos();
    },
    async deleteTodo(id) {
      await TodoService.deleteTodo(id);
      this.fetchTodos();
    }
  },
  created() {
    this.fetchTodos();
  }
};
</script>
