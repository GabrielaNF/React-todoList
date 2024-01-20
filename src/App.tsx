import { useState, ChangeEvent, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  //estado, funcao que altera esse estado
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('@todolist: todos');

    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@todolist: todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    setTodos((previousTodos) => [
      ...previousTodos,
      { id: Math.random(), title: todoInput, completed: false },
    ]);

    setTodoInput(''); //zera as tarefas na barra pra adicionar
  }

  function completeTodo(id: number) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function deleteTodo(id: number) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="add-todo">
        {/* valor do input = valor do meu estado */}
        <input placeholder="Inclua tarefa" value={todoInput} onChange={handleInputChange} />
        <button onClick={addTodo}>Adicionar </button>
      </div>
      {todos.map((todo) => (
        <Card key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
      ))
      }
    </div>
  );
}

export default App;
