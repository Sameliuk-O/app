import { OverlayContainer } from "@/components/OverlayContainer";
import { getUserFlowStateFrigade } from "@/services/getUserFlowStateFrigade.ts";
import { IFlowState } from "@/types/IFlowState.ts";
import * as Frigade from "@frigade/react";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { ICounter } from "@/utils/extractKeyValuePairsWithServiceName.ts";

interface IHistoryCounters {
  allCounters: ICounter[];
}

const HistoryCounters = (props: IHistoryCounters) => {
  const { allCounters } = props;
  const [showAll, setShowAll] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);

  const [flow, setFlow] = useState(true);

  useEffect(() => {
    const fetchFlowState = async () => {
      const resp = await getUserFlowStateFrigade("my-user-id");
      const filterRes = resp.eligibleFlows.filter(
        (el: IFlowState) => el.flowSlug === "flow_hLE5oLVs",
      )[0].$state.completed;
      setFlow(filterRes);
    };

    fetchFlowState();
  }, []);

  const handleResize = () => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    setItemsToShow(isDesktop ? 6 : 4);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const countersToShow = showAll
    ? allCounters
    : allCounters.slice(0, itemsToShow);
  const columnName = ["Дата", "Показник"];

  return (
    <>
      {!flow && <OverlayContainer />}

      <section
        className={classNames({
          "bg-white p-2 lg:py-4 lg:px-6 z-20 relative rounded-2xl": !flow,
        })}
      >
        <h3 className="font-bold text-2xl text-gray600 mb-6">
          Історія показників
        </h3>
        <div>
          <div className="grid grid-cols-2">
            {columnName.map((column, index) => (
              <p
                key={column + index}
                className="text-xl text-gray400 mb-5 text-center"
              >
                {column}
              </p>
            ))}
          </div>
          <div>
            {countersToShow.map((el, index) => (
              <div
                key={el.day + el.year + el.month + index}
                className="grid grid-cols-2 py-2 border-b-2 border-gray200"
              >
                <p className="text-center text-xl text-gray500">
                  {el.day < 10 ? "0" + el.day : el.day}.
                  {el.month < 10 ? "0" + el.month : el.month}.{el.year}
                </p>
                {Object.keys(el).map((key) => {
                  if (key !== "day" && key !== "month" && key !== "year") {
                    return (
                      <p key={key} className="text-center text-xl text-gray800">
                        {el[key]}
                      </p>
                    );
                  }
                })}
              </div>
            ))}
          </div>
          {allCounters.length > itemsToShow && (
            <button
              className="mt-4 py-5 w-full text-center text-gray600 text-lg focus-ring-brand rounded-2xl border border-gray300 hover:bg-gray25 hover:text-grey800"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Показати менше" : "Показати більше"}
            </button>
          )}
        </div>
      </section>

      {!flow && (
        <div
          className={classNames(
            "z-20 max-w-[348px] absolute mt-2.5 ml-4 mr-4 rounded-2xl inset-x-0 bottom-0 h-fit lg:mr-0 lg:left-0 lg:-ml-4 lg:top-3/4 2xl:max-w-[400px] 2xl:lg:-ml-24",
            {
              "bg-white": !flow,
            },
          )}
        >
          <Frigade.Card
            flowId="flow_hLE5oLVs"
            dismissible={true}
            className="onboarding z-80"
            onComplete={() => setFlow(true)}
          />
        </div>
      )}
    </>
  );
};

export default HistoryCounters;
