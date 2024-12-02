import { OverlayContainer } from "@/components/OverlayContainer";
import { getUserFlowStateFrigade } from "@/services/getUserFlowStateFrigade.ts";
import { IFlowState } from "@/types/IFlowState.ts";
import * as Frigade from "@frigade/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import { DoughnutChart } from "@/components/chart/DoughnutChart";
import { ICounter } from "@/utils/extractKeyValuePairsWithServiceName.ts";
import { generateMonthYearArray } from "@/utils/generateMonthYearArray.ts";
import { getCurrentMonthYear } from "@/utils/getCurrentMonthYear.ts";
import { reorderArrayByCurrentMonth } from "@/utils/reorderArrayByCurrentMonth.ts";
import { sliderSettings } from "@/utils/sliderSettings.ts";

const DoughnutChartSlider = ({
  allCounters,
  serviceName,
  selectOptions,
  colors,
}: {
  allCounters: ICounter[];
  serviceName?: string;
  selectOptions: string | number;
  colors: string[];
}) => {
  const [groupedCounters, setGroupedCounters] = useState<
    { month: number; year: number; counters: ICounter[] }[]
  >([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { year: currentYear, month } = getCurrentMonthYear();
  const reorderedArray = reorderArrayByCurrentMonth(groupedCounters, month);

  useEffect(() => {
    const generatedMonthYearArray = generateMonthYearArray(currentYear);
    const grouped = allCounters.reduce(
      (
        acc: { month: number; year: number; counters: ICounter[] }[],
        counter,
      ) => {
        const found = acc.find(
          (item) => item.month === counter.month && item.year === counter.year,
        );

        if (found) {
          found.counters.push(counter);
        } else {
          acc.push({
            month: counter.month,
            year: counter.year,
            counters: [counter],
          });
        }

        return acc;
      },
      generatedMonthYearArray,
    );

    setGroupedCounters(grouped);
  }, [allCounters]);

  const [flow, setFlow] = useState(true);

  useEffect(() => {
    const fetchFlowState = async () => {
      const resp = await getUserFlowStateFrigade("my-user-id");
      const filterRes = resp.eligibleFlows.filter(
        (el: IFlowState) => el.flowSlug === "flow_T38Mp7ju",
      )[0].$state.completed;
      setFlow(filterRes);
    };

    fetchFlowState();
  }, []);

  const renderChart = (groupIndex: number) => {
    const current = reorderedArray[groupIndex];
    const isCentral = groupIndex === currentSlide;

    return (
      <div className="flex items-center justify-center">
        <div
          className={`w-4/5 md:w-4/5 transition-all duration-[2000ms] ease-in-out transform ${
            isCentral ? "scale-100 opacity-100" : "scale-90 opacity-50"
          }`}
        >
          <div
            className={`transition-transform duration-[2000ms] ease-in-out ${
              isCentral ? "scale-110" : "scale-100"
            }`}
          >
            <DoughnutChart
              counters={current.counters}
              serviceName={serviceName}
              legendClassName={isCentral ? "text-lg" : "text-xs"}
              selectOptions={selectOptions}
              colors={colors}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleBeforeChange = (_: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  return (
    <>
      {!flow && <OverlayContainer />}
      <div
        className={classNames("", {
          "bg-white z-20 relative rounded-2xl": !flow,
        })}
      >
        <Slider
          {...{
            ...sliderSettings,
            slidesToShow: 3,
            centerMode: true,
            centerPadding: "0",
            infinite: true,
            focusOnSelect: true,
            beforeChange: handleBeforeChange,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  centerMode: false,
                },
              },
            ],
          }}
        >
          {reorderedArray.map((_, index) => (
            <div key={index}>{renderChart(index)}</div>
          ))}
        </Slider>
      </div>

      {!flow && (
        <div
          className={classNames(
            "z-20 max-w-[348px] absolute mt-2.5 ml-4 mr-4 rounded-2xl inset-x-0 h-fit bottom-1/3 mb-10 lg:mb-0 lg:mr-0 lg:left-0 lg:-ml-4 lg:top-2/3 2xl:max-w-[400px] 2xl:lg:-ml-24",
            {
              "bg-white": !flow,
            },
          )}
        >
          <Frigade.Card
            flowId="flow_T38Mp7ju"
            dismissible={true}
            className="onboarding z-80"
            onComplete={() => setFlow(true)}
          />
        </div>
      )}
    </>
  );
};

export default DoughnutChartSlider;
