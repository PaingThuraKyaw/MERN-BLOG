import { useForm } from "react-hook-form";
import { loginProp } from "../type";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../api/auth";

const Login = () => {
  const schema = yup.object({
    email: yup.string().email().lowercase().required("email is required"),
    password: yup.string().required("password is required"),
  });

  //login fn
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginProp>({
    resolver: yupResolver(schema),
  });

  return (
    <div
      onSubmit={handleSubmit((value) => login.mutate(value))}
      className=" h-screen flex items-center justify-center"
    >
      <div>
        <h2 className=" text-center text-2xl pb-2">Log in</h2>
        <form action="" className=" space-y-4 border px-5 py-7 rounded-md">
          <div>
            <input
              type="email"
              placeholder="Email"
              className=" w-[300px] bg-gray-100 py-2 px-4 outline-none "
              {...register("email")}
            />
            <p className=" text-sm text-red-500 pt-1">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              className=" w-[300px] bg-gray-100 py-2 px-4 outline-none "
              {...register("password")}
            />
            <p className=" text-sm text-red-500 pt-1">
              {errors.password?.message}
            </p>
          </div>
          <button className=" w-full bg-black active:scale-90 duration-300 transition-all rounded-md text-gray-50 py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
