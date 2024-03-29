//usa ({ title }) para nao ter que ficar usar 'props'
//cria o tipo com a propriedade, depois insere ele onde vai ser usado

import { Todo } from '../../App';
import './styles.css';

// valores que ele espera receber
type CardProps = {
  todo: Todo;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function Card({ todo, completeTodo, deleteTodo }: CardProps) {
  function handleCompleteTodo() {
    completeTodo(todo.id);
  }

  function handleDeleteTodo() {
    deleteTodo(todo.id);
  }

  return (
    <div className={`card ${todo.completed ? 'done' : ''}`}>
      <h2>{todo.title}</h2>

      <div className="card-buttons">
        <button onClick={handleCompleteTodo}>
          {todo.completed ? 'Retomar' : 'Completar'}
        </button>
        <button onClick={handleDeleteTodo}>Deletar</button>
      </div>
    </div>
  );
}
