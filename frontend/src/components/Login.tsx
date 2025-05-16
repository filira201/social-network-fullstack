import { useEffect, type FC } from "react";
import {
  hasErrorField,
  loginFormScheme,
  type AuthKeys,
  type LoginFormValues,
} from "../lib";
import { useForm } from "react-hook-form";
import MyInput from "./MyInput";
import { Button, Link } from "@heroui/react";
import { useLazyCurrentQuery, useLoginMutation } from "../services/userApi";
import { useNavigate } from "react-router";
import ErrorMessage from "./ErrorMessage";
import { useAppSelector } from "../hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginProps {
  setSelected: (value: AuthKeys) => void;
}

const Login: FC<LoginProps> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormScheme),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate("/");
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
      <MyInput control={control} name="email" label="Email" type="email" />

      <MyInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
      />

      <ErrorMessage error={errors.root?.message} />

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>

      <p className="text-center text-small">
        Нет аккаунта?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
};

export default Login;
