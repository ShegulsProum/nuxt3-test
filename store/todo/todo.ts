import { defineStore } from "pinia";
import { v4 as uuidv4, v4 } from "uuid";

export interface Todo {
  id: string;
  name: string;
  description: string;
  done: boolean;
  created_at: Date;
  updatedAt: Date;
}

export interface TodoAdd {
  name: string;
  description: string;
}

export interface TodoUpdate {
  name?: string;
  description?: string;
  done?: boolean;
}

export interface TodoState {
  items: Todo[] | undefined[];
}

const state = (): TodoState => ({
  items: [],
});

const getters = {
  getById: (todos: TodoState) => (id: string) => {
    return todos.items.find((item: Todo) => item.id === id);
  },
  getOrderedTodos: (todos: TodoState) => {
    [...todos.items].sort(
      (a: Todo, b: Todo) => a.created_at.getTime() - b.created_at.getTime()
    );
  },
};

const actions = {
  add(newTodo: TodoAdd) {
    const todo: Todo = {
      id: v4(),
      ...newTodo,
      done: false,
      created_at: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(todo);
  },
  remove(id: string) {
    this.todos = this.todos.filter((todo) => todo.id != id);
  },
  update(id: string, updatedTodo: TodoUpdate) {
    const index = this.items.findIndex(
      (item) => !!item && (item as Todo).id === id
    );

    this.items[index] = {
      ...this.items[index],
      ...updatedTodo,
      updatedAt: new Date(),
    };
  },
};

export const useTodoStore = defineStore("todo", {
  state,
  getters,
  actions,
});
