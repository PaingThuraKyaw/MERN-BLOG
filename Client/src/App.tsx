import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import Post from "./components/Post";
import CreatePost from "./components/createPost/CreatePost";
import EditPost from "./components/EditPost/EditPost";
import Login from "./auth/Login";
import Register from "./auth/Register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Post />,
        },
        {
          path: "/post/create",
          element: <CreatePost />,
        },
        {
          path: "/post/update/:id",
          element: <EditPost />,
        },
      ],
    },
    {
      path:  "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
