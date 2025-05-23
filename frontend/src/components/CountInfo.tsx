import type { FC } from "react";

interface CountInfoProps {
  count: number;
  title: string;
}

const CountInfo: FC<CountInfoProps> = ({ count, title }) => {
  return (
    <div className="flex flex-col items-center space-x-2 p-4">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  );
};

export default CountInfo;
