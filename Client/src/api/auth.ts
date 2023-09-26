import axios, { AxiosError } from "axios";
import { loginProp, registerProp } from "../type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const register = async (option: registerProp) => {
  const response = await axios.post(`${BASE_URL}/register`, option);
  return response;
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (option: registerProp) => register(option),
    onSuccess: (data) => {
      console.log(data);

      if (data.status === 201) {
        navigate("/login");
      }
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const data = err.response;
        console.log(data);
      }
    },
  });
};

//login
const login = async (option: loginProp) => {
  const response = await axios.post(`${BASE_URL}/login`, option);
  return response;
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (option: loginProp) => login(option),
    onSuccess: (data) => {
      if (data.status === 200) {
        const token = data.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });
};
