import { IIcon } from "@/types/IIcon.ts";

const Icon = (props: IIcon) => {
  const { imgAlt, imgUrl, classNameImg } = props;
  return <img src={imgUrl} alt={imgAlt} className={classNameImg} />;
};

export default Icon;
