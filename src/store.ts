import { create } from "zustand";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Zustand implementation

type Store = {
  todos: Todo[];
  newTodo: string;
  addTodo: () => void;
  setNewTodo: (text: string) => void;
  updateTodo: (id: number, text: string) => void;
  toggle: (id: number) => void;
  removeTodo: (id: number) => void;
  load: (todos: Todo[]) => void
};

const useStore = create<Store>((set) => ({
  todos: [],
  load(todos: Todo[]) {
    set((state) => ({
      ...state,
      todos,
    }))
  },
  newTodo: "",
  addTodo() {
    set((state) => ({
      ...state,
      todos: addTodo(state.todos, state.newTodo),
    }));
  },
  setNewTodo(text: string) {
    set((state) => ({
      ...state,
      newTodo: text,
    }));
  },
  updateTodo(id: number, text: string) {
    set((state) => ({
      ...state,
      todos: updateTodo(state.todos, id, text),
    }));
  },
  toggle(id: number) {
    set((state) => ({
      ...state,
      todos: toggleTodo(state.todos, id),
    }));
  },
  removeTodo(id: number) {
    set((state) => ({
      ...state,
      todos: removeTodo(state.todos, id),
    }));
  },
}));

export default useStore;
