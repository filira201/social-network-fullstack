import { Link } from "react-router";
import { useAppSelector } from "../../hooks";
import { Card, CardBody } from "@heroui/react";
import { MyUser } from "../../components";

const Followers = () => {
  const currentUser = useAppSelector((state) => state.user);

  if (!currentUser || !currentUser.current) {
    return null;
  }

  return currentUser.current?.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.current.followers.map((user) => (
        <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
          <Card>
            <CardBody className="block">
              <MyUser
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>У вас нет подписчиков</h1>
  );
};

export default Followers;
