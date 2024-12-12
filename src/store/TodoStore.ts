import { action, computed, makeObservable, observable } from "mobx";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

class TodoStore {
  todos: Todo[] = [];
  currentTodoText = "";

  constructor() {
    makeObservable(this, {
      todos: observable,
      currentTodoText: observable,
      addTodo: action,
      completedCount: computed,
    });
  }
  get completedCount() {
    return this.todos.filter((todo) => todo.completed).length;
  }
  addTodo() {
    this.todos.push({
      id: Date.now(),
      title: this.currentTodoText,
      completed: false,
    });
    this.currentTodoText = "";
  }
}

const todoStore = new TodoStore();
export default todoStore;
