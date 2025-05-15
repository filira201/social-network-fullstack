import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { useAppSelector } from "../hooks";
import { BASE_URL } from "../lib";
import { Link } from "react-router";
import { MdAlternateEmail } from "react-icons/md";

const Profile = () => {
  const { current } = useAppSelector((state) => state.user);

  if (!current) {
    return null;
  }

  const { name, email, avatarUrl, id } = current;

  return (
    <Card className="py-4 w-[90%] sm:w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          src={`${BASE_URL}${avatarUrl}`}
          width={370}
          alt="Карточка профиля"
          className="object-cover rounded-xl"
        />
      </CardHeader>
      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {email}
        </p>
      </CardBody>
    </Card>
  );
};

export default Profile;
