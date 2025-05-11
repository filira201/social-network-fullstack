import { Controller, useForm } from "react-hook-form";
import { useLazyGetPostByIdQuery } from "../services/postsApi";
import { Button, Textarea } from "@heroui/react";
import ErrorMessage from "./ErrorMessage";
import { IoMdCreate } from "react-icons/io";
import { hasErrorField, type CreateCommentFiled } from "../lib";
import { useParams } from "react-router";
import { useCreateCommentMutation } from "../services/commentsApi";

const CreateComment = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<CreateCommentFiled>();

  const error = errors?.comment?.message as string;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        setValue("comment", "");
        await getPostById(id).unwrap();
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError("root", {
          message: error.data.error,
        });
      } else {
        setError("root", {
          message: "Попробуйте позже",
        });
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex-grow">
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Напишите свой комментарий"
            className="mb-5"
          />
        )}
      />

      <ErrorMessage error={error} />
      <ErrorMessage error={errors.root?.message} />

      <Button
        color="primary"
        className="felx-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить комментарий
      </Button>
    </form>
  );
};

export default CreateComment;
