import { IBlock } from "@/types/IBlock.ts";

const Block = (props: IBlock) => {
  const { children, className } = props;

  return (
    <div
      className={`flex-grow sm:mx-3 lg:mx-6 border-gray200 border rounded-2xl ${className !== undefined ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Block;
