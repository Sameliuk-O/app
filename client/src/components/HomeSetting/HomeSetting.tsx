import { Button } from "@/components/ui/Button";
import { IHomeSetting } from "@/types/IHomeSetting.ts";

const HomeSetting = (props: IHomeSetting) => {
  const {
    information,
    informationClassName,
    secondClassName,
    secondTextButton,
    firstTextButton,
    firstClassName,
    firstTypeButton,
    secondTypeButton,
    title,
    titleClassName,
    firstButtonOnClick,
    secondButtonOnClick,
  } = props;

  return (
    <>
      <h2 className={titleClassName}>{title}</h2>
      <div className="flex">
        <Button
          text={firstTextButton}
          className={firstClassName}
          type={firstTypeButton}
          onClick={firstButtonOnClick}
        />
        <Button
          text={secondTextButton}
          className={secondClassName}
          type={secondTypeButton}
          onClick={secondButtonOnClick}
        />
      </div>
      <p className={informationClassName}>{information}</p>
    </>
  );
};

export default HomeSetting;
