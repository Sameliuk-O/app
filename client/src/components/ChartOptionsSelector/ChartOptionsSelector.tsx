import { Selector } from "@/components/ui/Selector";
import { countersData } from "@/constants/counterServiceFields.ts";

interface IChartOptionsSelector {
  selectOption: string | number;
  setSelectOption: (value: string | number) => void;
  serviceName?: string;
}

const ChartOptionsSelector = (props: IChartOptionsSelector) => {
  const { setSelectOption, selectOption, serviceName } = props;

  const serviceTypes = countersData
    .filter((el) => el.service === serviceName)[0]
    .counters.map((el) => el.type);

  serviceTypes.unshift("Всі лічильники");

  return (
    <Selector
      options={serviceTypes}
      selectValue={selectOption}
      setSelectedValue={setSelectOption}
    />
  );
};

export default ChartOptionsSelector;
