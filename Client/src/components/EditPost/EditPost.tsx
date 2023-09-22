import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { FormUpdateData } from "../../type";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileProvider from "./FileProvider";
import { useGetValue, useUpdatePost } from "../../api";
import { useParams } from "react-router-dom";
import Loading from "../../Loader/Loading";
const EditPost: React.FC = () => {
  const validationSchema = yup.object().shape({
    _id: yup.string().notRequired(),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    file: yup.mixed().test("required", "It's freaking required", (file) => {
      if (file) return true;
      return false;
    }),
  });

  //params
  const { id } = useParams();

  //call getValue
  const { data, isLoading } = useGetValue(id?.toString() || " ");
  //call updatefn
  const updateFn = useUpdatePost();

  //react-hook-form
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormUpdateData>({
    resolver: yupResolver(validationSchema),
  });

  //form fn
  const onSubmit: SubmitHandler<FormUpdateData> = (value) => {
    updateFn.mutate(value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className=" px-4">
      <h2 className=" text-3xl text-center underline mt-5">Edit Post</h2>
      <div className=" flex justify-center mt-8 px-5 py-4">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className=" border px-5 py-4"
          action=""
        >
          <input type="hidden" {...register("_id")} defaultValue={data._id} />
          {/* title */}
          <div>
            <label
              className=" block text-slate-800 font-[500] text-lg"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              defaultValue={data.title}
              className=" w-[300px] px-2 focus:outline-none placeholder:text-gray-500 outline-none border-2 border-gray-300 focus:ring-2 transition-all duration-300 py-[8px] mt-1 rounded-md "
              placeholder="Title..."
              {...register("title")}
            />
            <p className=" text-sm text-red-500">{errors.title?.message}</p>
          </div>
          {/* description */}
          <div className=" mt-4">
            <label
              className=" block text-slate-800 font-[500] text-lg"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              defaultValue={data.description}
              className=" w-[300px] px-2 focus:outline-none placeholder:text-gray-500 outline-none border-2 border-gray-300 focus:ring-2 transition-all duration-300 py-[8px] mt-1 rounded-md "
              placeholder="Description..."
              {...register("description")}
            />
            <p className=" text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>
          {/* file */}
          <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <FileProvider errors={errors} file={data.file} field={field} />
            )}
          />

          <div>
            <button className=" w-full bg-cyan-500 shadow-inner active:bg-cyan-600 active:scale-95  transition-all duration-300 shadow-cyan-200 py-2 text-white">
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
