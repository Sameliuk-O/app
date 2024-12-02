import { IAddServiceInformation } from "@/types/IAddServiceInformation.ts";

const AddServiceInformation = (props: IAddServiceInformation) => {
  const { information } = props;

  return (
    <p className="text-gray500 text-lg sm:text-xl mt-2.5">{information}</p>
  );
};

export default AddServiceInformation;
