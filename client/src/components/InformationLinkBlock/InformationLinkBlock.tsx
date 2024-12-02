import { Block } from "@/components/ui/Block";
import icomoon from "@/constants/icomoon.json";
import { IInformationLinkBlock } from "@/types/IInformationLinkBlock.ts";
import IcoMoon from "react-icomoon";
import { Link } from "react-router-dom";

const InformationLinkBlock = (props: IInformationLinkBlock) => {
  const { link, text, icon } = props;
  return (
    <Link to={link}>
      <Block className="flex px-5 py-8 border-gray200 hover:bg-gray50 hover:shadow-lg">
        <IcoMoon
          iconSet={icomoon}
          className="h-9 w-9 mr-5 fill-gray800"
          icon={icon}
        />
        <p className="text-xl lg:text-2xl text-gray800">{text}</p>
      </Block>
    </Link>
  );
};

export default InformationLinkBlock;
