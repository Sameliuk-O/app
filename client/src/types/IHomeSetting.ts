export interface IHomeSetting {
  firstTextButton: string;
  secondTextButton: string;
  firstClassName: string;
  secondClassName: string;
  information: string;
  informationClassName: string;
  firstTypeButton: "button" | "submit" | "reset";
  secondTypeButton: "button" | "submit" | "reset";
  title: string;
  titleClassName: string;
  firstButtonOnClick: () => void;
  secondButtonOnClick: () => void;
}
