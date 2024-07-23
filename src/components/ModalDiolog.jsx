import { useSelector } from "react-redux";
import { useFirestore } from "../hooks/useFirestore";
import { useRef } from "react";

function ModalDiolog() {
  const { selectedTodo } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.user);

  const { changeTitle, isPending } = useFirestore();
  const inputVal = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    changeTitle(selectedTodo.id, inputVal.current.value);
    document.getElementById("my_modal_1").close();
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <div className="modal-action">
          <form onSubmit={handleSubmit} method="dialog">
            <input
              className="input input-primary mr-3"
              type="text"
              defaultValue={selectedTodo?.title}
            />
            {!isPending && (
              <button
                type="button"
                ref={inputVal}
                className="btn btn-outline btn-success"
              >
                Submit
              </button>
            )}
            {isPending && (
              <button disabled className="btn btn-outline btn-success">
                Loading...
              </button>
            )}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalDiolog;
