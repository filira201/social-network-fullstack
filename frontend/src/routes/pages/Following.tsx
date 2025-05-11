import { Link } from "react-router";
import { useAppSelector } from "../../hooks";
import { Card, CardBody } from "@heroui/react";
import { MyUser } from "../../components";

const Following = () => {
  const currentUser = useAppSelector((state) => state.user);

  if (!currentUser || !currentUser.current) {
    return null;
  }

  return currentUser.current?.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.current.following.map((user) => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <MyUser
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>У вас нет подписок</h1>
  );
};

export default Following;
