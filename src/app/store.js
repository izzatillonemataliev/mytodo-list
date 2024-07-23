import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/todos/userSlice";
import todosReducer from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          "user/login",
          "user/isAuthChange",
          "todo/setSelectedTodo",
        ],
        ignoredPaths: ["user.user", "todos.selectedTodo.createdAt"],
      },
    }),
});
