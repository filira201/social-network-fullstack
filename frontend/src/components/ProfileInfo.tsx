import type { FC } from "react";

interface ProfileInfoProps {
  title: string;
  info?: string;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ title, info }) => {
  if (!info) {
    return null;
  }

  return (
    <p className="font-semibold">
      <span className="text-gray-500 mr-2">{title}</span>
      {info}
    </p>
  );
};

export default ProfileInfo;
