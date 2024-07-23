import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import TodoList from "../components/TodoList";
import FormCreate from "../components/FormCreate";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  return { title, completed };
};

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data: todos } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt"]
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Add New Task
              </h3>
              <FormCreate user={user}/>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            {todos && <TodoList todos={todos} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
