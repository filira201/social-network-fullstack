import { useState, type FC } from "react";
import { formatToClientDate, hasErrorField, type CardFor } from "../lib";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../services/likesApi";
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../services/postsApi";
import { useDeleteCommentMutation } from "../services/commentsApi";
import { Link, useNavigate } from "react-router";
import { useAppSelector } from "../hooks";
import { Card, CardBody, CardFooter, CardHeader, Spinner } from "@heroui/react";
import MyUser from "./MyUser";
import { RiDeleteBinLine } from "react-icons/ri";
import Typography from "./Typography";
import MetaInfo from "./MetaInfo";
import { FcDislike } from "react-icons/fc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";

interface MyCardProps {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: CardFor;
  likedByUser?: boolean;
}

const MyCard: FC<MyCardProps> = ({
  avatarUrl,
  name,
  authorId,
  content,
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user);

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap();
        break;
      case "currentPost":
        await triggerGetAllPosts().unwrap();
        break;
      case "comment":
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error("Неверный аргумент cardFor");
    }
  };

  const handleLikeClick = async () => {
    try {
      if (likedByUser) {
        await unlikePost(id).unwrap();
      } else {
        await likePost({ postId: id }).unwrap();
      }

      if (cardFor === "currentPost") {
        await triggerGetPostById(id).unwrap();
      }

      if (cardFor === "post") {
        await triggerGetAllPosts().unwrap();
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
      setError("Попробуйте позже");
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case "currentPost":
          await deletePost(id).unwrap();
          navigate("/");
          break;
        case "comment":
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error("Неверный аргумент cardFor");
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
      setError("Попробуйте позже");
    }
  };

  return (
    <Card className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <MyUser
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser.current?.id && (
          <div onClick={handleDelete} className="cursor-pointer">
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleLikeClick}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>

          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </Card>
  );
};

export default MyCard;
