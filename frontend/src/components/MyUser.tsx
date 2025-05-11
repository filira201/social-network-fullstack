import { User } from "@heroui/react";
import type { FC } from "react";
import { BASE_URL } from "../lib";

interface MyUserProps {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
}

const MyUser: FC<MyUserProps> = ({
  name,
  avatarUrl,
  description,
  className,
}) => {
  return (
    <User
      name={name}
      className={className}
      description={description}
      avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
    ></User>
  );
};

export default MyUser;
