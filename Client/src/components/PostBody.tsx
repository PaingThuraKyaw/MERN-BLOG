import { Link } from "react-router-dom";
import { useDeletePost } from "../api";
import { postProp } from "../type";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PostBody = ({ post }: { post: postProp }) => {
  //delete
  const deletePost = useDeletePost();

  const mySwal = withReactContent(Swal);

  const deleteHandler = (id: string) => {
    mySwal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePost.mutate(id, {
            onSuccess: () => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            },
          });
        }
      });
  };

  return (
    <div className=" col-span-4 shadow-lg ">
      <div>
        <img
          style={{ height: 200, width: "100%", objectFit: "cover" }}
          src={`${BASE_URL}/${post.file}`}
          alt=""
        />
        <div className=" pt-4 pb-3 px-3">
          <h4 className=" text-3xl font-semibold">{post.title}</h4>
          <p className="">{post.description}</p>
          <div className=" mt-2 flex items-center gap-4">
            <Link
              to={`/post/update/${post._id}`}
              className=" w-full text-center bg-cyan-500 shadow-inner active:bg-cyan-600 active:scale-95  transition-all duration-300 shadow-cyan-200 py-2 text-white"
            >
              EDIT
            </Link>
            <button
              onClick={() => deleteHandler(post._id)}
              className=" w-full bg-red-500 shadow-inner active:bg-red-600 active:scale-95  transition-all duration-300 shadow-red-200 py-2 text-white"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBody;
