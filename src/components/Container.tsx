import React from "react";

type Props = { children: React.ReactNode };

const Container = (props: Props) => {
  return <div className="container px-5">{props.children}</div>;
};

export default Container;
