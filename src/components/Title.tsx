import React from "react";

type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return <div className="text-3xl font-semibold">{children}</div>;
};

export default Title;
