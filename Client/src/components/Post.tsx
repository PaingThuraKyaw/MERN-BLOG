import { Link } from "react-router-dom";
import Loading from "../Loader/Loading";
import { useGetPost } from "../api";
import { postProp } from "../type";
import PostBody from "./PostBody";

const Post = () => {
  const { data, isLoading, isError } = useGetPost();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Loading />;
  }


  return (
    <div className=" px-8">
      <h2 className=" text-3xl font-semibold underline text-center mt-5">
        All Post
      </h2>
      <Link to={'/post/create'} className=" px-4 bg-blue-500 shadow-inner rounded-md active:bg-blue-600 active:scale-95  transition-all duration-300 shadow-blue-300 py-2 text-white">
        Create Post
      </Link>
      <div className=" grid grid-cols-12 gap-10 mt-5">
        {data &&
          data.post.map((post: postProp) => (
            <div
              key={post._id}
              className=" col-span-12 md:col-span-5   lg:col-span-4"
            >
              <PostBody post={post} />
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default Post;
