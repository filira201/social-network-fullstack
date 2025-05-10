import { useForm } from "react-hook-form";
import MyInput from "./MyInput";
import { hasErrorField, type AuthKeys, type RegisterFiled } from "../lib";
import { type FC } from "react";
import { Button, Link } from "@heroui/react";
import { useRegisterMutation } from "../services/userApi";
import ErrorMessage from "./ErrorMessage";

interface RegisterProps {
  setSelected: (value: AuthKeys) => void;
}

const Register: FC<RegisterProps> = ({ setSelected }) => {
  //TODO: Добавить zod, валидировать поля
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterFiled>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFiled) => {
    try {
      await register(data).unwrap();
      setSelected("login");
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
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <MyInput
        control={control}
        name="name"
        label="Имя"
        type="text"
        required="Имя обязательно"
      />
      <MyInput
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Почта обязательна"
      />

      <MyInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Пароль обязателен"
      />

      <ErrorMessage error={errors.root?.message} />

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>

      <p className="text-center text-small">
        Есть аккаунт?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Войти
        </Link>
      </p>
    </form>
  );
};

export default Register;
