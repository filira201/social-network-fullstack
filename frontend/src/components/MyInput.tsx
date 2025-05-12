import { Input } from "@heroui/react";
import type { JSX } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface MyInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<T>;
  required?: string;
  endContent?: JSX.Element;
  isRequired?: boolean;
}

const MyInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  endContent,
  isRequired = true,
}: MyInputProps<T>) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control, rules: { required } });

  return (
    <Input
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isRequired={isRequired}
      errorMessage={`${errors[name]?.message ?? ""}`}
      endContent={endContent}
    />
  );
};

export default MyInput;
