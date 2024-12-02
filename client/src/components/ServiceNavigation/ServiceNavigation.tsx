import { Button } from "@/components/ui/Button";
import { IServiceNavigation } from "@/types/IServiceNavigation.ts";

const ServiceNavigation = (props: IServiceNavigation) => {
  const { nextService, prevService, onClickPrevService, onClickNextService } =
    props;

  return (
    <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-y-0 gap-x-5 mt-5">
      <Button
        text={`Попередня (${prevService})`}
        type="button"
        className="py-5 text-xl w-full border border-gray300 rounded-2xl"
        onClick={onClickPrevService}
      />
      <Button
        text={`Наступна (${nextService})`}
        type="button"
        className="py-5 text-xl w-full border border-gray300 rounded-2xl"
        onClick={onClickNextService}
      />
    </div>
  );
};

export default ServiceNavigation;
