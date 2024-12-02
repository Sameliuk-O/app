import { IDescriptionTextBlock } from "@/types/IDescriptionTextBlock.ts";

const DescriptionTextBlock = (props: IDescriptionTextBlock) => {
  const { mainText, optionalText } = props;
  return (
    <div>
      <h1 className="text-xl sm:text-3xl text-gray800 mb-2">{mainText}</h1>
      <p className="text-lg sm:text-xl max-w-xl text-gray500">{optionalText}</p>
    </div>
  );
};

export default DescriptionTextBlock;
