import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto flex max-w-container relative">{children}</div>
  );
};

export default Container;
