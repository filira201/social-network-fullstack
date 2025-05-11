import type { FC } from "react";
import type { IconType } from "react-icons";

interface MetaInfoProps {
  count: number;
  Icon: IconType;
}

const MetaInfo: FC<MetaInfoProps> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && (
        <p className="font-semibold text-default-400 text-lg">{count}</p>
      )}
      <p className="text-default-400 text-xl ease-in duration-100 hover:text-2xl">
        <Icon />
      </p>
    </div>
  );
};

export default MetaInfo;
