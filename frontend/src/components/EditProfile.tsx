import { useState, type ChangeEvent, type FC } from "react";
import { hasErrorField, type User } from "../lib";
import { useUpdateUserMutation } from "../services/userApi";
import { useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import MyInput from "./MyInput";
import { MdOutlineEmail } from "react-icons/md";
import ErrorMessage from "./ErrorMessage";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
  user?: User;
}

const EditProfile: FC<EditProfileProps> = ({
  isOpen,
  onClose,
  user,
  handleClose,
}) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email ?? "",
      name: user?.name ?? "",
      dateOfBirth: user?.dateOfBirth ?? undefined,
      bio: user?.bio ?? "",
      location: user?.location ?? "",
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData();
        if (data.name) {
          formData.append("name", data.name);
        }
        if (data.email && data.email !== user?.email) {
          formData.append("email", data.email);
        }
        if (data.dateOfBirth) {
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString()
          );
        }
        if (data.bio) {
          formData.append("bio", data.bio);
        }
        if (data.location) {
          formData.append("location", data.location);
        }
        if (selectedFile) {
          formData.append("avatar", selectedFile);
        }

        await updateUser({ userData: formData, id }).unwrap();
        handleClose();
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
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Изменение профиля
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <MyInput
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                />
                <MyInput
                  control={control}
                  name="name"
                  label="Имя"
                  type="text"
                />
                <input
                  type="file"
                  name="avatarUrl"
                  placeholder="Выберите файл"
                  onChange={(event) => handleFileChange(event)}
                />
                <MyInput
                  control={control}
                  name="dateOfBirth"
                  label="Дата рождения"
                  type="date"
                  placeholder="Дата рождения"
                  isRequired={false}
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Ваша биогрфия"
                      {...field}
                      rows={4}
                      placeholder="Обо мне"
                    />
                  )}
                />
                <MyInput
                  control={control}
                  name="location"
                  label="Местоположение"
                  type="text"
                  isRequired={false}
                />
                <ErrorMessage error={errors.root?.message} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Обновить профиль
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="danger" variant="flat" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default EditProfile;
