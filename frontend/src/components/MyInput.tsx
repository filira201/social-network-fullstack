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
  endContent?: JSX.Element;
  isRequired?: boolean;
}

const MyInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  control,
  endContent,
  isRequired = true,
}: MyInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={!!error}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isRequired={isRequired}
      errorMessage={error?.message}
      endContent={endContent}
    />
  );
};

export default MyInput;
