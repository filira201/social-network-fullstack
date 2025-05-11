import { Button } from "@heroui/react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      className="text-default-500 mb-10"
      color="default"
      variant="light"
      onPress={handleGoBack}
      startContent={<FaRegArrowAltCircleLeft />}
    >
      Назад
    </Button>
  );
};

export default GoBack;
