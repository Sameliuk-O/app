import { TARIFF } from "@/constants/tariff.ts";
import { ITariffBlock } from "@/types/ITariffBlock.ts";

const TariffBlock = (props: ITariffBlock) => {
  const { service } = props;
  const currentServiceTariff = TARIFF.find((el) => el.service === service);

  return (
    <section className="text-xl">
      <h3 className="text-2xl text-gray800 mb-5">Тариф</h3>
      {currentServiceTariff && (
        <>
          {currentServiceTariff.tariffZoneText &&
            currentServiceTariff.tariffZone && (
              <div className="sm:flex mb-2.5">
                <p className="min-w-52 text-gray500 mb-2 sm:mb-0">
                  {currentServiceTariff.tariffZoneText}
                </p>
                <p className="text-gray800">
                  {currentServiceTariff.tariffZone}
                </p>
              </div>
            )}
          {currentServiceTariff.hotWaterPrice &&
            currentServiceTariff.coldWaterPrice &&
            currentServiceTariff.coldWaterText &&
            currentServiceTariff.hotWaterText &&
            currentServiceTariff.drainageText &&
            currentServiceTariff.drainagePrice && (
              <>
                <div className="sm:flex mb-2.5">
                  <p className="min-w-52 text-gray500 mb-2 sm:mb-0">
                    {currentServiceTariff.hotWaterText}
                  </p>
                  <p className="text-gray800">
                    {currentServiceTariff.hotWaterPrice}
                  </p>
                </div>
                <div className="sm:flex mb-2.5">
                  <p className="min-w-52 text-gray500 mb-2 sm:mb-0">
                    {currentServiceTariff.coldWaterText}
                  </p>
                  <p className="text-gray800">
                    {currentServiceTariff.coldWaterPrice}
                  </p>
                </div>
                <div className="sm:flex mb-2.5">
                  <p className="min-w-52 text-gray500 mb-2 sm:mb-0">
                    {currentServiceTariff.drainageText}
                  </p>
                  <p className="text-gray800">
                    {currentServiceTariff.drainagePrice}
                  </p>
                </div>
              </>
            )}
          {currentServiceTariff.tariffPlanText &&
            currentServiceTariff.tariffPlanValue && (
              <div className="sm:flex mb-2.5">
                <p className="min-w-52 text-gray500 mb-2 sm:mb-0">
                  {currentServiceTariff.tariffPlanText}
                </p>
                <p className="text-gray800">
                  {currentServiceTariff.tariffPlanValue}
                </p>
              </div>
            )}
          <div className="sm:flex">
            <p className="min-w-52 text-gray500 mb-2 sm:mb-0">
              {currentServiceTariff.priceText}
            </p>
            <p className="text-gray800">{currentServiceTariff.price}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default TariffBlock;
