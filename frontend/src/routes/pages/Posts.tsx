import { CreatePost } from "../../components";
import { useGetAllPostsQuery } from "../../services/postsApi";

const Posts = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  );
};

export default Posts;
