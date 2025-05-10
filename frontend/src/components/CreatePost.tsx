import { Controller, useForm } from "react-hook-form";
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../services/postsApi";
import { Button, Textarea } from "@heroui/react";
import ErrorMessage from "./ErrorMessage";
import { IoMdCreate } from "react-icons/io";
import { hasErrorField, type CreatePostFiled } from "../lib";

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<CreatePostFiled>();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue("post", "");
      await triggerAllPosts().unwrap();
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
        name="post"
        control={control}
        defaultValue=""
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чем думаете"
            className="mb-5"
          />
        )}
      />

      <ErrorMessage error={error} />
      <ErrorMessage error={errors.root?.message} />

      <Button
        color="success"
        className="felx-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  );
};

export default CreatePost;
