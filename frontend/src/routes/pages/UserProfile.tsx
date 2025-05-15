import { Button, Card, Image, useDisclosure } from "@heroui/react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../services/userApi";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "../../services/followsApi";
import { useEffect, useState } from "react";
import { resetUser } from "../../features/userSlice";
import {
  CountInfo,
  EditProfile,
  ErrorMessage,
  GoBack,
  ProfileInfo,
} from "../../components";
import { BASE_URL, formatToClientDate, hasErrorField } from "../../lib";
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useAppSelector((state) => state.user);
  const { data } = useGetUserByIdQuery(id ?? "");
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");

  useEffect(
    () => () => {
      dispatch(resetUser());
    },
    [dispatch]
  );

  const handleFollow = async () => {
    try {
      if (id) {
        if (data?.isFollowing) {
          await unfollowUser(id).unwrap();
        } else {
          await followUser({ followingId: id }).unwrap();
        }

        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError("Попробуйте позже");
      }
    }
  };

  if (!data) {
    return null;
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
        onClose();
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError("Попробуйте позже");
      }
    }
  };

  return (
    <>
      <GoBack />
      <div className="flex flex-col gap-4 sm:flex-row">
        <Card className="flex flex-col items-center text-center space-y-4 p-5">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser.current?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onPress={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button onPress={onOpen} endContent={<CiEdit />}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile
        handleClose={handleClose}
        isOpen={isOpen}
        onClose={onClose}
        user={data}
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default UserProfile;
