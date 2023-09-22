import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import Post from "./components/Post";
import CreatePost from "./components/createPost/CreatePost";
import EditPost from "./components/EditPost/EditPost";

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
  ]);

  return <RouterProvider router={router} />;
};

export default App;
