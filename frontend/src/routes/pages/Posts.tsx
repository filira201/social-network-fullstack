import { CreatePost, MyCard } from "../../components";
import { useGetAllPostsQuery } from "../../services/postsApi";

const Posts = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <MyCard
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author.name || ""}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              />
            )
          )
        : null}
    </>
  );
};

export default Posts;
