import { useParams } from "react-router";
import { useGetPostByIdQuery } from "../../services/postsApi";
import { CreateComment, GoBack, MyCard } from "../../components";

const CurrentPost = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params?.id ?? "");

  if (!data) {
    return <h2>Поста не существует</h2>;
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt,
  } = data;

  return (
    <>
      <GoBack />
      <MyCard
        cardFor="currentPost"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="my-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment) => (
              <MyCard
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
                id={id}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default CurrentPost;
