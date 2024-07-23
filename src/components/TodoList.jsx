import ModalDiolog from "./ModalDiolog";
import { useFirestore } from "../hooks/useFirestore";
import { setSelectedTodo } from "../features/todos/todosSlice";
import { useDispatch } from "react-redux";

function TodoList({ todos }) {
  const handleChange = (todo) => {
    dispatch(setSelectedTodo(todo));

    document.getElementById("my_modal_1").showModal();
  };
  const dispatch = useDispatch();
  const { deleteItem, changeStatus } = useFirestore();
  return (
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Tasks
      </h3>
      <ModalDiolog />
      {todos &&
        todos.reverse().map((todo) => (
          <div
            key={todo.id}
            className={`flex justify-between items-center border-b-2 border-gray-200 py-4 ${
              todo.completed ? "opacity-25" : "opacity-100"
            }`}
          >
            <h3 className="text-lg text-gray-900">{todo.title}</h3>
            <button
              className="btn btn-outline btn -info btn-sm"
              onClick={() => handleChange(todo)}
            >
              Edit List
            </button>
            <div>
              <button
                onClick={() => changeStatus(todo.id, todo.completed)}
                className="btn btn-outline btn-error btn-sm"
              >
                {todo.completed ? "uncompleted" : "completed"}
              </button>
              <button
                onClick={() => deleteItem(todo.id)}
                className="bg-red-500 btn-sm hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TodoList;
