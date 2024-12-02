import { Selector } from "@/components/ui/Selector";

interface IYearSelector {
  selectedYear: number | string;
  setSelectedYear: (value: number | string) => void;
  currentYear: number;
}

const YearSelector = (props: IYearSelector) => {
  const { selectedYear, setSelectedYear, currentYear } = props;
  const startYear = 2019;

  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <Selector
      setSelectedValue={setSelectedYear}
      selectValue={selectedYear}
      options={years}
    />
  );
};

export default YearSelector;
