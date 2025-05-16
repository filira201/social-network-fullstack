import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-2xl text-center font-black sm:text-4xl">
        Что-то пошло не так
      </h1>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          {isRouteErrorResponse(error) ? (
            <div className="my-0 mx-auto">
              <h2 className="text-5xl font-bold text-center pb-6 sm:text-8xl">
                Статус: <span className="text-red-500">{error.status}</span>
              </h2>
              <p className="text-2xl font-bold text-center sm:text-4xl">
                {" "}
                Ошибка: {error.statusText}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-center sm:text-4xl">
              Текст:{" "}
              {error instanceof Error && "message" in error
                ? error.message
                : "Неизвестная ошибка"}
            </p>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <div className="mt-4">
            <Button
              onPress={() => navigate(-1)}
              variant="flat"
              className="mb-2 text-xl"
              fullWidth
            >
              Назад
            </Button>
            <Button
              onPress={() => navigate("/")}
              color="primary"
              fullWidth
              className="text-xl"
            >
              Главная
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          <p className="text-center text-default-600 text-xl">
            Если вы считате, что произошла ошибка, то напишите на почту{" "}
            <span className="text-blue-600">example@mail.ru</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ErrorBoundary;
