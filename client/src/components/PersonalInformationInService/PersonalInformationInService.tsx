import { IPersonalInformationService } from "@/types/IPersonalInformationService.ts";

const PersonalInformationInService = (props: IPersonalInformationService) => {
  const { userInfo, personalAccount } = props;

  return (
    <section className="text-xl my-9">
      <h3 className="text-2xl text-gray800">Особиста інформація</h3>
      <div className="sm:flex mt-5 mb-4">
        <p className="text-gray500 mb-2 sm:mb-0 sm:mr-5 min-w-52">
          Особовий рахунок:
        </p>
        <p className="text-gray800">{personalAccount}</p>
      </div>
      <div className="sm:flex">
        <p className="text-gray500 mb-2 sm:mb-0 sm:mr-5 min-w-52">Споживач:</p>
        <p className="text-gray800">{userInfo}</p>
      </div>
    </section>
  );
};

export default PersonalInformationInService;
