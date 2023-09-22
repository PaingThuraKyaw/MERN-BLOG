import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormDataProp, FormUpdateData, postProp } from "../type";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const post = async (): Promise<postProp[]> => {
  const { data } = await axios.get(`${BASE_URL}/post`);
  return data.post;
};

export const useGetPost = () => {
  return useQuery({
    queryKey: ["post"],
    queryFn: post,
  });
};

// ///formdata
const createPost = async (value: FormDataProp) => {
  const formData = new FormData();
  formData.append("title", value.title);
  formData.append("description", value.description);
  if (value.file) formData.append("file", value.file);
  const { data } = await axios.post(`${BASE_URL}/post/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: FormDataProp) => createPost(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

//delete
const deletePost = async (id: string) => {
  const { data } = await axios.delete(`${BASE_URL}/post/delete/${id}`);
  return data;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

//get value
const getValue = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/post/update/${id}`);
  return data;
};

export const useGetValue = (id: string) => {
  return useQuery({
    queryKey: ["getValue"],
    queryFn: () => getValue(id),
  });
};

// ///formdata update
const updatePost = async (value: FormUpdateData) => {
  const formData = new FormData();
  formData.append("_id", value._id);
  formData.append("title", value.title);
  formData.append("description", value.description);
  if (value.file) formData.append("file", value.file);
  console.log(value);

  const { data } = await axios.put(`${BASE_URL}/post/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: (value: FormUpdateData) => updatePost(value),
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  });
};
