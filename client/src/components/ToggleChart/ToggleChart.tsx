import classNames from "classnames";
import IcoMoon from "react-icomoon";

import icomoon from "@/constants/icomoon.json";

interface IToggleChart {
  showStatistic: boolean;
  setShowStatistic: (value: boolean) => void;
}

const ToggleChart = (props: IToggleChart) => {
  const { showStatistic, setShowStatistic } = props;

  return (
    <div className="ml-2 w-fit flex gap-x-2.5 border border-gray300 rounded-lg p-1.5 sm:mt-0">
      <button
        className={classNames(
          "hover:bg-brand400 rounded-lg flex items-center justify-center transition-colors duration-400 group",
          {
            "bg-brand400": showStatistic,
            "bg-gray25": !showStatistic,
          },
        )}
        onClick={() => setShowStatistic(true)}
      >
        <IcoMoon
          iconSet={icomoon}
          icon="statistic"
          className={classNames(
            "h-10 w-10 m-3 transition-colors duration-400",
            {
              "fill-gray25": showStatistic,
              "fill-gray500 group-hover:fill-gray25": !showStatistic,
            },
          )}
        />
      </button>

      <button
        className={classNames(
          "hover:bg-brand400 rounded-lg flex items-center justify-center group transition-colors duration-400",
          {
            "bg-brand400": !showStatistic,
            "bg-gray25": showStatistic,
          },
        )}
        onClick={() => setShowStatistic(false)}
      >
        <IcoMoon
          iconSet={icomoon}
          icon="line-chart"
          className={classNames(
            "h-10 w-10 m-3 transition-colors duration-400",
            {
              "fill-gray25": !showStatistic,
              "fill-gray500 group-hover:fill-gray25": showStatistic,
            },
          )}
        />
      </button>
    </div>
  );
};

export default ToggleChart;
