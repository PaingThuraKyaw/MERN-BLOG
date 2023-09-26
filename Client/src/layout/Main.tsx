import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Main = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section>
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Main;
